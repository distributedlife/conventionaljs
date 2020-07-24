const { checkProject } = require("./check-project");
const { Project } = require("ts-morph");

describe('check-project', () => {
  it('should pull it all together', () => {
    const project = new Project({
      compilerOptions: {
        allowJs: true,
        checkJs: true,
        noEmit: true,
        resolveJsonModule: true,
      }
    });
    project.addSourceFileAtPath('./test-data/es6-module-with-external-usage.js');

    expect(() => { checkProject(project) }).toThrow(`AWS Lamba event "AWSLambda.DynamoDBStreamEvent" used outside of handler file scope`)
  })
})