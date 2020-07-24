# conventionaljs
Conventional tests for your JS and TS.

There is only one rule so far and it's incomplete.
- Make sure AWS Lambda event handler input parameters don't escape the file they are defined in.

## Usage
You'll need [entente](https://github.com/h-o-t/entente) or [ts-morph](https://github.com/dsherret/ts-morph) for this.

### entente (known entrypoints only at the moment)
```js
const { createProject } = require("ts-morph");
createProject('./src/index.js');

checkProject(project) 
```

### ts-morph (find entrypoints in a source tree)
```js
const compilerOptions = {
  allowJs: true,
  checkJs: true,
  noEmit: true,
  resolveJsonModule: true,
};

const project = new Project({ compilerOptions });
project.resolveSourceFileDependencies();
project.addSourceFilesAtPaths(['./src/**/*.js', "!./src/**/*.spec.js"]);

checkProject(project) 
```

## Todos
- [ ] Make it work with commonjs modules. ts-morph is having a hard time here.
- [ ] Make it work when someone hasn't annotated the function with JSDoc. There are few things we can do here around scoring the function based on name `handler` and whether it has 3 params (event, context, callback) or 1-2 params (event, [context]) for async functions.
- [ ] Make sure it doesn't escape through a renamed reference.
