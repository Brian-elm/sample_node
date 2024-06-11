# Workshop CI avec un projet node simple
## Initialisation du projet node
- Créer un nouveau repository sur github, sample_node par exemple.
- Créer un projet node avec la commande 
```npm init```
- **Lors de cette commande**, pensez à mettre "jest" comme commande de test, les autres questions posées peuvent être laissées par défaut.
- Puis ajoutez un fichier index.js (vide pour l'instant)

## Ajout de jest
- Ajoutez la dépendance à jest avec la commade 
```npm install jest```
- Jest sera notre outil de tests unitaires
- Créer un dossier ```__tests__``` et y inclure un fichier index.spec.js avec le code suivant :
```
test("hello_world", () => {
	expect(true).toBe(false)
})
```
- Pour vérifier que vos tests fonctionnent bien, utilisez la commande 
```npm test``` 
(Ils doivent évidemment pas passer tant que vous ne mettez pas expect(true).toBe(true))


## Ajout de eslint
- Ajoutez la dépendance à eslint avec 
```npm install eslint --save-dev```
- Ajouter dans le fichier package.json, dans la partie script au même niveau que "test": "jest" :
```"lint": "eslint ."```
- Exécutez la commande qui va permettre d'initialiser la configuration de votre linter.
```npm init @eslint/config@latest```
- Dans les options selectionnez :
	- To check syntax only
	- CommonJS OU JavaScript modules (ici CommonJS mais ça dépend de votre projet)
	- None of these
	- No (pour typescript)
	- Node
	- Yes (pour installer les dépendances)
	- npm (pour le package manager)
- Un fichier eslintrc.mjs sera créé, c'est ici que vous pouvez créer les différentes règles que vous voulez !
- Par exemple, voici un fichier avec quelques règles :
```
import globals from "globals"

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    },
    ignores: ['**/*.spec.js'],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": ["error", "always"],
      "semi": ["error", "never"]
    }
  },
  {
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": ["error", "always"],
      "semi": ["error", "never"]
    }
  }
]
```
- **Pensez surtout à la ligne ignore**, sinon vous aurez des erreurs sur les fichiers tests (leur structure n'étant pas classique, eslint n'aime pas trop ça)
- Ensuite, vérifiez que eslint fonctionne avec la commande 
```npm run lint --save-dev```
- Si vous n'avez pas de retour, c'est que la commande a fonctionné !
- Si une erreur survient telle que : "L'exécution du script est désactivée sur ce système" 
	- Contrôler le statut de sécurité : Get-ExecutionPolicy. Le résultat devrait être "Restricted" Dans notre cas, nous allons mettre le niveau de sécurité sur RemoteSigned. 
	- Pour cela exécuter PowerShell en mode Administrateur et lancer la commande 
	```Set-ExecutionPolicy RemoteSigned```
- Dans le fichier package.json modifiez les scripts pour avoir :
```
"scripts": {
	"test": "jest",
	"build": "node index.js",
	"lint": "eslint ."
},
```
- On va push tout ça sur la branche main (add/commit/push)

## Ajout du workflow d'intégration continue
- Ensuite, on va dans GitHub Actions et on va créer notre propre workflow (Je vous laisse un peu galérer là-dessus, mais n'hésitez pas à demander si vous n'y arrivez pas, je peux vous fournir la trame). Le but ici est de lancer un build-test qui va faire notre npm ci (récup dynamique des dépendances), passer notre linter (eslint) et lancer nos tests (jest). Utilisez les scripts paramétrés plus haut dans le package.json, par exemple ```npm run build``` va lancer notre script "node index.js".
- **Dans ce workflow ne gardez que la version "18.x" dans la matrix.** (On utilise une nouvelle version de eslint)
- Chaque changement sur la branche main va lancer un workflow de CI.
- Faites en sortes que votre workflow soit complet (build, tests, lint)
- La première partie de ce workshop guidé est terminée !!