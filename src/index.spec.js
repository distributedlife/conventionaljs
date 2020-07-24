const { Project } = require("ts-morph");

const project = new Project({
  compilerOptions: {
    allowJs: true,
    checkJs: true,
    noEmit: true,
    resolveJsonModule: true,
  }
});
project.addSourceFilesAtPaths(['./test-data/aws-lambda-dynamo-db-stream-event.js']);
project.resolveSourceFileDependencies();

describe('getAwsLambdaCallbackLikes', () => {
  it('should includes functions where the first param is a AwsLambdaType', () => {
    const exportedDeclarations = project.getSourceFiles()[0].getExportedDeclarations();

    // console.log(project.getSourceFiles())
    console.log(exportedDeclarations)
    expect(exportedDeclarations.has('handler')).toBeTruthy()
  });
})