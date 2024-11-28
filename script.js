// récupère tous mes éléments HTML

// les liens
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');

const trakingContenaire = document.getElementById('traking');

// récupération des données dans le JSON
function loadData() {
    fetch('data.json')
        .then((reponse) => {
            if (!reponse.ok) {
                throw new Error(`${reponse.status}`);
            }
            return reponse.json();
        })
        .then((data) => {
            displayData(data, 'daily');
            setupEventListeners(data); // Attache les événements après avoir récupéré les données
        })
        .catch((error) => {
            console.log(`désolé ${error}`);
            trakingContenaire.textContent = `Désolé, impossible de charger vos statistiques : ${error}`;
        });
}

function setupEventListeners(data) {
    // Écoute pour le clic sur le bouton "daily"
    daily.addEventListener('click', () => {
        displayData(data, 'daily'); // Affiche les données pour 'daily'
    });

    // Tu peux aussi ajouter les événements pour weekly et monthly si nécessaire
    weekly.addEventListener('click', () => {
        displayData(data, 'weekly');
    });

    monthly.addEventListener('click', () => {
        displayData(data, 'monthly');
    });
}

function displayData(data, timeframe) {
    // Réinitialise le contenu
    trakingContenaire.textContent = '';

    data.forEach((info) => {
        // creation de la div contentstat
        const statContent = document.createElement("div")
        statContent.className = "main-content"
        // Création de la div statistique
        const statContenaire = document.createElement('div');
        statContenaire.className = 'stat-contenaire';


        // Création des titres des stats
        const title = document.createElement('h4');
        title.textContent = info.title;

        // Création de l'icône du paramètre
        const setingIcon = document.createElement('img');
        setingIcon.src = 'images/icon-ellipsis.svg';

        // Création de la div qui contiendra l'icône et le titre
        const titleContenaire = document.createElement('div');
        titleContenaire.className = 'title-contenaire';
        titleContenaire.appendChild(title);
        titleContenaire.appendChild(setingIcon);

        // Création de la div qui contiendra les durées actuelle et passée
        const timeContenaire = document.createElement('div');
        timeContenaire.className = 'time-contenaire';

        // Création de la durée actuelle
        const currentTime = document.createElement('h2');
        currentTime.textContent = `${info.timeframes[timeframe].current} hrs`;

        // Création de la durée passée
        const pastTime = document.createElement('p');
        pastTime.textContent = `Last week - ${info.timeframes[timeframe].previous} hrs`;

        timeContenaire.appendChild(currentTime);
        timeContenaire.appendChild(pastTime);

        // Ajoute les conteneurs dans la div principale
        statContenaire.appendChild(titleContenaire);
        statContenaire.appendChild(timeContenaire);

        statContent.appendChild(statContenaire)
        // Ajoute au conteneur principal
        trakingContenaire.appendChild(statContent);
    });
}

loadData();
