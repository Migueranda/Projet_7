function addTag(){
    let allLi = document.querySelectorAll('li > a')
    
    allLi.forEach((li) => {
        li.addEventListener('click', function(event){   
            console.log("-- ajout tag")         
            // utilisation d'un tableau d'objets pour les tags
            let tag = {
                text : event.target.textContent, // texte présent dans le tag <li> selectionné
                type : event.target.className.substring(3) // li_ing => ing
            }
            // ajout du tag
            tags.push(tag)
            // affichage des tags
            displayTags()
            // suppression de la valeur saisie dans le champ input & facus
            elInput = document.getElementById(`input_${event.target.className.substring(3)}`).querySelector('input')
            elInput.value='' 
            elInput.focus()
            // stop
            event.stopPropagation();
        })
    })
}

function displayTags(){
    console.log("-- display tag")
    let tagsContent = document.getElementById('tags')
    // on supprime tous les tags présent sur la page
    if(tagsContent.hasChildNodes()){
        while(tagsContent.firstChild) tagsContent.removeChild(tagsContent.firstChild)
    }
    // on ajoute tous les tags présent dans le tableau d'objets de tags
    tags.forEach((tag) =>{
        const cardTag = tagFactory(tag);
        const blockCard = cardTag.getCard();
        tagsContent.appendChild(blockCard);
    })

    // la suppression à enlever tous les event "click" sur les tags anciennement présents
    // il faut donc exécuter de nouveau la fonction closeTag()
    closeTag()
    
    // init pour scénario nominal (affiner recherche avec les tags)
    // ou scénario 2 - directement filtrer à partir des tags
    // console.log(`@@ init déclenché par displayTags : ${searchBar.value}`)
    init(recipes, searchBar.value)  
}

function closeTag(){
    // console.log("@@ Close Tags")
    let closeTags = document.querySelectorAll('div#tags > button > span.close')

    closeTags.forEach((closeTag) => {
        closeTag.addEventListener('click', function(event){
            // récupération du texte du tag via .parentElement.parentElement
            let closedTagText = event.target.parentElement.parentElement.textContent.trim()
            // suppression du tag correspondant à l'élément li cliqué
            tags = tags.filter(function(tag){
                    return tag.text !== closedTagText
            })
            // on affiche de nouveau les tags
            displayTags()
        })
    })
}
