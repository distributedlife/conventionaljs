const { FunctionDeclaration, ts, ReferenceEntry } = require("ts-morph");

/**
 * @param {FunctionDeclaration} f 
 */
const assertEventObjectDoesNotEscapeFile = (f) => {
  const locationOfEntryPoint = f.getParameters()[0].getSourceFile().getFilePath()
  const referencedSymbols = f.getParameters()[0].getChildrenOfKind(ts.SyntaxKind.Identifier)[0].findReferences();

  const WeCanIgnoreTheFollowingReferences = ['Parameter', 'JSDocParameterTag'];

  /**
    * @type {ReferenceEntry[]}
   */
  const referencesWeCareAbout = referencedSymbols
    .reduce((references, referencedSymbol) => references.concat(referencedSymbol.getReferences()), [])
    .filter((reference) => !WeCanIgnoreTheFollowingReferences.includes(reference.getNode().getParentOrThrow().getKindName()))

  for (const reference of referencesWeCareAbout) {
    const parent = reference.getNode().getParentOrThrow();
    const siblingIdentifiers = parent.getChildrenOfKind(ts.SyntaxKind.Identifier);

    siblingIdentifiers.forEach((siblingIdentifiers) => {
      const definitionOfSiblingIdentifier = siblingIdentifiers.getDefinitions();
      definitionOfSiblingIdentifier.forEach((definition) => {
        if (definition.getSourceFile().getFilePath() !== locationOfEntryPoint) {
          throw new Error(`AWS Lamba event "${name}" used outside of handler file scope`)
        }
      })
    })
  }
}

module.exports = { assertEventObjectDoesNotEscapeFile }