const { Project, SourceFile } = require("ts-morph");

/**
 * @param {SourceFile} sourceFile
 * @returns {boolean}
 */
const isReferencedByOtherFiles = (sourceFile) => sourceFile.getReferencingSourceFiles().length === 0

/**
 * @param {SourceFile[]} sourceFiles
 * @returns {SourceFile[]}
 */
const filterOutNonRootSourceFiles = (sourceFiles) => sourceFiles.reduce((set, sourceFile) => {
  return isReferencedByOtherFiles(sourceFile) ? set.concat(sourceFile) : set
}, [])

/**
 * @param {Project} project 
 * @returns {SourceFile[]}
 */
const getRootSourceFiles = (project) => filterOutNonRootSourceFiles(project.getSourceFiles());

module.exports = { getRootSourceFiles }