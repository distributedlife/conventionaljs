# conventionaljs
Conventional tests for your JS and TS.

There is only one rule so far and it's incomplete.
- Make sure AWS Lambda event handler input parameters don't escape the file they are defined in.

## AWS Lambda Handler Matchers
The following is considered an AWS Lambda handlers if all are true:

- Must be an export of a root source file (file not imported by another source file)
- Looks like one of the following:
  - has JSDoc annotation matching an AWS event type e.g. `AWSLambda.DynamoDBStreamEvent` for the first param
  - has three params (event, context, callback) in that order and with that name 
  - has two params (event, context) is async
  - has one param (event) is async and the function name is called "handler"

### The following are considered AWS Lambda Event Types
- AWSLambda.ALBEvent
- AWSLambda.APIGatewayEvent
- AWSLambda.CloudFrontEvent
- AWSLambda.CloudWatchLogsEvent
- AWSLambda.CognitoUserPoolEvent
- AWSLambda.DynamoDBStreamEvent
- AWSLambda.KinesisStreamEvent
- AWSLambda.S3CreateEvent
- AWSLambda.S3Event
- AWSLambda.SNSEvent
- AWSLambda.SQSEvent

## Usage
You'll need [entente](https://github.com/h-o-t/entente) or [ts-morph](https://github.com/dsherret/ts-morph) for this.

### entente (known entrypoints only at the moment)
```js
const { createProject } = require("entente");
createProject('./src/index.js');

checkProject(project) 
```

### ts-morph (find entrypoints in a source tree)
```js
const compilerOptions = {
  allowJs: true,
  checkJs: true,
  noEmit: true,
  resolveJsonModule: true,
};

const project = new Project({ compilerOptions });
project.resolveSourceFileDependencies();
project.addSourceFilesAtPaths(['./src/**/*.js', "!./src/**/*.spec.js"]);

checkProject(project) 
```

## Todos
- [ ] Make it work with commonjs modules. ts-morph is having a hard time here.
- [ ] Make sure it doesn't escape through a renamed reference.

## Ideas to explore
- [ ] express request/response objects are not passed around
- [ ] GraphQL response objects are converted to view models before use
- [ ] types defined externally to the project can only be passed out of the file where they are first used (don't couple yourself to external objects) -- but you can define them anywhere
- [ ] types defined externally to the project can only be used in leaf (files that do not reference other source files) or entrypoint files (files not referened by other source files)