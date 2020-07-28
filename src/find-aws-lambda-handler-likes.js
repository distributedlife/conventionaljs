const { SourceFile, FunctionDeclaration } = require("ts-morph");
const { matchers } = require("./handler-matchers");

const trueIfAtLeastOneTrue = (outcome, matcherResult) => outcome || matcherResult;

/**
 * 
 * @param {FunctionDeclaration} f 
 * @return {boolean}
 */
const looksLikeALambdaHandler = (f) => {
  return matchers.map((matcher) => matcher(f)).reduce(trueIfAtLeastOneTrue, false)
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