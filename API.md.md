# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### LambdaCorsProxy <a name="LambdaCorsProxy" id="cdk-cors-proxy.LambdaCorsProxy"></a>

A Lambda proxy that can be used to proxy requests to hit a sigV4-required target endpoint.

#### Initializers <a name="Initializers" id="cdk-cors-proxy.LambdaCorsProxy.Initializer"></a>

```typescript
import { LambdaCorsProxy } from 'cdk-cors-proxy'

new LambdaCorsProxy(scope: Construct, id: string, props: LambdaCorsProxyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxy.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxy.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-cors-proxy.LambdaCorsProxyProps">LambdaCorsProxyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-cors-proxy.LambdaCorsProxy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-cors-proxy.LambdaCorsProxy.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-cors-proxy.LambdaCorsProxy.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-cors-proxy.LambdaCorsProxyProps">LambdaCorsProxyProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxy.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-cors-proxy.LambdaCorsProxy.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxy.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-cors-proxy.LambdaCorsProxy.isConstruct"></a>

```typescript
import { LambdaCorsProxy } from 'cdk-cors-proxy'

LambdaCorsProxy.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-cors-proxy.LambdaCorsProxy.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxy.property.functionUrl">functionUrl</a></code> | <code>aws-cdk-lib.aws_lambda.IFunctionUrl</code> | *No description.* |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxy.property.lambdaFunction">lambdaFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-cors-proxy.LambdaCorsProxy.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `functionUrl`<sup>Required</sup> <a name="functionUrl" id="cdk-cors-proxy.LambdaCorsProxy.property.functionUrl"></a>

```typescript
public readonly functionUrl: IFunctionUrl;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunctionUrl

---

##### `lambdaFunction`<sup>Required</sup> <a name="lambdaFunction" id="cdk-cors-proxy.LambdaCorsProxy.property.lambdaFunction"></a>

```typescript
public readonly lambdaFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

---


## Structs <a name="Structs" id="Structs"></a>

### LambdaCorsProxyProps <a name="LambdaCorsProxyProps" id="cdk-cors-proxy.LambdaCorsProxyProps"></a>

#### Initializer <a name="Initializer" id="cdk-cors-proxy.LambdaCorsProxyProps.Initializer"></a>

```typescript
import { LambdaCorsProxyProps } from 'cdk-cors-proxy'

const lambdaCorsProxyProps: LambdaCorsProxyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxyProps.property.targetEndpoint">targetEndpoint</a></code> | <code><a href="#cdk-cors-proxy.ProxyOptions">ProxyOptions</a></code> | *No description.* |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxyProps.property.lambdaFunctionUrlOptions">lambdaFunctionUrlOptions</a></code> | <code>aws-cdk-lib.aws_lambda.FunctionUrlOptions</code> | *No description.* |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxyProps.property.lambdaLogLevel">lambdaLogLevel</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxyProps.property.lambdaOptions">lambdaOptions</a></code> | <code>aws-cdk-lib.aws_lambda.FunctionOptions</code> | *No description.* |
| <code><a href="#cdk-cors-proxy.LambdaCorsProxyProps.property.sigV4Options">sigV4Options</a></code> | <code><a href="#cdk-cors-proxy.SigV4Options">SigV4Options</a></code> | *No description.* |

---

##### `targetEndpoint`<sup>Required</sup> <a name="targetEndpoint" id="cdk-cors-proxy.LambdaCorsProxyProps.property.targetEndpoint"></a>

```typescript
public readonly targetEndpoint: ProxyOptions;
```

- *Type:* <a href="#cdk-cors-proxy.ProxyOptions">ProxyOptions</a>

---

##### `lambdaFunctionUrlOptions`<sup>Optional</sup> <a name="lambdaFunctionUrlOptions" id="cdk-cors-proxy.LambdaCorsProxyProps.property.lambdaFunctionUrlOptions"></a>

```typescript
public readonly lambdaFunctionUrlOptions: FunctionUrlOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `lambdaLogLevel`<sup>Optional</sup> <a name="lambdaLogLevel" id="cdk-cors-proxy.LambdaCorsProxyProps.property.lambdaLogLevel"></a>

```typescript
public readonly lambdaLogLevel: string;
```

- *Type:* string
- *Default:* 'info'

---

##### `lambdaOptions`<sup>Optional</sup> <a name="lambdaOptions" id="cdk-cors-proxy.LambdaCorsProxyProps.property.lambdaOptions"></a>

