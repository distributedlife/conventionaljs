const { makeProject } = require("../test-data/makeProject");
const { assertEventObjectDoesNotEscapeFile } = require("./assert-event-object-does-not-escape-file");
const { findAwsLambdaHandlerLikes } = require("./find-aws-lambda-handler-likes");

describe('assert-event-object-does-not-escape-file', () => {
  it('should not throw an error if the event object is never used', () => {
    const project = makeProject('./test-data/es6-module.js');
    const functions = findAwsLambdaHandlerLikes(project.getSourceFiles());

    expect(functions).toHaveLength(1)
    expect(() => { assertEventObjectDoesNotEscapeFile(functions[0]) }).not.toThrow()
  })

  it('should throw an error if the event object is passed to an imported function', () => {
    const project = makeProject('./test-data/es6-module-with-external-usage.js');
    const functions = findAwsLambdaHandlerLikes(project.getSourceFiles());

    expect(functions).toHaveLength(1)
    expect(() => { assertEventObjectDoesNotEscapeFile(functions[0]) }).toThrow()
  })
})