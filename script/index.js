function filterDuplicate(arr) {
    return arr.filter(function (el, pos) {
    //   return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
        return arr.indexOf(el) == pos
    })
}

function getRecipesOldSchool(recipes, searchBarStr){
    // Construction du tableau des éléments
    let ingredients = []
    let ustensils = []
    let appareils = []

    let recipesFiltered = []
    for(let i = 0; i < recipes.length; i++){
       if(JSON.stringify(recipes[i]).toLowerCase().indexOf(searchBarStr) !== -1){
        recipesFiltered.push(recipes[i])
       } 
    }

    // on écrase recipes avec les bonnes données filtrées
    recipes = recipesFiltered

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
        //construction du tableau des appareils
        appareils.push(recipe.appliance)
    })

    // on doit enlever des listes déroulantes, les ingrédients/ustensil/appareils qui sont présent dans le tableau tags
    // console.log(tags)
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

// function getRecipes(recipes, searchBarStr){ 
//     // Construction du tableau des éléments      
//     let ingredients = []
//     let ustensils = [] 
//     let appareils = []

//     // filtrer recette par titre || description || ingrédients
//     recipes = recipes.filter(function(recipe){
//         return JSON.stringify(recipe).toLowerCase().indexOf(searchBarStr) !== -1 
//     })   

//     // Filtre specifique sur les liste deroulante 
//     tags.forEach((tag) =>{
//         recipes = recipes.filter(function (recipe) {
//             return JSON.stringify(recipe).toLowerCase().indexOf(tag.text.toLowerCase()) !== -1   
//         }) 
//     })

//     // construction des tableaux des listes déroulantes (ingredient / ustensils / appareils)
//     recipes.forEach((recipe) => {
//         // construction du tableau des ingrédients
//         recipe.ingredients.forEach((ingredient) => {        
//             ingredients.push(ingredient.ingredient)        
//         })
//         // construction du tableau des ustensils
//         recipe.ustensils.forEach((ustensil) =>{
//             ustensils.push(ustensil)
//         })
//         // construction du tableau des appareils
//         appareils.push(recipe.appliance)
//     })

//     // on doit enlever des listes déroulantes, les ingrédients/ustensil/appareils qui sont présent dans le tableau tags

//     tags.forEach((tag) => {
//         switch(tag.type){
//             case 'ing':
//                 ingredients = ingredients.filter(function(ingredient){
//                     return ingredient.toLowerCase() != tag.text.toLowerCase()
//                 })
//                 break;
//             case 'ust':
//                 ustensils = ustensils.filter(function(ustensil){
//                     return ustensil.toLowerCase() != tag.text.toLowerCase()
//                 })
//                 break;
//             case 'app':
//                 appareils = appareils.filter(function(appareil){
//                     return appareil.toLowerCase() != tag.text.toLowerCase()
//                 })
//                 break;
//         }
//     })

//     // Utilisation de la fonction filter pour dedoubloner mes tableaux
//     // https://www.delftstack.com/fr/howto/javascript/javascript-remove-duplicates-from-an-array/
//     ingredients = filterDuplicate(ingredients)
//     ustensils = filterDuplicate(ustensils)
//     appareils = filterDuplicate(appareils)

//     return {recipes, ingredients, ustensils, appareils}  
// }

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

// fonction principale
function init(dataSrc, searchBarStr){
    // filtre les données en executant la function getRecipes
    // const {recipes, ingredients, ustensils, appareils} = getRecipes(dataSrc, searchBarStr)
    const {recipes, ingredients, ustensils, appareils} = getRecipesOldSchool(dataSrc, searchBarStr) 
    // affichage des recettes
    displayDataRecipes(recipes) 
    // logique pour afficher les 3 listes déroulantes
    dropDown(ingredients, ustensils, appareils)
    searchTagIng(ingredients)
    searchTagApp(appareils)
    searchTagUst(ustensils)
    addTag()
    // displayTags()
}

//Declaration global de la variable tags
var tags = []

// initialisation du traitement via utilisation de la constante recipes
init(recipes, ''); 
