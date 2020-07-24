const { Project } = require("ts-morph");
const { getRootSourceFiles } = require('./get-root-source-files')
const { findAwsLambdaHandlerLikes } = require('./find-aws-lambda-handler-likes');
const { assertEventObjectDoesNotEscapeFile } = require("./assert-event-object-does-not-escape-file");

/**
 * @param {Project} project 
 */
const checkProject = (project) => {
  const sourceFiles = getRootSourceFiles(project);

  findAwsLambdaHandlerLikes(sourceFiles).map(assertEventObjectDoesNotEscapeFile);
}

module.exports = { checkProject }