// https://www.themealdb.com/api/json/v1/1/filter.php?i={searchTerm}
// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}

let searchInput = document.querySelector('.search-input');
let searchBtn = document.getElementById('search-btn');
let  results = document.querySelector('.results-container');
let recipeDetails = document.querySelector('.recipe-details')


let recipes = [];
searchBtn.addEventListener('click', getRecipes)
function getRecipes() {
    let searchRecipe = searchInput.value.trim()
    if(searchRecipe) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchRecipe}`) 
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data => {
            recipes = data.meals;
            renderRecipes(recipes)
            searchInput.value = '';
        })
        .catch(err => console.log(err))
    } else {
        alert('Please Enter Your Recipe..')
    }
}

function renderRecipes(recipes) {
    results.innerHTML = '';
    if(recipes == null) {
        searchInput.value = '';
        document.querySelector('.noData').style.display = 'block'
    }
    else {
        document.querySelector('.noData').style.display = 'none'
    }
    recipes.forEach(recipe => {
        results.innerHTML += `
            <div class="card">
                <div class="card-img">
                    <img src="${recipe.strMealThumb}" alt="">
                </div>
                <div class="card-info">
                    <h2>${recipe.strMeal}</h2>
                    <a href="#" onclick="getDetails(${recipe.idMeal})">Get Recipe</a>
                </div>
            </div>
        `
    })
}


function getDetails(id) {
    recipeDetails.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`) 
    .then(response => {
       return response.json();
    })
    .then(data => {
        recipeDetails.classList.remove('showDetails')
        let item = data.meals[0]
        recipeDetails.innerHTML = `
            <i onclick="hideRecipeDetails()" class="fas fa-times"></i>
            <h2>${item.strMeal}</h2>
            <p>Instructions:</p>
            <p>${item.strInstructions}</p>
            <a href="${item.strYoutube}">Watch Video</a>
        `
    })
     .catch(err => console.log(err))
}
function hideRecipeDetails() {
    recipeDetails.classList.add('showDetails')
}
