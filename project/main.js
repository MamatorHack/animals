/**
 * Site "Découvre les Animaux"
 * Application éducative interactive pour découvrir les animaux
 */

// Base de données des animaux avec toutes leurs informations
const animalsData = [
    {
        id: 'lion',
        name: 'Lion',
        emoji: '🦁',
        image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Le lion est surnommé le "roi des animaux" pour sa prestance et sa crinière majestueuse. Il vit en groupe appelé fierté et peut courir jusqu\'à 80 km/h sur de courtes distances.',
        habitat: 'Savanes africaines, prairies et zones semi-désertiques'
    },
    {
        id: 'elephant',
        name: 'Éléphant',
        emoji: '🐘',
        image: 'https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'L\'éléphant est le plus grand mammifère terrestre. Il possède une mémoire exceptionnelle et utilise sa trompe comme une "main" pour saisir des objets, se laver et communiquer.',
        habitat: 'Forêts tropicales, savanes et déserts d\'Afrique et d\'Asie'
    },
    {
        id: 'pingouin',
        name: 'Pingouin',
        emoji: '🐧',
        image: 'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Le pingouin est un excellent nageur qui peut plonger jusqu\'à 500 mètres de profondeur. Ses "ailes" sont adaptées pour nager plutôt que voler, et il peut atteindre 35 km/h sous l\'eau.',
        habitat: 'Régions polaires antarctiques, côtes rocheuses et banquises'
    },
    {
        id: 'tigre',
        name: 'Tigre',
        emoji: '🐅',
        image: 'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Le tigre est le plus grand félin sauvage au monde. Ses rayures sont uniques à chaque individu, comme nos empreintes digitales. C\'est un chasseur solitaire et nocturne très agile.',
        habitat: 'Forêts tropicales, mangroves et prairies d\'Asie'
    },
    {
        id: 'girafe',
        name: 'Girafe',
        emoji: '🦒',
        image: 'https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'La girafe est l\'animal le plus grand du monde, pouvant mesurer jusqu\'à 6 mètres. Son long cou lui permet d\'atteindre les feuilles d\'acacia en hauteur que les autres animaux ne peuvent pas atteindre.',
        habitat: 'Savanes africaines, zones boisées clairsemées'
    },
    {
        id: 'dauphin',
        name: 'Dauphin',
        emoji: '🐬',
        image: 'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Le dauphin est réputé pour son intelligence exceptionnelle. Il utilise un système de sonar naturel pour naviguer et chasser, et peut reconnaître son reflet dans un miroir.',
        habitat: 'Océans, mers tempérées et tropicales du monde entier'
    }
];

// Variables globales pour gérer l'état de l'application
let currentAnimalId = null;

/**
 * Initialise l'application au chargement de la page
 */
function initApp() {
    console.log('🚀 Initialisation du site "Découvre les Animaux"');
    
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
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Affiche les détails d'un animal dans la zone dédiée
 * @param {string} animalId - L'identifiant de l'animal à afficher
 */
function displayAnimalDetails(animalId) {
    const animal = findAnimalById(animalId);
    
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
 * Recherche un animal par son identifiant
 * @param {string} animalId - L'identifiant à rechercher
 * @returns {Object|undefined} - L'animal trouvé ou undefined
 */
function findAnimalById(animalId) {
    return animalsData.find(animal => animal.id === animalId);
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

// Expose la fonction de debug globalement pour le développement
window.debugAnimals = debugInfo;