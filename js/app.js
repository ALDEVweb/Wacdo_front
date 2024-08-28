// Axe d'amélioration, 
// vérifier la saisie d'une sauce avant de passer à l'étape suivant
// vérifier la sélection de la boisson avant de valider le menu
// vérifier la saisi du numéro avant d'enregistrer la commande



/* Gestion du Slider */

// récupération des éléments du slider
let wrapper = document.getElementById('slider-wrapper')
let slider = document.getElementById('slider');
let buttonNext = document.getElementById('button-next');
let buttonPrev = document.getElementById('button-prev');

/* Gestion de l'affichage de la liste des catégorie dans le slider */

// fonction de création d'une slide catégorie
// parametre : categorie = l'objet categorie à afficher
// retour : un élément html
function carteCategorie(categorie){
    return `<div data-cat='${categorie.title}' class="slide flex j-center a-center round8">
                <div class="imageCat"><img src="assets/${categorie.image}" alt="illustration de ${categorie.title} Wacdo"></div>
                <p class="w100 txt-center fs14 fw400">${majusculePremierMot(categorie.title)}</p>
            </div>`;
}

// fonction de transformation de la première lettre d'un mot en lettre majuscule
// parametre : text = texte à modifier
// retour : le texte avec la première lettre en majuscule
function majusculePremierMot(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// fonction de d'affichage des slides catégorie dans le slider
// parametre : categories = la liste des objet categorie a afficher
function afficheListCat(categories){
    //initialisation de la div préparatoir à intégrer
    let divSlider = "";
    // boucle sur les catégories
    categories.forEach(categorie => {
        // création et ajout à la div préparatoire d'une slide catégorie
        divSlider += carteCategorie(categorie);
    });
    slider.innerHTML = divSlider
}

// récupération des catégorie et affichage dans le slider
function recupCategorie(){
    //fetch('json/categories.json')
    fetch('http://exam-back.alaugier.mywebecom.ovh/commandes/index.php?controleur=api/retourner_categories_json')
    .then(response => response.json())
    .then(data => {
        afficheListCat(data);
        // récupération des slides générés
        let slides = document.querySelectorAll('.slide')
        // application de la classe select à la slide de l'index 0
        selectSlide(slides[0]);
        // appelle de la fonction qui écoute le click sur les slides catégorie
        ecouteClickSlideCat(slides);
        // mise à jour de la position du slider au démarrage
        updatePosition(data.length);
        buttonNavSlider(data.length);
    })
}

// lancement de la fonction de récupération des catégories
recupCategorie()

// fonction d'application de la classe select à une slide et suppression de cette meme classe à celle qui a déjà cette classe
// parametre: slide = la slide a laquelle appliquer la classe select
function selectSlide(slide){
    let slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('select');
    });
    slide.classList.add('select');
}

// fonction d'écoute du click sur les slides cat
// récupère le json des produits par catégories
// au click, appelle la fonction selectslide pour la slide à l'index cliqué
// récupère le data-cat de la slide
// appelle la fonction d'affichage de la description de la catégorie
// appelle ensuite la fonction d'affichage des produits pour le data-cat récupéré
// parametre : slides = la liste des slides du slider
function ecouteClickSlideCat(slides){
    //fetch('json/produits.json')
    fetch('http://exam-back.alaugier.mywebecom.ovh/commandes/index.php?controleur=api/retourner_produits_json')
    .then(response => response.json())
    .then(data => {
        // initialisation de l'affichage sur menu
        afficheDescriptionCat('menus');
        afficheListeProduits('menus', data.menus);
        // appele de la fonction qui écoute le click sur les produits
        ecouteClickProduit();
        // bouclage sur les slides pour poser les écouteurs d'évenements
        slides.forEach((slide) => {
            slide.addEventListener('click', () => {
                selectSlide(slide);
                let dataCat = slide.dataset.cat;
                afficheDescriptionCat(dataCat);
                afficheListeProduits(dataCat, data[dataCat]);
                // appele de la fonction qui écoute le click sur les produits
                ecouteClickProduit();
            });
        });
    });
}

