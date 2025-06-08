# Animals

Site éducatif pour découvrir différentes espèces d'animaux. Le projet utilise [Vite](https://vitejs.dev/) pour le développement et la mise en production.

## Installation

```bash
npm install
```

## Démarrage du serveur de développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173` par défaut.

## Construction du projet

```bash
npm run build
```

## Tests

Des tests basés sur le moteur intégré de Node peuvent être exécutés avec :

```bash
npm test
```

## Structure du projet

- `project/index.html` – page principale du site.
- `project/main.js` – logique de l'application.
- `project/style.css` – styles.
- `project/public/data/animals.json` – données utilisées pour générer la liste d'animaux.
- `tests/` – tests unitaires.

## Outils de débogage

En mode développement (`npm run dev`), une fonction `debugAnimals` est disponible dans la console pour afficher l'état courant des données.