```typescript
public readonly lambdaOptions: FunctionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.FunctionOptions

---

##### `sigV4Options`<sup>Optional</sup> <a name="sigV4Options" id="cdk-cors-proxy.LambdaCorsProxyProps.property.sigV4Options"></a>

```typescript
public readonly sigV4Options: SigV4Options;
```

- *Type:* <a href="#cdk-cors-proxy.SigV4Options">SigV4Options</a>

---

### ProxyOptions <a name="ProxyOptions" id="cdk-cors-proxy.ProxyOptions"></a>

#### Initializer <a name="Initializer" id="cdk-cors-proxy.ProxyOptions.Initializer"></a>

```typescript
import { ProxyOptions } from 'cdk-cors-proxy'

const proxyOptions: ProxyOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cors-proxy.ProxyOptions.property.url">url</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-cors-proxy.ProxyOptions.property.allowSelfSignedCerts">allowSelfSignedCerts</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-cors-proxy.ProxyOptions.property.forceDecodeBody">forceDecodeBody</a></code> | <code>boolean</code> | For 'content-type' of 'application/json' or 'text/*', body will not be base64 encoded. |
| <code><a href="#cdk-cors-proxy.ProxyOptions.property.needToStripHeaderKeys">needToStripHeaderKeys</a></code> | <code>string[]</code> | *No description.* |

---

##### `url`<sup>Required</sup> <a name="url" id="cdk-cors-proxy.ProxyOptions.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---

##### `allowSelfSignedCerts`<sup>Optional</sup> <a name="allowSelfSignedCerts" id="cdk-cors-proxy.ProxyOptions.property.allowSelfSignedCerts"></a>

```typescript
public readonly allowSelfSignedCerts: boolean;
```

- *Type:* boolean
- *Default:* false

---

##### `forceDecodeBody`<sup>Optional</sup> <a name="forceDecodeBody" id="cdk-cors-proxy.ProxyOptions.property.forceDecodeBody"></a>

```typescript
public readonly forceDecodeBody: boolean;
```

- *Type:* boolean
- *Default:* false

For 'content-type' of 'application/json' or 'text/*', body will not be base64 encoded.

For other content types, please enable this option as needed.

"Don’t forget to set the request’s Content-type to application/json or text/* in your tests, otherwise, the body will be base64-encoded by default, and you’ll need to decode it in the Lambda handler."
ref: https://aws.amazon.com/blogs/aws/announcing-aws-lambda-function-urls-built-in-https-endpoints-for-single-function-microservices/

---

##### `needToStripHeaderKeys`<sup>Optional</sup> <a name="needToStripHeaderKeys" id="cdk-cors-proxy.ProxyOptions.property.needToStripHeaderKeys"></a>

```typescript
public readonly needToStripHeaderKeys: string[];
```

- *Type:* string[]
- *Default:* LambdaCorsProxy.DEFAULT_HEADERS_TO_STRIP

---

### SigV4Options <a name="SigV4Options" id="cdk-cors-proxy.SigV4Options"></a>

#### Initializer <a name="Initializer" id="cdk-cors-proxy.SigV4Options.Initializer"></a>

```typescript
import { SigV4Options } from 'cdk-cors-proxy'

const sigV4Options: SigV4Options = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cors-proxy.SigV4Options.property.region">region</a></code> | <code>string</code> | The targeting region. |
| <code><a href="#cdk-cors-proxy.SigV4Options.property.service">service</a></code> | <code>string</code> | The requesting service name. |

---

##### `region`<sup>Optional</sup> <a name="region" id="cdk-cors-proxy.SigV4Options.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string
- *Default:* 'AWS_REGION' from Lambda runtime environment https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime

The targeting region.

---

##### `service`<sup>Optional</sup> <a name="service" id="cdk-cors-proxy.SigV4Options.property.service"></a>

```typescript
public readonly service: string;
```

- *Type:* string
- *Default:* 'execute-api' for API Gateway

The requesting service name.

---

## Classes <a name="Classes" id="Classes"></a>

### Hello <a name="Hello" id="cdk-cors-proxy.Hello"></a>

#### Initializers <a name="Initializers" id="cdk-cors-proxy.Hello.Initializer"></a>

```typescript
import { Hello } from 'cdk-cors-proxy'

new Hello()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-cors-proxy.Hello.sayHello">sayHello</a></code> | *No description.* |

---

##### `sayHello` <a name="sayHello" id="cdk-cors-proxy.Hello.sayHello"></a>

```typescript
public sayHello(): string
```





