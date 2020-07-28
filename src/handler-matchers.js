const { ts, FunctionDeclaration } = require("ts-morph");
const AwsLambdaEventTypes = ['AWSLambda.DynamoDBStreamEvent'];

/**
 * @param {FunctionDeclaration} f
 * @return {boolean}
 */
const isAwsLambdaEventType = (f) => {
  const apparentTypeText = f.getParameters()[0].getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getType().getApparentType().getText();

  return AwsLambdaEventTypes.includes(apparentTypeText);
};

/**
 * @param {FunctionDeclaration} f
 * @return {boolean}
 */
const has3paramsEventContextAndCallback = (f) => {
  const numParams = f.getParameters().length;
  if (numParams !== 3) {
    return false;
  }

  const p1Name = f.getParameters()[0].getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getText();
  const p2Name = f.getParameters()[1].getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getText();
  const p3Name = f.getParameters()[2].getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getText();

  return p1Name === 'event' && p2Name === 'context' && p3Name === 'callback';
};

/**
 * @param {FunctionDeclaration} f
 * @return {boolean}
 */
const has2paramsEventContextAndIsAsync = (f) => {
  const numParams = f.getParameters().length;
  if (numParams !== 2) {
    return false;
  }

  const isAsync = f.isAsync();

  const p1Name = f.getParameters()[0].getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getText();
  const p2Name = f.getParameters()[1].getChildrenOfKind(ts.SyntaxKind.Identifier)[0].getText();

  return p1Name === 'event' && p2Name === 'context' && isAsync;
};

const matchers = [
  isAwsLambdaEventType,
  has3paramsEventContextAndCallback,
  has2paramsEventContextAndIsAsync
]

module.exports = { matchers }