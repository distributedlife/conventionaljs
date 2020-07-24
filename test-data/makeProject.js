const { Project } = require("ts-morph");
const makeProject = (testFile) => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      checkJs: true,
      noEmit: true,
      resolveJsonModule: true,
    }
  });
  project.addSourceFileAtPath(testFile);

  return project;
};
exports.makeProject = makeProject;
