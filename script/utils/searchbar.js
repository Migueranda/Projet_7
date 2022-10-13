// gestion de la saisi de la barre de recherche principale
    const searchBar = document.getElementById('search_bar')

    searchBar.addEventListener('input', function(event){
        if( event.target.value.length < 3){
            init(recipes, ''); 
        }else{
            init(recipes, event.target.value.toLowerCase()); 
        }          
    })