// fonction d'affichage de la description de la catégorie
// récupère la zone a modifier
// interoge le parametre pour connaitre lequel est à affiché (menus, boissons, burgers, frites, encas, wraps, salades, desserts, sauces)
// en fonction, crée le texte de description associé
// puis on integre ce texte dans le html ciblé
// parametre : categorie = la categorie selectionné
function afficheDescriptionCat(categorie){
    let descriptionCat = document.getElementById('description-cat');
    let textCat = '';
    switch(categorie){
        case 'menus':
            textCat = 'Un sandwich, une friture ou une salade et une boisson';
            break;
        case 'boissons':
            textCat = 'Une petite soif, sucrée, légère, rafraîchissante';
            break;
        case 'burgers':
            textCat = 'Pain moelleux, viande juteuse, garnitures savoureuses';
            break;
        case 'frites':
            textCat = "Croustillantes et dorées, fondantes à l'intérieur";
            break;
        case 'encas':
            textCat = 'Petits plaisirs gourmands à tout moment';
            break;
        case 'wraps':
            textCat = 'Galette légère, ingrédients frais et savoureux';
            break;
        case 'salades':
            textCat = 'Fraîcheur et variété dans chaque bouchée';
            break;
        case 'desserts':
            textCat = 'Douceurs sucrées pour les gourmands';
            break;
        case 'sauces':
            textCat = 'Ajoutez du goût avec nos sauces maison';
            break;
        default :
            textCat = 'Une sélection délicieuse pour tous les goûts';
    }
    descriptionCat.innerHTML = 
        `<h2 class='fs28 fw400'>${creaTitreCat(categorie)}</h2>
        <p class='fs14 fw400 mt16' >${textCat}</p>`;
}


// fonction de création du titre de la description de la catégorie (on rajoute 'Nos ' avant le titre de la catégorie)
// parametre : categorie = la categorie selectionné
// retour : le texte à mettre dans le titre
function creaTitreCat(categorie){
    return 'Nos ' + categorie;
}


// fonction d'affichage de la liste des produits d'une categorie passé en parametre,
// pour chaque produit, appel la fonction de création de la carte produit
// parametre : categorie = la categorie selectionné
//             produits = la liste des produits de la catégorie
function afficheListeProduits(categorie, produits){
    let listeProduits = document.getElementById('liste-produits');
    let htmlProduits = '';
    produits.forEach(produit => {
        htmlProduits += carteProduit(categorie, produit);
    })
    listeProduits.innerHTML = htmlProduits;
}

// fonction de création d'une carte produit (une image, son nom, et son prix)
// parametre : categorie = la categorie du produit
//             produit = l'objet produit
// retour : la carte produit en html
function carteProduit(categorie, produit){
    return `
        <div data-cat=${categorie} data-prodid=${produit.id} class="produit round8">
            <div class='produitImg w100 flex j-center a-center'><img src="assets${produit.image}" alt="illustration ${produit.nom}"></div>
            <h3 class='fs18 fw400'>${produit.nom}</h3>
            <p class='mt8 fs18 fw400'>${produit.prix} €</p>
        </div>
        `
}
    
// coté responsive, fonction de calcul du nombre de slide affiché dans le slider en mesurant la taille du wrapper puis en la divisant pas la taille d'une slide + le gap séparant 2 slide (120+36)
function calculNombreSlide() {
    let largeurWrapper = wrapper.offsetWidth;
    return Math.floor(largeurWrapper / 136);
}

// fonction de mise à jour de la position du slider (au démarrage sera à 0), dépend de l'index de la slide, et on gere l'activation ou non des boutons, dépend  du nombre de slide total et de l'index affiché et du nombre de slide affiché
// on décale la div vers la gauche du nombre de l'index multiplié par la largeur d'une slide (136)
// on récupère le nombre de slide affiché
// ensuite, si on est a l'index 0 on désactive le bouton précédent, et si on est à l'index maxi, on désactive le bouton suivant, sinon on les laisse actif
// parametre : slidesTotal = nombre total de slide dans le slider
function updatePosition(slidesTotal) {
    // récupération de la taillle de l'écran
    let largeurEcran = window.innerWidth;
    // gestion de l'affichage des slides
    if(largeurEcran > 699) slider.style.transform = `translateX(-${indexSlide * 136}px)`;
    else slider.style.transform = `translateX(-${indexSlide * 68}px)`;
    // gestion des boutons
    let nombreSlide = calculNombreSlide();
    // Activation/désactivation des boutons
    // boutton précédent
    if (indexSlide === 0) buttonPrev.disabled = true;
    else buttonPrev.disabled = false;
    // boutton suivant
    if (indexSlide >= slidesTotal - nombreSlide) buttonNext.disabled = true;
    else buttonNext.disabled = false;
}

