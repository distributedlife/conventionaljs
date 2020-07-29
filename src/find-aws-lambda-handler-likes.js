const { SourceFile, FunctionDeclaration, ArrowFunction, ExpressionStatement, SyntaxKind } = require("ts-morph");
const { matchers } = require("./handler-matchers");

const trueIfAtLeastOneTrue = (outcome, matcherResult) => outcome || matcherResult;

/**
 * 
 * @param {(FunctionDeclaration|ArrowFunction)} f
 * @return {boolean}
 */
const looksLikeALambdaHandler = (f) => {
  return matchers.map((matcher) => matcher(f)).reduce(trueIfAtLeastOneTrue, false)
}

/**
 * @param {SourceFile} sourcefile 
 * @returns {ArrowFunction[]}
 */
const tryAsCommonJS = (sourcefile) => {
  /**
   * @type {ExpressionStatement[]}
   */
  const expressionStatements = sourcefile.getDescendantsOfKind(SyntaxKind.ExpressionStatement);
  const candidateFunctions = expressionStatements.map((expressionStatement) => {
    const binaryStatements = expressionStatement.getDescendantsOfKind(SyntaxKind.BinaryExpression);
    return binaryStatements
      .map((binaryStatement) => binaryStatement.getDescendantsOfKind(SyntaxKind.ArrowFunction))
      .filter(Boolean)
      .reduce((set, arr) => set.concat(arr), []);
  }).reduce((set, arr) => set.concat(arr), [])

  return candidateFunctions.filter(looksLikeALambdaHandler);
}

/**
 * @param {FunctionDeclaration[]} functions 
 */
const asEs6Modules = (functions) => functions.filter(looksLikeALambdaHandler);

/**
 * @param {SourceFile[]} sourceFiles 
 * @returns {(FunctionDeclaration|ArrowFunction)[]}
 */
const findAwsLambdaHandlerLikes = (sourceFiles) => {
  return sourceFiles.reduce((set, sourcefile) => {
    const candidateFunctions = sourcefile.getFunctions();
    if (candidateFunctions.length === 0) {
      return set.concat(...tryAsCommonJS(sourcefile))
    }

    return set.concat(...asEs6Modules(candidateFunctions));
  }, [])
}

module.exports = { findAwsLambdaHandlerLikes }