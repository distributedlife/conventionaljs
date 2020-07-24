const { getRootSourceFiles } = require('./get-root-source-files');
const { Project } = require('ts-morph');

describe('getRootSourceFiles', () => {
  it('should return source files not referenced by another source file', () => {
    const project = new Project({
      compilerOptions: {
        allowJs: true,
        checkJs: true,
        noEmit: true,
        resolveJsonModule: true,
      }
    });
    project.addSourceFileAtPath('./test-data/es6-module-with-external-usage.js');
    project.resolveSourceFileDependencies();

    expect(getRootSourceFiles(project)).toHaveLength(1)
    expect(getRootSourceFiles(project)[0].getBaseName()).toEqual('es6-module-with-external-usage.js')

    expect(project.getSourceFiles().map((sourceFile) => sourceFile.getBaseName())).toEqual([
      'es6-module-with-external-usage.js', 'external-usage.js'
    ])
  })
})