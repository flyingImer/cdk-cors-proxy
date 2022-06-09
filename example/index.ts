import { Stack, StackProps, App, CfnOutput, Duration } from 'aws-cdk-lib';
import { Cors } from 'aws-cdk-lib/aws-apigateway';
import { AccountPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { FunctionUrlAuthType, HttpMethod } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { LambdaCorsProxy } from '../src/lambda-proxy';

class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const lambdaProxy = new LambdaCorsProxy(this, 'LambdaProxy', {
      targetEndpoint: {
        url: 'https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/devo',
      },
      sigV4Options: {
        service: 'execute-api',
      },
      lambdaFunctionUrlOptions: {
        authType: FunctionUrlAuthType.AWS_IAM,
        cors: {
          allowedOrigins: ['https://example.com'],
          allowedHeaders: [
            ...Cors.DEFAULT_HEADERS,
            'Amz-Sdk-Invocation-Id',
            'Amz-Sdk-Request',
            'Authorization',
            'Content-Length',
            'content-encoding',
            'Content-Type',
            'Date',
            'Host',
            'X-Amz-Content-Sha256',
            'X-Amz-Date',
            'X-Amz-Security-Token',
            'X-Amz-Target',
            'X-Amz-User-Agent',
            'X-Amzn-Trace-Id',
          ],
          allowedMethods: [
            HttpMethod.ALL,
          ],
          allowCredentials: true,
          maxAge: Duration.seconds(600),
        },
      },
    });

    lambdaProxy.lambdaFunction.addToRolePolicy(new PolicyStatement({
      actions: ['execute-api:Invoke'],
      resources: ['arn:aws:execute-api:us-east-1:012345678901:xxxxxxxx/devo/*'],
    }));

    lambdaProxy.functionUrl.grantInvokeUrl(new AccountPrincipal('123456789012'));

    new CfnOutput(this, 'LambdaProxyEndpointUrl', {
      value: lambdaProxy.functionUrl.url,
    });
  }
}

class TestApp extends App {
  constructor() {
    super();
    new TestStack(this, 'CorsExamples');
  }
}

new TestApp().synth();