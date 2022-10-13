function dropDown(ingredients, appareils, ustensils){
    // récupération de tous les boutons
    let btnsDrop = document.querySelectorAll('.button_drop');
    // récupération de tous les chevrons pour cacher le content
    let btnsDropHide = document.querySelectorAll('.fa-chevron-up');
  
    // affichage du contenu des Listes déroulantes
    btnsDrop.forEach((btnDrop) => {
      btnDrop.addEventListener('click', function(event){
        // en premier on ferme toutes les listes déroulantes potentiellement ouvertes
        closeAllTagList()
        // récupération de l'id du bouton
        let btnId = event.currentTarget.id
        // construction de l'id du content
        let btnContentId = btnId + "_content"
        // on cache le bouton
        event.currentTarget.classList.add('d-none')
        // get html content
        const el_btnContent = document.getElementById(btnContentId)
        // calcul de la taille
        calc_taille_ul_cont(el_btnContent)
        // on affiche le content 
        el_btnContent.classList.remove('d-none')
        // Gestion du focus sur l'input
        el_btnContent.querySelector('input').focus()
        // event.stopPropagation();// Pour eviter que l'evenement soit écouté par l'event sur le document.body 
        event.stopPropagation();
      })

    })       

    // on cache le contenu des lites déroulantes
    btnsDropHide.forEach((btnDropHide) => {
      btnDropHide.addEventListener('click', function(event){
        // récupération de l'id du bouton hide
        let btnIdHide = event.currentTarget.id
        // construction de l'id du bouton Drop
        let btnId = btnIdHide.replace('_content_hide', '') // ust_btn_content_hide => ust_btn
        // construction de l'id du content
        let btnContentId = btnId + "_content"
        // on affiche le bouton
        document.getElementById(btnId).classList.remove('d-none')
        // on cache le content 
        document.getElementById(btnContentId).classList.add('d-none')
        // suppression de texte saisi dans champ input
        document.getElementById(btnIdHide).parentElement.querySelector('input').value = ''
        // event.stopPropagation();// Pour eviter que l'evenement soit écouté par l'event sur le document.body 
        event.stopPropagation();     
      })
    })

    //fermeture de dropdown au click sur la page
    document.body.addEventListener('click', function(event){
      btnsDropHide.forEach((btnsDropHide) =>{
        btnsDropHide.click()
      })
    })   

    // fermeture de toutes les listes déroulantes (Tags listes)
    function closeAllTagList(){
      
      btnsDropHide.forEach((btnsDropHide) =>{
        btnsDropHide.click()
      })         
    }     
    // calcul de la taille du conteneur ul en fonction de nombre d'éléments (li)
    function calc_taille_ul_cont(element_html){
        const default_width = 180
        let nbr_column = Math.ceil(element_html.querySelectorAll('ul > li').length / 40) // 2,1 => 3
        let total_width = default_width * nbr_column 
        element_html.querySelector('ul').style.width = total_width + 'px'
    }

    // Generation des elements de la liste des ingrédients
    const listeIng = document.querySelector('div#ing_btn_content > ul');

    if(listeIng.hasChildNodes()){
        while(listeIng.firstChild) listeIng.removeChild(listeIng.firstChild)
    }

    ingredients.forEach((ingredient) =>{
        const ingredientModel = listeFactory(ingredient, 'ing')
        const ingCardDOM = ingredientModel.getCard()
        listeIng.appendChild(ingCardDOM);    
    })

    // Generation des elements de la liste des appareils
    const listeApp = document.querySelector('div#app_btn_content > ul');

    if(listeApp.hasChildNodes()){
        while(listeApp.firstChild) listeApp.removeChild(listeApp.firstChild)
    }

    appareils.forEach((appareil) =>{
        const appareilModel = listeFactory(appareil, 'app')
        const appCardDOM = appareilModel.getCard()
        listeApp.appendChild(appCardDOM);    
    })

    // Generation des elements de la liste des Ustensiles
    const listeUst = document.querySelector('div#ust_btn_content > ul');

    if(listeUst.hasChildNodes()){
        while(listeUst.firstChild) listeUst.removeChild(listeUst.firstChild)
    }

    ustensils.forEach((ustensil) =>{
        const ustensilModel = listeFactory(ustensil, 'ust')
        const ustCardDOM = ustensilModel.getCard()
        listeUst.appendChild(ustCardDOM);    
    })

}

