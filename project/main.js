/**
 * Site "Découvre les Animaux"
 * Application éducative interactive pour découvrir les animaux
 */

import { findAnimalById } from './findAnimalById.js';

// Base de données chargée dynamiquement
let animalsData = [];

// Variables globales pour gérer l'état de l'application
let currentAnimalId = null;

/**
 * Charge la liste des animaux depuis le fichier JSON
 * @returns {Promise<Array>} Tableau des animaux
 */
async function loadAnimals() {
    try {
        const response = await fetch('./data/animals.json');
        if (!response.ok) {
            throw new Error('Impossible de charger animals.json');
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

/**
 * Initialise l'application au chargement de la page
 */
async function initApp() {
    console.log('🚀 Initialisation du site "Découvre les Animaux"');

    // Charge les données depuis le fichier JSON
    animalsData = await loadAnimals();

    // Génère la liste des boutons d'animaux
    generateAnimalButtons();

    // Affiche le message de bienvenue par défaut
    showWelcomeMessage();

    console.log('✅ Application initialisée avec succès');
}

/**
 * Génère dynamiquement les boutons pour chaque animal
 */
function generateAnimalButtons() {
    const animalsGrid = document.getElementById('animalsGrid');
    
    // Vide le conteneur au cas où
    animalsGrid.innerHTML = '';
    
    // Crée un bouton pour chaque animal
    animalsData.forEach(animal => {
        const button = createAnimalButton(animal);
        animalsGrid.appendChild(button);
    });
    
    console.log(`📝 ${animalsData.length} boutons d'animaux générés`);
}

/**
 * Crée un bouton individuel pour un animal
 * @param {Object} animal - Les données de l'animal
 * @returns {HTMLElement} - L'élément bouton créé
 */
function createAnimalButton(animal) {
    const button = document.createElement('button');
    button.className = 'animal-button';
    button.setAttribute('data-animal-id', animal.id);
    button.setAttribute('aria-label', animal.name);
    button.setAttribute('aria-pressed', 'false');

    // Structure HTML du bouton
    button.innerHTML = `
        <div class="animal-emoji">${animal.emoji}</div>
        <div class="animal-name">${animal.name}</div>
    `;
    
    // Ajoute l'événement de clic
    button.addEventListener('click', () => handleAnimalClick(animal.id));
    
    return button;
}

/**
 * Gère le clic sur un bouton d'animal
 * @param {string} animalId - L'identifiant de l'animal cliqué
 */
function handleAnimalClick(animalId) {
    console.log(`🔍 Animal sélectionné: ${animalId}`);
    
    // Met à jour l'état visuel des boutons
    updateActiveButton(animalId);
    
    // Affiche les détails de l'animal
    displayAnimalDetails(animalId);
    
    // Met à jour l'animal actuel
    currentAnimalId = animalId;
}

/**
 * Met à jour l'état visuel des boutons (actif/inactif)
 * @param {string} activeAnimalId - L'ID de l'animal actuellement sélectionné
 */
function updateActiveButton(activeAnimalId) {
    const buttons = document.querySelectorAll('.animal-button');
    
    buttons.forEach(button => {
        const animalId = button.getAttribute('data-animal-id');
        
        if (animalId === activeAnimalId) {
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
        } else {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        }
    });
}

/**
 * Affiche les détails d'un animal dans la zone dédiée
 * @param {string} animalId - L'identifiant de l'animal à afficher
 */
function displayAnimalDetails(animalId) {
    const animal = findAnimalById(animalsData, animalId);
    
    if (!animal) {
        console.error(`❌ Animal non trouvé: ${animalId}`);
        return;
    }
    
    const detailsContainer = document.getElementById('animalDetails');
    
    // Génère le HTML de la fiche animal
    const animalCardHTML = `
        <div class="animal-card">
            <h3>
                <span class="animal-emoji">${animal.emoji}</span>
                ${animal.name}
            </h3>
            
            <img 
                src="${animal.image}" 
                alt="${animal.name}" 
                class="animal-image"
                onerror="this.style.display='none'"
            />
            
            <div class="animal-info">
                <div class="info-section">
                    <h4>📖 Description</h4>
                    <p>${animal.description}</p>
                </div>
                
                <div class="info-section">
                    <h4>🌍 Habitat naturel</h4>
                    <p>${animal.habitat}</p>
                </div>
            </div>
        </div>
    `;
    
    // Remplace le contenu avec animation
    detailsContainer.innerHTML = animalCardHTML;
    
    console.log(`✅ Détails affichés pour: ${animal.name}`);
}


/**
 * Affiche le message de bienvenue par défaut
 */
function showWelcomeMessage() {
    const detailsContainer = document.getElementById('animalDetails');
    
    detailsContainer.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">🌟</div>
            <h3>Bienvenue !</h3>
            <p>Sélectionne un animal pour découvrir ses caractéristiques fascinantes.</p>
        </div>
    `;
    
    console.log('👋 Message de bienvenue affiché');
}

/**
 * Fonction utilitaire pour déboguer - affiche les données dans la console
 */
function debugInfo() {
    console.log('🔧 Informations de débogage:');
    console.log('Nombre d\'animaux:', animalsData.length);
    console.log('Animal actuel:', currentAnimalId);
    console.log('Données des animaux:', animalsData);
}

// Lance l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initApp);

// Expose la fonction de debug uniquement en développement
if (import.meta.env.DEV) {
    window.debugAnimals = debugInfo;
}
