function filterDuplicate(arr) {
    return arr.filter(function (el, pos) {
        return arr.indexOf(el) == pos
    })
}

function getRecipes(recipes, searchBarStr){ 
    // Construction du tableau des éléments      
    let ingredients = []
    let ustensils = [] 
    let appareils = []

    // filtrer recette par titre || description || ingrédients
    recipes = recipes.filter(function(recipe){
        return JSON.stringify(recipe).toLowerCase().indexOf(searchBarStr) !== -1 
    })   

    // Filtre specifique sur les liste deroulante 
    tags.forEach((tag) =>{
        recipes = recipes.filter(function (recipe) {
            return JSON.stringify(recipe).toLowerCase().indexOf(tag.text.toLowerCase()) !== -1   
        }) 
    })

    // construction des tableaux des listes déroulantes (ingredient / ustensils / appareils)
    recipes.forEach((recipe) => {
        // construction du tableau des ingrédients
        recipe.ingredients.forEach((ingredient) => {        
            ingredients.push(ingredient.ingredient)        
        })
        // construction du tableau des ustensils
        recipe.ustensils.forEach((ustensil) =>{
            ustensils.push(ustensil)
        })
        // construction du tableau des appareils
        appareils.push(recipe.appliance)
    })

    // on doit enlever des listes déroulantes, les ingrédients/ustensil/appareils qui sont présent dans le tableau tags

    tags.forEach((tag) => {
        switch(tag.type){
            case 'ing':
                ingredients = ingredients.filter(function(ingredient){
                    return ingredient.toLowerCase() != tag.text.toLowerCase()
                })
                break;
            case 'ust':
                ustensils = ustensils.filter(function(ustensil){
                    return ustensil.toLowerCase() != tag.text.toLowerCase()
                })
                break;
            case 'app':
                appareils = appareils.filter(function(appareil){
                    return appareil.toLowerCase() != tag.text.toLowerCase()
                })
                break;
        }
    })

    // Utilisation de la fonction filter pour dedoubloner mes tableaux
    // https://www.delftstack.com/fr/howto/javascript/javascript-remove-duplicates-from-an-array/
    ingredients = filterDuplicate(ingredients)
    ustensils = filterDuplicate(ustensils)
    appareils = filterDuplicate(appareils)

    return {recipes, ingredients, ustensils, appareils}  
}

function displayDataRecipes(recipes){
    
    const cardSection = document.getElementById("container");
    if(cardSection.hasChildNodes()){
        while(cardSection.firstChild) cardSection.removeChild(cardSection.firstChild)
    } 
    recipes.forEach((recipe) => {
        const cardRecipe = recipeFactory(recipe);
        const blockCard = cardRecipe.getCard();
        cardSection.appendChild(blockCard);
    });
}

function displayMessageErr(recipes){
    if (recipes.length == 0){
        const cardSection = document.getElementById("container"); // toujours vide car displayDataRecipes est exécuté avant et nettoie tous les éléments
    
        const elDiv = document.createElement('div'); 
        elDiv.className = 'message-err'
        let html = `<div>«Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc.
        </div>`
        elDiv.innerHTML = html;
        cardSection.appendChild(elDiv)
        }
}

// fonction principale
function init(dataSrc, searchBarStr){
    // filtre les données en executant la function getRecipes
    const {recipes, ingredients, ustensils, appareils} = getRecipes(dataSrc, searchBarStr)  
    // affichage des recettes
    displayDataRecipes(recipes) 
    // logique pour afficher les 3 listes déroulantes
    dropDown(ingredients, ustensils, appareils)
   // gestion de la saisie dans le champ input et la gestion du filtre surl'affichage des liste deroulants
    searchTagIng(ingredients)
    searchTagApp(appareils)
    searchTagUst(ustensils)
    //gestion de l'ajout d'un tag par evenement 
    addTag()
    // affichage suggestion si aucune recette après filtre
    displayMessageErr(recipes)
}

//Declaration global de la variable tags
var tags = []

// initialisation du traitement via utilisation de la constante recipes
init(recipes, ''); 