// initialisation de l'index de la slide affiché a gauche du slider (au premier affichage de la page)
let indexSlide = 0;

// gestion des boutons
// on incrémente/décrémente l'index de la slide
// on appelle la fonction updatePosition pour mettre à jour la position du slider
// bouton suivant
// si l'index de la slide est inférieur au nombre max de slide moins le nombre de slide affiché, on incrémente et met à jour la position
// parametre : slidesTotal = nombre total de slide dans le slider
function buttonNavSlider(slidesTotal){
    buttonNext.addEventListener('click', () => {
        if (indexSlide < slidesTotal - calculNombreSlide()){
            indexSlide++;
            updatePosition();
        }
    });
    // bouton précédent
    // si l'index de la side est supérieur à 0 on décrémente et met à jour la position
    buttonPrev.addEventListener('click', () => {
        if (indexSlide > 0) {
            indexSlide--;
            updatePosition();
        }
    });
}

// fonction d'écoute du click sur les produits
function ecouteClickProduit() {
    // on récupère les éléments produits
    let produits = document.querySelectorAll('.produit');
    // on écoute les clics et lance la fonction d'action sur le prouit
    produits.forEach(produit => {
        produit.addEventListener('click', (e) =>{
            // on récupère le data-cat et le data-prodId du produit
            let cat = produit.dataset.cat;
            let prodId = produit.dataset.prodid;
            // on appelle la fonction d'action sur le produit
            actionSurProduit(cat, prodId);
        })
    });
}

// fonction d'action sur le produit

let idArticlePanier = 0
let article = {
    "articleId": idArticlePanier,
    "categorie": "",
    "prodId": 0,
    "quantite": 1,
    "options":[]
}


// initialisation d'une option
let option = {
    'taille': 0,
    'frites': "",
    'sauces': 0,
    'boissons': 0,
}


// fonction de gestion du clic sur un produit
//parametre : cat = catégorie du produit
//            prodId = id du produit
function actionSurProduit(cat, prodId) {
    // on initialise l'article à ajouter au panier
    initArticle(cat, prodId);
    // on récupère les produits
    // fetch(`json/produits.json`)
    fetch('http://exam-back.alaugier.mywebecom.ovh/commandes/index.php?controleur=api/retourner_produits_json')
    .then(response => response.json())
    .then(data => {
        // on cherche le produit qui a l'id prodId dans la catégorie cat
        let produit = data[cat].find(p => p.id == prodId);
        let listeBoissons = data.boissons;
        let listeSauces = data.sauces;
        // on appelle la fonction de création de la sélection de quantité
        togglePopOption();
        initOption();
        if(cat === 'menus') processOption('menu-taille', null, listeSauces, listeBoissons);
        else if(cat === 'boissons') processOption("boissons-taille", produit);
        else processOption("quantite", produit);
    })
}

