const { findAwsLambdaHandlerLikes } = require("./find-aws-lambda-handler-likes");
const { makeProject } = require("../test-data/makeProject");
const { matchers } = require("./handler-matchers");

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

    describe('without JSDoc annotations', () => {
      it('should match the param pattern (event, context, callback)', () => {
        const project = makeProject('./test-data/es6-module-no-js-doc.js');
        expect(findAwsLambdaHandlerLikes(project.getSourceFiles())).toHaveLength(1)
      })

      it('should match the param pattern (event, context) when the handler is async', () => {
        const project = makeProject('./test-data/es6-module-no-js-doc-async.js');
        expect(findAwsLambdaHandlerLikes(project.getSourceFiles())).toHaveLength(1)
      })

      it('should match the param pattern (event) when the handler is async and is called handler', () => {
        const project = makeProject('./test-data/es6-module-no-js-doc-async-no-context.js');
        expect(findAwsLambdaHandlerLikes(project.getSourceFiles())).toHaveLength(1)
      })

      it('should NOT match the param pattern (event) when the handler is async and not called handler', () => {
        const project = makeProject('./test-data/es6-module-no-js-doc-async-no-context-other-handler-name.js');
        expect(findAwsLambdaHandlerLikes(project.getSourceFiles())).toHaveLength(0)
      })

      it('should NOT match the param pattern (someOtherName) when the handler is async and not called handler', () => {
        const project = makeProject('./test-data/es6-module-no-js-doc-async-no-context-other-param-name.js');
        expect(findAwsLambdaHandlerLikes(project.getSourceFiles())).toHaveLength(0)
      })
    })
  })
})