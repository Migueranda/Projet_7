function listeFactory(data, type){
    let classLi = ''    
    switch (type) {
    case 'ing': 
        classLi = 'li_ing'
        break;
    case 'ust':
        classLi = 'li_ust'
        break;
    case 'app':
        classLi = 'li_app'
        break;
    }

    function getCard(){
        const listeLi = document.createElement('li'); 
        listeLi.className = 'list-group-item border-0';
        listeLi.innerHTML = `<a href="#" class="${classLi}">${data}</a>`

        return(listeLi);
    }
    
return { getCard }
}