// fonction de création d'un menu
// parametre : etape = l'etape recherché du process
//             produit = le produit concerné, nullable
//             listeSauces = la liste des sauces, nullable
//             listeBoissons = la liste des boissons, nullable
function processOption(etape, produit = null, listeSauces = null, listeBoissons = null) {
    if(etape === "menu-taille" ){
        // option par défaut = maxi (2)
        option.taille = 2;
        // creation du pop menu-taille
        createPopOptionMessage(etape);
        // surveille la selection de la taille
        surveilleChoixTailleMenu();
        // on lance la fonction de surveillance du bouton de fermeture du pop
        surveilleClosePopOption();
        // surveille clic etape suivante
        surveilleEtapeSuivante("menu-frites", listeSauces, listeBoissons);
    }else if( etape === "menu-frites"){
        //option par défaut = frites
        option.frites = "frites"
        // creation du pop menu-frites
        createPopOptionMessage(etape);
        // surveille le choix des frites
        surveilleChoixFrites();
        // on lance la fonction de surveillance du bouton de fermeture du pop
        surveilleClosePopOption();
        // surveille clic etape suivante
        surveilleEtapeSuivante("menu-sauces", listeSauces, listeBoissons);
        surveilleEtapePrecedente("menu-taille", listeSauces, listeBoissons)
    }else if( etape === "menu-sauces"){
        // creation du pop menu-sauces
        createPopOptionMessage(etape, null, listeSauces);
        // surveille le choix des sauces
        surveilleChoixMultiple("sauces");
        // on lance la fonction de surveillance du bouton de fermeture du pop
        surveilleClosePopOption();
        // surveille clic etape suivante
        surveilleEtapeSuivante("menu-boissons", listeSauces, listeBoissons);
        surveilleEtapePrecedente("menu-frites", listeSauces, listeBoissons)
    }else if( etape === "menu-boissons"){
        // creation du pop menu-sauces
        createPopOptionMessage(etape, null, listeBoissons);
        // surveille le choix des boissons
        surveilleChoixMultiple("boissons");
        // on lance la fonction de surveillance du bouton de fermeture du pop
        surveilleClosePopOption();
        // surveille la modif de quantité
        ajusterQuantite();
        // surveille la validation du menu
        valideArticleOption();
        surveilleEtapePrecedente("menu-sauces", listeSauces, listeBoissons)
    }else if( etape === 'boissons-taille'){
        // option par défaut = petite (3)
        option.taille = 3;
         // creation du pop menu-sauces
         createPopOptionMessage(etape, produit);
         // on lance la fonction de surveillance du bouton de fermeture du pop
         surveilleClosePopOption();
         surveilleAnnulationOption();
         // surveille le choix des sauces
         surveilleChoixTailleBoissons();
         // surveille la modif de quantité
         ajusterQuantite();
         // on surveille la validation de l'article
         valideArticleOption();
    }else if (etape === "quantite"){
        // creation du pop menu-sauces
        createPopOptionMessage(etape, produit);
        // on lance la fonction de surveillance du bouton de fermeture du pop
        surveilleClosePopOption();
        surveilleAnnulationOption();
        // surveille la modif de quantité
        ajusterQuantite();
        // on surveille la validation de l'article
        valideArticle();
    }
}

// fonction de surveillance de la validation de l'article
function valideArticle(){
    // on récupère le bouton de validation
    let ajoutPanier = document.getElementById('ajout-panier')
    // on écoute le clic
    ajoutPanier.addEventListener('click', ()=> {
            idArticlePanier += 1;
            article.articleId = idArticlePanier;
            // on pousse l'article dans le panier
            panier.articles.push(article)
            // on enleve le pop
            togglePopOption();
            // on affiche le panier
            affichePanier();
    })
}

// fonction devalidation d'un menu
function valideArticleOption(){
    // récupération du bouton de validation
    let ajoutPanier = document.getElementById('ajout-panier')
    // ajout d'un event listener
    ajoutPanier.addEventListener('click', () =>{
        if(article.categorie == "menus" && option.boissons == 0) console.log("Vous n'avez pas choisi votre boisson")
        else {
            idArticlePanier += 1;
            article.articleId = idArticlePanier;
            // on pousse les options dans l'article
            article.options.push(option);
            // on pousse l'article dans le panier
            panier.articles.push(article);
            // on enleve le pop
            togglePopOption();
            // on affiche le panier
            affichePanier();
        }
    })
}

// fonction d'initialisation de la variable option
function initOption() {
    option = {
        'taille': 0,
        'frites': "",
        'sauces': 0,
        'boissons': 0,
    }
}

// fonction de surveillance du click sur le bouton etape suivante
// parametre : etapeSuivante = le nom de l'etape recherché dans le process
//             listeSauces = la liste des sauces
//             listeBoissons = la liste des boissons
function surveilleEtapeSuivante(etapeSuivante, listeSauces, listeBoissons) {
    // on récupère le bouton suivant
    let valideOption = document.getElementById('valide-option');
    valideOption.addEventListener('click', () => {
        if((etapeSuivante == 'menu-boissons' && option.sauces == 0)) console.log("Vous n'avez pas choisi votre sauce");
        else processOption(etapeSuivante, null, listeSauces, listeBoissons);
    })
}
// fonction de surveillance du click sur le bouton etape suivante
function surveilleEtapePrecedente(etapePrecedente, listeSauces, listeBoissons) {
    // on récupère le bouton suivant
    let etapePreced = document.getElementById('retour');
    etapePreced.addEventListener('click', () => {
        processOption(etapePrecedente, null, listeSauces, listeBoissons);
    })
}

