function recipeFactory(data){
    const { id, name, servings, ingredients, time, description, appliance, ustensils} = data;
    const imgCard = `image/imgcard.png`;
    const imgTime = `image/time.png`;  
    // génération des ingrédients
    let html_ingredient = ''
    ingredients.forEach((ingredient) => {
      // Verification si l'objet ingredient possède la proprieté quantity et la proprieté unit
        if (ingredient.hasOwnProperty('quantity') && ingredient.hasOwnProperty('unit')){
         
          html_ingredient += `<p class="mb-0  row col-12"><span class="font-weight-bold">${ingredient.ingredient}</span> : ${ingredient.quantity} ${ingredient.unit}</p>`
          //sino possède t-il uniquement la proprité quantity?
        } else if (ingredient.hasOwnProperty('quantity')){
       
          html_ingredient += `<p class="mb-0 row col-12"><span class="font-weight-bold">${ingredient.ingredient}</span> : ${ingredient.quantity}</p>`
          //l'obejt ne possède ni quantity ni unit 
        } else {
         
          html_ingredient += `<p class="mb-0 font-weight-bold row col-12">${ingredient.ingredient}</p>` 
        }
    })

    function getCard(){
        const article = document.createElement('article'); 
        article.className = 'card col-12 col-md-6 col-lg-4 mb-4'
        let html = `<img class="card-img-top" src="${imgCard}" alt="Card image cap ">
                    <div class="card-body btn-platinum rounded-bottom">
                        <div class="d-flex justify-content-between" class="col-12">
                            <h5 class="card-title">${name}</h5>
                            <div><img src="${imgTime}"> ${time} min</div>
                         </div> 
                         <div class="d-flex justify-content-between" class="col-12">
                         <div class="col-6">
                          <div class="text row">          
                            ${html_ingredient}
                          </div>   
                         </div>
                         <div class="col-6 row descrip_recip">
                           <p class="text_desc mb-1">
                             ${description}
                           </p>    
                         </div>
                       </div>           
                    </div>
                    `
        article.innerHTML = html;
        return(article);
    }
return { getCard }
}

