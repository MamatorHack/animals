# Animals

Site éducatif pour découvrir différentes espèces d'animaux. Le projet utilise [Vite](https://vitejs.dev/) pour le développement et la mise en production.
Un menu déroulant permet maintenant de filtrer les espèces terrestres et sous-marines.
Le fond du site utilise un vert clair pour une ambiance naturelle.

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
- `project/public/data/animals.json` – données utilisées pour générer la liste d'animaux et leurs catégories.
- `tests/` – tests unitaires.

Un sélecteur permet de filtrer les animaux par type (terrestre ou sous-marin).

## Outils de débogage

En mode développement (`npm run dev`), une fonction `debugAnimals` est disponible dans la console pour afficher l'état courant des données.