// fonction de choix de la taille du menu
function surveilleChoixTailleMenu() {
    // on récupère les choix
    let bestOf = document.getElementById('best-of');
    let maxiBestOf = document.getElementById('maxi-best-of');
    // on écoute le click
    bestOf.addEventListener('click', () => {
        option.taille = 1;
        selectOption(bestOf)
    })
    maxiBestOf.addEventListener('click', () =>{
        option.taille = 2;
        selectOption(maxiBestOf)
    })
}

// fonction de surveillance du choix de la taille d'une boisson normal = 30cl, grande = 50cl
function surveilleChoixTailleBoissons(){
    // on récupère les choix
    let normal = document.getElementById('normal');
    let grande = document.getElementById('grande');
    // on écoute le click
    normal.addEventListener('click', () => {
        option.taille = 3;
        selectOption(normal)
    })
    grande.addEventListener('click', () =>{
        option.taille = 4;
        selectOption(grande)
    })
}

// fonction de choix des frites du menu
function surveilleChoixFrites() {
    // on récupère les choix
    let frites = document.getElementById('frites');
    let potatoes = document.getElementById('potatoes');
    // on écoute le click
    frites.addEventListener('click', () => {
        option.frites = 'Frites';
        selectOption(frites)
    })
    potatoes.addEventListener('click', () =>{
        option.frites = 'Potatoes';
        selectOption(potatoes)
    })
}

//fonction de surveillance du choix de la sauce
// parametre : cat : le nom de la catégorie à rechercher
function surveilleChoixMultiple(cat){
    // récupération des choix
    let choices = document.querySelectorAll('.img-pop-option')
    // on boucle sur les choix
    choices.forEach(choice => {
        // on écoute le click sur le choix
        choice.addEventListener('click', () => {
            // on récupère le data optionid
            let optionId = choice.dataset.optionid;
            // on charge le choix dans l'option
            if(cat === 'sauces') option.sauces = optionId;
            else if(cat=== 'boissons') option.boissons = optionId;
            selectOption(choice);
        })

    })
}


// fonction d'application de la classe select à une option et suppression de cette meme classe à celle qui a déjà cette classe
// parametre : choix = la div sur laquelle appliquer la classe select
function selectOption(choix){
    let options = document.querySelectorAll('.img-pop-option');
    options.forEach(option => {
        option.classList.remove('select');
    });
    choix.classList.add('select');
}


// fonction d'initialisation d'un article
// parametre : cat = la catégorie du produit selectionné
//             prodId = l'id du produit selectionné
function initArticle(cat, prodId) {
    article = {
        "articleId": idArticlePanier,
        "categorie": cat,
        "prodId": prodId,
        "quantite": 1,
        "options":[]
    }

}


/* Gestion du panier */

// affichage des numéro de commande
// récupération des zones d'affichage
let numCde = document.getElementById('num-cmd');
let typeConso = document.getElementById('type-conso')
let numConso = document.getElementById('num-conso');

let panier = {
    "commande": 0,
    "nbrConso": 0,
    "consommation": "",
    "articles": [],
    "etat": "",
    "enregistrement": 0
}

// initialisation du panier
// parametre : conso = le type de consommation sélectionné
function initPanier(conso){
    fetch(`http://exam-back.alaugier.mywebecom.ovh/commandes/index.php?controleur=api/creer_cde&consommation=${conso}`)
    .then(response => response.json())
    .then(data => {
        // let nbrCde = genererNum();
        // let nbrConso = genererNumMax(nbrCde);
        panier = {
            "commande": data.numCde,
            "nbrConso": data.numConso,
            "consommation": conso,
            "articles": [],
            "etat": "conception",
            "enregistrement": 0
        }
        afficheNumsPanier();
        togglePopUp();
    })
}

// fonction d'affichage des numéro du panier
function afficheNumsPanier(){
    let conso = ""
    if (panier.consommation == "AE") conso = "A emporter :";
    else if(panier.consommation == "SP") conso = "Sur place :";
    // on récupère les données du panier
    numCde.innerText = `${panier.commande}`;
    numConso.innerText = `${panier.nbrConso}`;
    typeConso.innerText = `${conso}`;
}

// ecoute click sur les bouton de choix consommation

// fonction d'écoute des boutons de choix du type de consommation
function ecouteChoixConso(){
    // récupération des boutons
    let bouttonEmporter = document.getElementById('bouton-emporter');
    let bouttonRestaurant = document.getElementById('bouton-restaurant');
    bouttonEmporter.addEventListener("click", (e)=>{
        initPanier('AE');
    })
    bouttonRestaurant.addEventListener("click", (e)=>{
        initPanier('SP');
    })
}

