/* Gestion du pop-up */

// récupération de la div pop-up
let popUp = document.getElementById('pop-up');

// fonction d'ouverture et fermeture du pop-up
function togglePopUp() {
    // si le pop-up est visible, on le cache, sinon on l'affiche
    popUp.classList.toggle('d-none');
}
    
// fonction de création du message du pop-up
// parametre : type = le type de message à retourner
// retour : un element html
function createMessagePopUp(type) {
    // création de la bannière
    message = `<!-- bannière -->
            <div id="banniere" class="w100"><img src="assets/images/mc_landing_banner.png" alt="Bannière Wacdo avec logo et burger géant"></div>`
    // on ajoute le message en fonction du type de pop-up demandé en utilisant switch
    switch (type) {
        case 'index':
            message += `
                <!-- accueil -->
                <div id="accueil" class="flex p32 round16 gap64 large-5 medium-10 small-10 back-one shadow">
                    <p class="fw700 fs42">Bonjour,</p>
                    <p class="fw700 fs26">Souhaitez-vous consommer votre menu sur place ou préférez-vous l'emporter ?</p>
                    <!-- choix sur place / à emporter -->
                    <div id="contain-choix-sp-ae" class="flex j-between w100 gap32">
                        <div id="bouton-restaurant" class="choix-sp-ae flex j-center a-center round8 large-5 gap8 back-one">
                            <div class="w100 flex j-center"><img src="assets/images/illustration-sur-place.png" alt="Table avec deux chaises"></div>
                            <p class="fw700 fs26">Sur Place</p>
                        </div>
                        <div id="bouton-emporter" class="choix-sp-ae flex j-center a-center round8 large-5 gap8 back-one">
                            <div class="w100 flex j-center"><img src="assets/images/illustration-a-emporter.png" alt="Sachet papier à emporter Wacdo"></div>
                            <p class="fw700 fs26">A Emporter</p>
                        </div>
                    </div>
                </div>`;
            break;
        case 'finalisation':
            message += `
                <!-- finalisation -->
                <div id='contain-finalisation' class="flex j-center a-center pos-rel">
                    <!-- message finalisation -->
                    <div id="finalisation" class="w100 flex p32 round16 gap64 large-5 medium-8 small-10 back-one shadow">
                        <div class="w100 img-finish flex j-center"><img class="large-12 medium-10 small-12 round16" src="assets/images/illustration_chevalet.png" alt="Chevalet numéroté Wacdo posé sur une table"></div>
                        <p class="fw700 fs42">Pour être servis à table</p>
                        <p class="fw700 fs26">Récupérez un chevalet et indiquez ici le numéro inscrit dessus</p>     
                        <form class="flex j-center gap64" action="" method="post" onsubmit="enregistrerCommande()">
                            <div class="flex j-center gap16">
                                <input class="souligne fs96 fw700 b-none txt-center" type="number" name="code100" id="code100" placeholder="0" min="0" max="9" oninput="this.value = this.value.slice(0, 1);">
                                <input class="souligne fs96 fw700 b-none txt-center" type="number" name="code10" id="code10" placeholder="0" min="0" max="9" oninput="this.value = this.value.slice(0, 1);">
                                <input class="souligne fs96 fw700 b-none txt-center" type="number" name="code1" id="code1" placeholder="0" min="0" max="9" oninput="this.value = this.value.slice(0, 1);">
                            </div>
                            <div class="w100 flex j-center a-center">
                                <input class="button black back-yellow round8 b-none fs18 fw700" type="submit" value="Enregister le numéro">
                            </div>
                        </form>    
                    </div>
                </div>`;
            break;
        case 'remerciements':
            message += `
                <!-- remerciements -->
                <div id="remerciements" class="pos-rel flex p32 round16 gap64 large-5 medium-10 small-10 back-one shadow">
                    <p class="fw700 fs42">Toute l'équipe vous remercie,</p>
                    <p class="fw700 fs26">Et vous souhaite un bon appétit dans nos restaurants,</p>
                    <p class="fw700 fs48">A bientôt !</p>            
                </div>
                <div class="w100 flex j-center a-center contain-new-cmd">
                    <a href="index.html"><button id="new-cmd" class="button black back-yellow round8 b-none fs18 fw700">Nouvelle commande</button></a>
                </div>`;
            break;
        default :
        message += ``
    }
    // on ajoute le message à la pop-up
    popUp.innerHTML = message;
}


