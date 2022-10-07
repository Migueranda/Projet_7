// function searchBar(){
    const searchBar = document.getElementById('search_bar')

    searchBar.addEventListener('input', function(event){
        if( event.target.value.length < 3){
            init(recipes, ''); 
        }else{
            init(recipes, event.target.value.toLowerCase()); 
        }          
    })
// }