ecouteChoixConso()

// fonction de génération aléatoire d'un numéro entre 1 et 500
function genererNum() {
    return Math.floor(Math.random() * 500) + 1;
}

// fonction de génération aléatoire d'un numéro entre 1 et un nombre donnée
// parametre : max = le nombre max à prendre en compte pour la génération (le numéro de commande actuelle)
function genererNumMax(max) {
    return Math.floor(Math.random() * max) + 1;
}

// surveillance des bouttons abandon et payer
// récupération des boutons
let payer = document.getElementById('payer')
let abandon = document.getElementById('abandon')
let togglePanier = document.getElementById("togglePanier");


togglePanier.addEventListener('click', ()=>{
    let containDetailCmd = document.getElementById('creation-cmd');
    if(containDetailCmd.classList.contains('panier-affiche')) togglePanier.innerText = "Voir le panier";
    else togglePanier.innerText = "Fermer le panier";
    containDetailCmd.classList.toggle('panier-affiche');
});

// surveillance du click sur le bouton payer
payer.addEventListener("click", (e) =>{
    // affichage du popup finalisation
    if(panier.articles.length > 0){
        createMessagePopUp('finalisation');
        togglePopUp();
    } else console.log("Votre panier est vide")
})

abandon.addEventListener('click', (e) =>{
    // initialisation du panier et affichage du popup accueil
    createMessagePopUp('index');
    togglePopUp();
    ecouteChoixConso();
    resetPanier();
})

// fonction de reset du panier
// avec la base de donné nous devrions mettre un statut abandonné sur le numéro de commande du panier et créer un nouveau panier
function resetPanier() {
    panier = {
        "commande": 0,
        "nbrConso": 0,
        "consommation": "",
        "articles": [],
        "etat": "",
        "enregistrement": 0
    }
}

//fonction de surveillance de la fermeture du pop option
function surveilleClosePopOption(){
    //on récupère le bouton de fermeture
    let closePopOption = document.getElementById('picto-close');
    //on ajoute un événement de click
    closePopOption.addEventListener('click', (e) =>{
        //on ferme le pop
        togglePopOption();
    })
}

//fonction de surveillance de l'annulation d'une option
function surveilleAnnulationOption(){
    //on récupère le bouton d'annulation
    let annuleQte = document.getElementById('annule-qte');
    //on ajoute un événement de click
    annuleQte.addEventListener('click', (e) =>{
        //on ferme le pop
        togglePopOption();
    })
}


// fonction d'ajustement de la quantité
function ajusterQuantite() {
    // récupération des boutons
    let ajoutQte = document.getElementById('ajoute-qte');
    let retireQte = document.getElementById('retire-qte');
    // on surveille le clic sur l'ajout
    ajoutQte.addEventListener('click', (e) => {
        // on ajoute 1 à la quantite
        article.quantite += 1;
        // on appelle la fonction de mise à jour de l'affichage de la qte
        miseAJourAffichageQte(article.quantite);
    });
    // on surveille le clic sur le retrait
    retireQte.addEventListener('click', (e) => {
        // on vérifie si la quantité est supérieur à 1 et on retire 1 à la quantité
        if (article.quantite > 1) article.quantite -= 1;
        // on appelle la fonction de mise à jour de l'affichage de la qte
        miseAJourAffichageQte(article.quantite);
    });
}

// fonction de mise à jour de l'affichage de la qté
// parametre : qte = la quantité à affiché
function miseAJourAffichageQte(qte) {
    // on récupère l'élément de l'affichage de la qté
    let affichageQte = document.getElementById('affichage-qte');
    // on met à jour l'affichage de la qté
    affichageQte.innerText = qte;
}

// fonction de surveillance du bouton de validation de la quantite
function surveilleValideArticle(){
    // on récupère le bouton de validation de la quantité
    let valideQte = document.getElementById('valide-qte');
    // on ajoute un événement de click
    valideQte.addEventListener('click', (e) => {
        // on stocke l'article dans le panier
        panier.articles.push(article);
        // ferme le pop option
        togglePopOption()
        // appelle la fonction d'affichage du panier
        affichePanier();
    });
}

