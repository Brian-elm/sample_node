```markdown
# Workshop CI/CD sur Node.js

## Introduction
Ce workshop a pour but de vous guider à travers la configuration d'un pipeline CI/CD pour un projet Node.js utilisant Jest pour les tests unitaires et ESLint pour le linting du code.

## Étapes du Workshop

### 1. Création du Repository
- Créez un nouveau repository sur GitHub, nommé `sample_node` par exemple.

### 2. Initialisation du Projet Node.js
- Initialisez un nouveau projet Node.js avec la commande :
  ```sh
  npm init
  ```
- Ajoutez un fichier `index.js` (vide pour l'instant).

### 3. Ajout de Jest
- Ajoutez la dépendance Jest avec la commande :
  ```sh
  npm install jest
  ```
- Créez un dossier `__tests__` et y incluez un fichier `index.spec.js` avec le contenu suivant :
  ```javascript
  test("hello_world", () => {
      expect(true).toBe(false)
  })
  ```

### 4. Vérification des Tests
- Pour vérifier que vos tests fonctionnent bien, utilisez la commande :
  ```sh
  node_modules/.bin/jest .
  ```
  Les tests ne doivent pas passer tant que vous ne mettez pas `expect(true).toBe(true)`.

### 5. Ajout de ESLint
- Ajoutez la dépendance ESLint avec la commande :
  ```sh
  npm install eslint
  ```
- Initialisez ESLint avec la commande :
  ```sh
  node_modules/.bin/eslint --init
  ```

### 6. Configuration de ESLint
- Si tout va bien, vous devriez avoir un fichier de configuration. Sinon, remplacez-le par le contenu suivant :
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

### 7. Vérification de ESLint
- Vérifiez que ESLint fonctionne avec la commande :
  ```sh
  node_modules/.bin/eslint .
  ```
  Si une erreur survient telle que : "L'exécution du script est désactivée sur ce système" :
  - Contrôlez le statut de sécurité avec :
    ```sh
    Get-ExecutionPolicy
    ```
  - Si le résultat est `Restricted`, exécutez PowerShell en mode Administrateur et lancez la commande :
    ```sh
    Set-ExecutionPolicy RemoteSigned
    ```

### 8. Modification du fichier `package.json`
- Modifiez le tag `"dependencies"` en `"devDependencies"`. 
- Modifiez les scripts pour avoir :
  ```json
  "scripts": {
      "test": "jest",
      "build": "node index.js",
      "lint": "eslint ."
  }
  ```

### 9. Push sur la branche `main`
- Poussez tout sur la branche `main`.

### 10. Configuration de GitHub Actions
- Allez dans GitHub Actions et créez votre propre workflow. Le but est de lancer un build-test qui va :
  - Faire `npm ci` (récupération dynamique des dépendances)
  - Passer le linter (eslint)
  - Lancer les tests (jest)
  - Utilisez les scripts paramétrés plus haut dans le `package.json`.

  Voici une trame pour le fichier `.github/workflows/ci.yml` :
  ```yaml
  name: Node.js CI

  on:
    push:
      branches: [ "main" ]
    pull_request:
      branches: [ "main" ]

  jobs:
    build:

      runs-on: ubuntu-latest

      strategy:
        matrix:
          node-version: [14.x, 16.x, 18.x]

      steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - name: Run ESLint
        run: npm run lint
      - run: npm run build --if-present
      - run: npm test
  ```

### 11. Conclusion
- Chaque changement sur la branche `main` va lancer un workflow de CI.
- Assurez-vous que votre workflow soit complet.

## Fin de la première partie du workshop guidé !

Félicitations pour avoir configuré votre pipeline CI/CD avec GitHub Actions pour votre projet Node.js !