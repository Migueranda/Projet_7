function searchTagIng(ingredients){

    const inputIng = document.querySelector('div#input_ing > input')
    const listeIng = document.querySelector('div#ing_btn_content > ul');
    const btncontentIng = document.getElementById('ing_btn_content');

    function filterTexte(arr, requete){
        return arr.filter(function (el) {
          return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
        })
    }

    // calcul de la taille du conteneur ul en fonction de nombre d'éléments (li)
    function calc_taille_ul_cont(element_html){
        const default_width = 180
        let nbr_column = Math.ceil(element_html.querySelectorAll('ul > li').length / 40) // 2,1 => 3
        let total_width = default_width * nbr_column 
        element_html.querySelector('ul').style.width = total_width + 'px'
    }

    // gestion de la saisie dans le champ input de la liste déroulante "Ingrédients" 
    function handler(event){      
        let filteredIng = filterTexte(ingredients, event.target.value)
        if(listeIng.hasChildNodes()){
            while(listeIng.firstChild) listeIng.removeChild(listeIng.firstChild)
        }    
        filteredIng.forEach((ingredient) =>{
            const ingredientModel = listeFactory(ingredient,'ing')
            const ingCardDOM = ingredientModel.getCard()
            listeIng.appendChild(ingCardDOM);    
        })
        calc_taille_ul_cont(btncontentIng)
       // Utilisation de add tag pour remetre Evenenment sur les nouveau element "li généré"
        addTag()
    }   

    // nous avons besoin de la variable ingrédient
    // pour ne pas la passer en variable globale, 
    // nous avons besoin de pouvoir exécuter la fonction actuelle avec la varibale ingrédients 
    // filtrée par une éventuelle recherche globale
    // donc nous devons gérer la suppression éventuelle des précédents addEventListener positionnés
    // lors de l'exécution de init()

    // suppression addEvent
    inputIng.removeEventListener('input', handler)
    // ajout addEvent
    inputIng.addEventListener('input',handler)
} 
// Appareils
function searchTagApp(appareils){

    const inputApp = document.querySelector('div#input_app > input')
    const listeApp = document.querySelector('div#app_btn_content > ul');
    const btncontentApp = document.getElementById('app_btn_content');

    function filterTexte(arr, requete){
        return arr.filter(function (el) {
          return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
        })
    }

    // calcul de la taille du conteneur ul en fonction de nombre d'éléments (li)
    function calc_taille_ul_cont(element_html){
        const default_width = 180
        let nbr_column = Math.ceil(element_html.querySelectorAll('ul > li').length / 40) // 2,1 => 3
        let total_width = default_width * nbr_column 
        element_html.querySelector('ul').style.width = total_width + 'px'
    }

    // gestion de la saisie dans le champ input de la liste déroulante "Ingrédients" 
    function handler(event){      
        let filteredApp = filterTexte(appareils, event.target.value)
        if(listeApp.hasChildNodes()){
            while(listeApp.firstChild) listeApp.removeChild(listeApp.firstChild)
        }    
        filteredApp.forEach((appareil) =>{
            const appareilModel = listeFactory(appareil,'app')
            const appCardDOM = appareilModel.getCard()
            listeApp.appendChild(appCardDOM);    
        })
        calc_taille_ul_cont(btncontentApp)

       // Utilisation de add tag pour remetre Evenenment sur les nouveau element "li généré"
       addTag()
       
    }   

    // nous avons besoin de la variable Appareils
    // pour ne pas la passer en variable globale, 
    // nous avons besoin de pouvoir exécuter la fonction actuelle avec la varibale Appareils 
    // filtrée par une éventuelle recherche globale
    // donc nous devons gérer la suppression éventuelle des précédents addEventListener positionnés
    // lors de l'exécution de init()

    // suppression addEvent
    inputApp.removeEventListener('input', handler)
    // ajout addEvent
    inputApp.addEventListener('input',handler)
}  
//   ustensils
function searchTagUst(ustensils){

    const inputUst = document.querySelector('div#input_ust > input')
    const listeUst = document.querySelector('div#ust_btn_content > ul');
    const btncontentUst = document.getElementById('ust_btn_content');

    function filterTexte(arr, requete){
        return arr.filter(function (el) {
          return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
        })
    }

    // calcul de la taille du conteneur ul en fonction de nombre d'éléments (li)
    function calc_taille_ul_cont(element_html){
        const default_width = 180
        let nbr_column = Math.ceil(element_html.querySelectorAll('ul > li').length / 40) // 2,1 => 3
        let total_width = default_width * nbr_column 
        element_html.querySelector('ul').style.width = total_width + 'px'
    }

    // gestion de la saisie dans le champ input de la liste déroulante "Ingrédients" 
    function handler(event){      
        let filteredUst = filterTexte(ustensils, event.target.value)
        if(listeUst.hasChildNodes()){
            while(listeUst.firstChild) listeUst.removeChild(listeUst.firstChild)
        }    
        filteredUst.forEach((ustensil) =>{
            const ustensilModel = listeFactory(ustensil,'ust')
            const ustCardDOM = ustensilModel.getCard()
            listeUst.appendChild(ustCardDOM);    
        })
        calc_taille_ul_cont(btncontentUst)

        // Utilisation de add tag pour remetre Evenenment sur les nouveau element "li généré"
        addTag()
       
    }   

    // nous avons besoin de la variable Appareils
    // pour ne pas la passer en variable globale, 
    // nous avons besoin de pouvoir exécuter la fonction actuelle avec la varibale Appareils 
    // filtrée par une éventuelle recherche globale
    // donc nous devons gérer la suppression éventuelle des précédents addEventListener positionnés
    // lors de l'exécution de init()

    // suppression addEvent
    inputUst.removeEventListener('input', handler)
    // ajout addEvent
    inputUst.addEventListener('input',handler)
}  