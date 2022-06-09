const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'flyingImer',
  authorAddress: 'ej.wang.devs@gmail.com',
  cdkVersion: '2.21.0',

  autoApproveOptions: {
    allowedUsernames: ['flyingImer'],
  },

  autoApproveUpgrades: true,

  codeCov: true,

  defaultReleaseBranch: 'main',
  name: 'cdk-cors-proxy',
  repositoryUrl: 'https://github.com/flyingImer/cdk-cors-proxy.git',
  stability: 'experimental',

  // deps: [],                /* Runtime dependencies of this module. */
  description: 'A proxy to make an endpoint CORS-compatible', /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    '@types/aws-lambda',
    '@types/lodash.isstring',
    'esbuild@0',
  ], /* Build dependencies for this module. */
  bundledDeps: [
    'axios',
    'aws4-axios',
    'lodash.isstring',
    'pino',
  ],
  // packageName: undefined,  /* The "name" in package.json. */
});

project.tsconfigDev.addInclude('example/**/*.ts');
project.gitignore.exclude('**/*.bak');
project.gitignore.exclude('example/**/*.js', 'example/**/*.d.ts', 'example/cdk.out');

project.synth();