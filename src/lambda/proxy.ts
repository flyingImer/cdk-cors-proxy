import * as https from 'https';
import { aws4Interceptor } from 'aws4-axios';
import axios, { AxiosResponse } from 'axios';
// @ts-ignore
import isString from 'lodash.isstring';
import pino from 'pino';

// @ts-ignore
const url: string = process.env.ENDPOINT_URL;
const region: string = (process.env.ENDPOINT_REGION ?? process.env.AWS_REGION)!;
const service: string = process.env.ENDPOINT_SERVICE ?? 'execute-api';
const forceDecodeBody: boolean = process.env.FORCE_DECODE_BODY === 'true';
const allowSelfSignedCerts: boolean = process.env.ALLOW_SELF_SIGNED_CERTS === 'true';
const needToStripHeaderKeys: string[] = process.env.NEED_TO_STRIP_HEADER_KEYS?.split(',') ?? [];
const logLevel: string = process.env.LOG_LEVEL ?? 'info';

const logger = pino({ level: logLevel, nestedKey: 'details' });

if (!url) {
  throw new Error('Environment variable `ENDPOINT_URL` is not set!');
}

logger.info({
  logLevel,
  url,
  region,
  service,
  forceDecodeBody,
  allowSelfSignedCerts,
  needToStripHeaderKeys,
}, 'proxy configurations');

const sanitizeHeaders = (headers: { [key: string]: string | undefined }): { [key: string]: string } => {
  const lowerCasedKeyHeaders = Object.entries(headers).reduce((res, cur) => ({ [cur[0].toLowerCase()]: cur[1], ...res }), {});
  // @ts-ignore
  needToStripHeaderKeys.forEach(k => delete lowerCasedKeyHeaders[k]);
  logger.debug(lowerCasedKeyHeaders, 'sanitized headers');
  return lowerCasedKeyHeaders;
};

const decodeBodyIfApplies = (event: LambdaFunctionUrlEvent, shouldTryDecode: boolean): any => {
  if (!event.body) return event.body;
  if (!event.isBase64Encoded) return event.body;
  if (!shouldTryDecode) return event.body;

  return JSON.parse(Buffer.from(event.body, 'base64').toString('ascii'));
};

const logHandler = (payload: any, type: 'request' | 'response', isError: boolean) => {
  if (isError) {
    logger.error(payload, `axios ${type} payload`);
  } else {
    logger.debug(payload, `axios ${type} payload`);
  }
  return payload;
};
const errorHandler = (error: any, type: 'request' | 'response') => Promise.reject(logHandler(error, type, true));

export const handler: AWSLambda.Handler<LambdaFunctionUrlEvent, LambdaFunctionUrlResult> = async (event) => {
  try {
    logger.debug(event, 'input event');

    // NOTES: unfortunately, the client creation has to happen inside the handler due to the way how we fed the credentials for sigV4
    // potential way out: use assume role from the aws4-axios library, be aware of the downside of this is overhead (latency & sts service quota) for sts:assumeRole
    const client = axios.create({
      baseURL: url,
      validateStatus: () => true, // always bubble up whatever status returned
      ...allowSelfSignedCerts && {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      },
    });
    const requestInterceptor = aws4Interceptor(
      {
        region,
        service,
      },
      {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
    );
    client.interceptors.request.use(requestInterceptor, (error) => errorHandler(error, 'response'));
    client.interceptors.response.use((payload) => logHandler(payload, 'response', false), (error) => errorHandler(error, 'response'));

    const originalResponse: AxiosResponse = await client.request({
      url: event.requestContext.http.path,
      method: event.requestContext.http.method,
      headers: sanitizeHeaders(event.headers),
      params: event.queryStringParameters,
      data: decodeBodyIfApplies(event, forceDecodeBody),
    });

    logger.debug(originalResponse.data, 'axios response data');

    return {
      statusCode: originalResponse.status,
      headers: {
        ...originalResponse.headers as any,
      },
      body: isString(originalResponse.data) ? originalResponse.data : JSON.stringify(originalResponse.data),
    };
  } catch (error) {
    logger.error(error, 'error inside the handler');
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error,
      }),
    };
  }
};

interface IAMAuthorizerContext {
  readonly accessKey: string;
  readonly accountId: string;
  readonly callerId: string;
  readonly cognitoIdentity: any | null;
  readonly principalOrgId: string | null;
  readonly userArn: string;
  readonly userId: string;
}

/**
 * IAM Authorizer Payload
 */
interface RequestContextIAMAuthorizer<TAuthorizerContext> {
  readonly iam: TAuthorizerContext;
}

interface RequestContextWithOptionalAuthorizer<TAuthorizer> extends AWSLambda.APIGatewayEventRequestContextV2 {
  readonly authorizer?: TAuthorizer;
}

/**
 * https://docs.aws.amazon.com/lambda/latest/dg/urls-invocation.html#urls-request-payload
 */
type LambdaFunctionUrlEvent = AWSLambda.APIGatewayProxyEventV2WithRequestContext<
RequestContextWithOptionalAuthorizer<RequestContextIAMAuthorizer<IAMAuthorizerContext>>
>;

/**
 * https://docs.aws.amazon.com/lambda/latest/dg/urls-invocation.html#urls-response-payload
 */
type LambdaFunctionUrlResult<T = never> = AWSLambda.APIGatewayProxyResultV2<T>;
