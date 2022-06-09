import * as path from 'path';
import { Duration, Stack } from 'aws-cdk-lib';
import { FunctionOptions, FunctionUrlOptions, IFunction, IFunctionUrl } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { LevelWithSilent } from 'pino';

export interface ProxyOptions {
  // TODO: should we remove trailing slash(es)?
  readonly url: string;
  /**
   * @default false
   */
  readonly allowSelfSignedCerts?: boolean;
  /**
   * For 'content-type' of 'application/json' or 'text/*', body will not be base64 encoded.
   * For other content types, please enable this option as needed.
   *
   * "Don’t forget to set the request’s Content-type to application/json or text/* in your tests, otherwise, the body will be base64-encoded by default, and you’ll need to decode it in the Lambda handler."
   * ref: https://aws.amazon.com/blogs/aws/announcing-aws-lambda-function-urls-built-in-https-endpoints-for-single-function-microservices/
   * @default false
   */
  readonly forceDecodeBody?: boolean;
  /**
   * @default LambdaCorsProxy.DEFAULT_HEADERS_TO_STRIP
   */
  readonly needToStripHeaderKeys?: string[];
}

export interface SigV4Options {
  /**
   * The targeting region.
   *
   * @default 'AWS_REGION' from Lambda runtime environment
   * https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime
   */
  readonly region?: string;
  /**
   * The requesting service name.
   *
   * @default 'execute-api' for API Gateway
   */
  readonly service?: string;
}

export interface LambdaCorsProxyProps {
  readonly targetEndpoint: ProxyOptions;
  readonly sigV4Options?: SigV4Options;
  readonly lambdaOptions?: FunctionOptions;

  readonly lambdaFunctionUrlOptions?: FunctionUrlOptions;

  /**
   * @default 'info'
   */
  readonly lambdaLogLevel?: LevelWithSilent;
}

/**
 * A Lambda proxy that can be used to proxy requests to hit a sigV4-required target endpoint.
 */
export class LambdaCorsProxy extends Construct {
  private static readonly DEFAULT_HEADERS_TO_STRIP = [
    'accept-encoding',
    'host',
    'x-amz-date',
    'x-amz-security-token',
    'x-amzn-trace-id',
    'x-forwarded-for',
    'x-forwarded-port',
    'x-forwarded-proto',
    'forwarded',
    'content-length',
  ];
  public readonly functionUrl: IFunctionUrl;
  private readonly _lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: LambdaCorsProxyProps) {
    super(scope, id);

    this._lambdaFunction = new NodejsFunction(this, 'Handler', {
      entry: path.join(__dirname, 'lambda/proxy.ts'),
      handler: 'handler',
      timeout: Duration.seconds(30),
      environment: {
        ENDPOINT_URL: props.targetEndpoint.url,
        ENDPOINT_REGION: props.sigV4Options?.region || Stack.of(this).region,
        ENDPOINT_SERVICE: props.sigV4Options?.service || 'execute-api',
        ALLOW_SELF_SIGNED_CERTS: props.targetEndpoint.allowSelfSignedCerts ? 'true' : 'false',
        FORCE_DECODE_BODY: props.targetEndpoint.forceDecodeBody ? 'true' : 'false',
        NEED_TO_STRIP_HEADER_KEYS: (props.targetEndpoint.needToStripHeaderKeys || LambdaCorsProxy.DEFAULT_HEADERS_TO_STRIP).join(','),
        LOG_LEVEL: props.lambdaLogLevel || 'info',
      },
      ...props.lambdaOptions,
    });
    this.functionUrl = this._lambdaFunction.addFunctionUrl(props.lambdaFunctionUrlOptions);
  }

  get lambdaFunction(): IFunction {
    return this._lambdaFunction;
  }
}