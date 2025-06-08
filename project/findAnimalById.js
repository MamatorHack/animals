export function findAnimalById(animals, animalId) {
    return animals.find(animal => animal.id === animalId);
}