// fonction d'affichage du panier
function affichePanier(){
    
    // on récupère la liste de tout les produits
    //fetch('json/produits.json')
    fetch('http://exam-back.alaugier.mywebecom.ovh/commandes/index.php?controleur=api/retourner_produits_json')
    .then(response => response.json())
    .then(data => {
        // on récupère l'élément de l'affichage du panier
        let detailZone = document.getElementById('detail-cmd');
        // on récupère la zone d'affichage du prix
        let prixZone = document.getElementById('px-cmd');
        // on initialise la liste des articles
        let listeArticles = '';
        // on initialise le prix
        let pxCmd = 0;
        // on boucle sur le panier pour afficher les éléments
        panier.articles.forEach(article => {
            // on cherche l'article dans la liste de tout les produits
            let produit = data[article.categorie].find(p => p.id == article.prodId);
            // on en récupère le prix qu'on ajoute au pxcmd
            pxCmd += article.quantite * produit.prix;
            // on initialise la carte
            let carte = `
                <div class="carte-recap w100">
                    <div class="w100 flex j-between a-center">
                        <h3 class="fs14 fw700">${article.quantite} ${produit.nom}</h3>
                        <div data-idarticle="${article.articleId}" class="picto-trash"><img src="assets/images/trash.png" alt="illustration d'une corbeille"></div>
                    </div>`;
            // si article possède des option, on récupère cette option
            if(article.options[0]){
                let tailleOption = '';
                if (article.options[0].taille == 1) tailleOption = 'Best Of';
                else if (article.options[0].taille == 2) tailleOption = 'Maxi Best Of';
                else if (article.options[0].taille == 3) tailleOption = '30 cl';
                else if (article.options[0].taille == 4) tailleOption = '50 cl';
                carte += `<ul class="ml32">
                    <li>${tailleOption}</li>
                    `;
                if(article.options[0].taille == 2 || article.options[0].taille == 4) pxCmd += article.quantite * 0.5;
                if(article.options[0].frites !== "") carte += `<li>${article.options[0].frites}</li>`;
                if(article.options[0].sauces !== 0){
                    let sauce = data.sauces.find(p => p.id == article.options[0].sauces);
                    carte += `<li>${sauce.nom}</li>`;
                }
                if(article.options[0].boissons !== 0){
                    let boisson = data.boissons.find(p => p.id == article.options[0].boissons);
                    carte += `<li>${boisson.nom}</li>`;
                }
                carte += `</ul>`;
            } 
            carte += `</div>`;
            // on ajoute la carte à la liste
            listeArticles += carte;
        });
        // on affiche la liste dans l'élément détail
        detailZone.innerHTML = listeArticles;
        // on affiche le prix dans sa zone
        prixZone.innerText = `${pxCmd.toFixed(2)} €`;
        supprimerArticlePanier();
    })
}

// fonction suppression d'un article du panier
function supprimerArticlePanier() {
    // on récupère les bouton de suppression
    let boutonsSupp = document.querySelectorAll('.picto-trash');
    // on boucle sur les boutons
    boutonsSupp.forEach(bouton => {
        // on écoute le clic
        bouton.addEventListener('click', () => {
            // on récupère le data-idArticle de l'article
            let idArticle = bouton.dataset.idarticle;
            // on supprime l'article du panier        
            panier.articles = panier.articles.filter(a => a.articleId != idArticle);
        affichePanier();
        });
    });
}

// fonction d'enregistrement de la commande
function enregistrerCommande() {
    event.preventDefault();
    // on récupère les valeur du formulaire
    let code100 = document.getElementById("code100");
    let code10 = document.getElementById("code10");
    let code1 = document.getElementById("code1");
    // on stock le résultat dans le panier
    let code = (parseInt(code100.value, 10) * 100) + (parseInt(code10.value, 10) * 10) + parseInt(code1.value, 10);
    if(code){
        panier.enregistrement = code;
        // on envoit la commande à l'API de préparation
        envoiCommande();
        // affichage du popup remerciements
        createMessagePopUp('remerciements');
    } else console.log("Vous devez saisir un numéro")
}

// fonction d'envoi de la commande à une API
function envoiCommande() {
    console.log("envoi du panier", panier);
    // on envoie la commande à l'API
    fetch('http://exam-back.alaugier.mywebecom.ovh/commandes/index.php?controleur=api/enregistrer_cde', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(panier)
    })
    .then(response => response.json())
    .then(data => console.log(data))
}

