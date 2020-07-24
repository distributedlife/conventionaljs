const { findAwsLambdaHandlerLikes } = require("./find-aws-lambda-handler-likes");
const { makeProject } = require("../test-data/makeProject");

describe('find-aws-lambda-handler-likes', () => {
  describe('es6 modules', () => {
    it('should ignore files that do not export functions', () => {
      const project = makeProject('./test-data/es6-module-non-function-export.js');
      expect(findAwsLambdaHandlerLikes(project.getSourceFiles())).toHaveLength(0)
    })

    it('should find es6 modules', () => {
      const project = makeProject('./test-data/es6-module.js');
      expect(findAwsLambdaHandlerLikes(project.getSourceFiles())).toHaveLength(1)
    })
  })
})