const { SourceFile, ts, FunctionDeclaration } = require("ts-morph")

const AwsLambdaEventTypes = ['AWSLambda.DynamoDBStreamEvent']

/**
 * @param {string} apparentTypeText 
 * @return {boolean}
 */
const isAwsLambdaEventType = (apparentTypeText) => AwsLambdaEventTypes.includes(apparentTypeText);

/**
 * 
 * @param {FunctionDeclaration} f 
 * @return {boolean}
 */
const looksLikeALambdaHandler = (f) => {
  const name = f.getParameters()[0].getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getType().getApparentType().getText();
  return isAwsLambdaEventType(name);
}

/**
 * @param {SourceFile[]} sourceFiles 
 * @returns {FunctionDeclaration[]}
 */
const findAwsLambdaHandlerLikes = (sourceFiles) => {
  return sourceFiles.reduce((set, sourcefile) => {
    const candidateFunctions = sourcefile.getFunctions();
    const functions = candidateFunctions.filter(looksLikeALambdaHandler);

    return set.concat(...functions);
  }, [])
}

module.exports = { findAwsLambdaHandlerLikes }