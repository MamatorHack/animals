import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { findAnimalById } from '../findAnimalById.js';

const dataPath = new URL('../public/data/animals.json', import.meta.url);

let animals;

// Charger les données une seule fois avant les tests
await fs.readFile(dataPath, 'utf8').then(content => {
    animals = JSON.parse(content);
});

test('retourne le bon animal quand l\'ID existe', () => {
    const lion = findAnimalById(animals, 'lion');
    assert.equal(lion.name, 'Lion');
});

test('retourne undefined quand l\'ID est inconnu', () => {
    const result = findAnimalById(animals, 'inconnu');
    assert.equal(result, undefined);
});
