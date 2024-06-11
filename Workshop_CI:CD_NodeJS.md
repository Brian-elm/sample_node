```markdown
# Workshop CI / CD sur du nodejs

- Créer un nouveau repository sur github, `sample_node` par exemple.
- Créer un projet node avec la commande `npm init`, puis ajoutez un fichier `index.js` (vide pour l'instant)
- Ajoutez la dépendance à jest avec la commande `npm install jest`, qui sera notre outil de tests unitaires
- Créer un dossier `__tests__` et y inclure un fichier `index.spec.js`
  ```javascript
  test("hello_world", () => {
      expect(true).toBe(false)
  })
  ```
- Pour vérifier que vos tests fonctionnent bien, utilisez la commande `node_modules/.bin/jest .` (Ils doivent évidemment pas passer tant que vous ne mettez pas `expect(true).toBe(true)`)
- Ajoutez la dépendance à eslint avec `npm install eslint`.
- Exécutez la commande `node_modules/.bin/eslint --init` qui va permettre d'initialiser la configuration de votre linter.
  (Si tout va bien, vous devriez avoir un fichier avec ce contenu, sinon remplacez-le :
  ```javascript
  const globals = require('globals');

  module.exports = [
      {
          files: ['**/*.js'],
          languageOptions: {
              ecmaVersion: 2021,
              sourceType: 'commonjs',
              globals: {
                  ...globals.node
              }
          },
          rules: {
              'semi': ['error', 'always'],
              'quotes': ['error', 'single'],
              // Ajoutez vos règles ici
          }
      }
  ];
  ```
- Ensuite, vérifiez que eslint fonctionne avec la commande `node_modules/.bin/eslint .` (n'oubliez pas le `.` à la fin, ni celui du début d’ailleurs.)
  Si une erreur survient tel que : "L'exécution du script est désactivée sur ce système" - Contrôler le statut de sécurité : `Get-ExecutionPolicy`. Le résultat devrait être `Restricted`. Dans notre cas, nous allons mettre le niveau de sécurité sur `RemoteSigned`. Pour cela exécuter la PowerShell en mode Administrateur et lancer la commande `Set-ExecutionPolicy RemoteSigned`
- Dans le fichier `package.json`, modifiez le tag `"dependencies"` en `"devDependencies"`. (Car on va builder nous même et donc ajouter les dépendances à la volée) et modifiez les scripts pour avoir :
  ```json
  "scripts": {
      "test": "jest",
      "build": "node index.js",
      "lint": "eslint ."
  }
  ```
- On va push tout ça sur la branche `main`.
- Ensuite, on va dans GitHub Actions et on va créer notre propre workflow (Je vous laisse un peu galérer là-dessus, mais n'hésitez pas à demander si vous n'y arrivez pas, je peux vous fournir la trame). Le but ici est de lancer un build-test qui va faire notre `npm ci` (récup dynamique des dépendances), passer notre linter (eslint) et lancer nos tests (jest). Utilisez les scripts paramétrés plus haut dans le `package.json` exemple `npm run build` va lancer notre script `"node index.js"`.
- Chaque changement sur la branche `main` va lancer un workflow de CI.
- Faites en sorte que votre workflow soit complet.
- La première partie de ce workshop guidé est terminée !!
```