/* Gestion du pop-option */

// récupération de la div pop-option
let popOption = document.getElementById('pop-option');

// fonction d'ouverture et fermeture du pop-up
function togglePopOption() {
    // si le pop-up est visible, on le cache, sinon on l'affiche
    popOption.classList.toggle('d-none');
}
    
// fonction de création du message du pop-option
// parametres : type = type de popoption demandé
//              article = l'article cliqué
//              listeProduit = liste des produit selectionnable en option
// retour : un element html
function createPopOptionMessage(type, article = null, listeProduit = null) {
    // initialisation des variables
    let cibleRetour = '';
    let h3 = '';
    let p = '';
    let zoneImg = '';
    // récupération des produits
    if (type == 'menu-taille'){
        // si pop demandé est menu-taille
        h3 = 'Une grosse faim ?';
        p = 'Le menu maxi Best Of comprend un sandwich, une grande frite et une boisson 50 Cl pour 0,50€ suplémentaires';
        zoneImg = `<div id="maxi-best-of" class="img-pop-option select choix-grand round8 flex j-center a-center"><img src="assets/images/illustration-maxi-best-of.png" alt="illustration d'un menu Maxi Best Of"><p class="w100 fs26 fw700 txt-center">Menu Maxi Best Of</p></div>
        <div id="best-of" class="img-pop-option choix-normal round8 flex j-center a-center"><img src="assets/images/illustration-best-of.png" alt="illustration d'un menu Best Of"><p class="w100 fs26 fw700 txt-center">Menu Best Of</p></div>`;
    }else if (type == 'menu-frites'){
        // si pop demandé est menu-frites
        cibleRetour = `menu-taille`;
        h3 = 'Choisissez votre accompagnement';
        p = 'Frites, potatoes, la pomme de terre dans tous ses états';
        zoneImg = `<div id="frites" class="img-pop-option select round8 flex j-center a-center"><img src="assets/frites/MOYENNE_FRITE.png" alt="illustration de frites"><p class="w100 fs26 fw700 txt-center">Frites</p></div>
        <div id="potatoes" class="img-pop-option round8 flex j-center a-center"><img src="assets/frites/GRANDE_POTATOES.png" alt="illustration de potatoes"><p class="w100 fs26 fw700 txt-center">Potatoes</p></div>`;
    }else if (type == 'menu-sauces'){
        // si pop demandé est menu-sauces
        cibleRetour = `menu-frites`;
        h3 = 'Choisissez votre sauce';
        p = 'Ajoutez la touche finale avec votre sauce préférée';
        categorie = 'sauces';
    }else if (type == 'menu-boissons'){
        // si pop demandé est menu-boissons
        cibleRetour = `menu-sauces`;
        h3 = 'Choisissez votre boisson';
        p = 'Un soda , un jus de fruit ou un verre d’eau pour accompagner votre repas';
        categorie = 'boissons';
    }else if (type == 'boissons-taille'){
        // si pop demandé est boissons-taille
        h3 = 'Une petite soif ?';
        p = 'Choisissez la taille de votre boisson, +0.50€ pour le format 50 Cl';
        categorie = 'sauces';
        zoneImg = `<div id="normal" class="img-pop-option select choix-normal round8 flex j-center a-center"><img src="assets/${article.image}" alt="illustration d'une petite boison"><p class="w100 fs26 fw700 txt-center">30 cl</p></div>
        <div id="grande" class="img-pop-option choix-grand round8 flex j-center a-center"><img src="assets/${article.image}" alt="illustration d'une grande boisson"><p class="w100 fs26 fw700 txt-center">50 cl</p></div>`;
    }else if (type == 'quantite'){
        // si pop demandé est quantite
        h3 = 'Ajustez la quantité souhaitée';
        p = 'Combien en voulez-vous ?';
        zoneImg = `<div class="img-pop-option select round8 flex j-center a-center"><img src="assets/${article.image}" alt="illustration de ${article.nom}"></div>`;
    }
    // si menu-sauces, menu-boissons ou sauces, on construit la liste des produits selectionnables
    if (type === 'menu-sauces' || type === 'menu-boissons'){
        listeProduit.forEach(produit => {
            zoneImg += `<div data-cat="${categorie}" data-optionid="${produit.id}" class="img-pop-option round8 flex j-center a-center"><img src="assets/${produit.image}" alt="illustration de ${produit.nom}"><p class="w100 fs20 fw400 txt-center">${produit.nom}</p></div>`;
        });
    }
    // initialisation de la div msg du popoption
    let message = `<div id="quantite" class="round16 back-one large-8 flex j-center gap64">`;
    // si menu-sauces, menu-boissons ou sauces, on ajoute un bouton retour en haut à gauche
    if (type === 'menu-frites' || type === 'menu-sauces' || type === 'menu-boissons'){
        message += `<button id="retour" data-cible="${cibleRetour}" class="button round8 fs16 fw400 back-one">Retour</button>`;
    }
    // ajout d'un bouton close en haut a droite, du texte et de la la zone d'affichage des images
    message += `<div id="picto-close" class="picto"><img src="assets/images/supprimer.png" alt="pictogramme de suppression"></div>
        <div class="w100 flex j-center">
            <div>
                <h3 class="fs26 fw700">${h3}</h3>
                <p class="fs18 fw700 mt16">${p}</p>
            </div>
        </div>    
        <div id="overflow-img-pop" class="large-8 flex j-center">
            <div id="contain-img-pop-option" class="w100 ${ type === "menu-sauces" || type === "menu-boissons" ? "" : "j-center"} a-center gap32">${zoneImg}</div>
        </div>`;
    // si quantite ou sauces ou boissons, ajout des boutons d'ajustement de la quantite
    if (type === 'quantite' || type === 'boissons-taille' || type === 'menu-boissons'){
        message += `
            <div class="w100 flex j-center a-center">
                <div id="ajuste-qte" class="flex j-between a-center">
                    <button id="retire-qte" class="flex j-center a-center button back-yellow fs40 fw700 round8 b-none">-</button>
                    <p id="affichage-qte" class="fs40 fw700">1</p>
                    <button id="ajoute-qte" class="flex j-center a-center button back-yellow fs40 fw700 round8 b-none">+</button>
                </div>
            </div>`;
    }
    // ajout des boutons d'annulation ou d'ajout au panier
    if (type === 'menu-taille' || type === 'menu-frites' || type === 'menu-sauces'){
        message += `<div class="w100 flex j-center a-center">
                <button id="valide-option" class="button back-yellow fs18 fw700 round8 b-none">Etape suivante</button>
            </div>
        </div>`;
    }else if ( type === 'menu-boissons'){
        message += `<div class="w100 flex j-center a-center">
                <button id="ajout-panier" class="button back-yellow fs18 fw700 round8 b-none">Ajouter le menu à ma commande</button>
            </div>
        </div>`;
    }else {
        message += `<div id="action-option" class="w100 flex j-center a-center">
                            <button id="annule-qte" class="button fs18 fw700 round8 mr48 back-one">Annuler</button>
                            <button id="ajout-panier" class="button back-yellow fs18 fw700 round8 b-none">Ajouter à ma commande</button>
                        </div>
                    </div>`;
    }
    // on ajoute le message à la pop-up
    popOption.innerHTML = message;
}
