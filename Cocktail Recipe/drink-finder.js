const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const recipes = document.getElementById("recipes")
const resultsP = document.getElementById("results___text")

const getRecipe = (e) => {
  if (e.key !== "Enter" && e.key) {
    return
  }
  let val = searchInput.value.trim()
  if (val) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${val}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.drinks) {
          resultsP.innerHTML = `There are no results for "${val}". <br/> Try another search.`
          resultsP.classList.add("no-results")
          recipes.replaceChildren()
          searchInput.value = ""
          searchInput.focus()
        } else {
          resultsP.innerHTML = `Your results for "${val}"`
          if (resultsP.classList.contains("no-results")) {
            resultsP.classList.remove("no-results")
          }
          let html = ""
          data.drinks.forEach((drink) => {
            let ingredients = []
            let measurements = []
            for (let key in drink) {
              if (`${key}`.startsWith("strIngredient") && drink[key]) {
                ingredients.push(drink[key])
              } else if (`${key}`.startsWith("strMeasure") && drink[key]) {
                measurements.push(drink[key])
              }
            }
            for (let i = 0; i < ingredients.length; i++) {
              ingredients[i] = `<li>${[measurements[i], ingredients[i]].join(
                " "
              )}</li>`
            }
            html += ` <div class="recipe___card-container">
            <div class="recipe___card">
              <div class="recipe___card-front">
                <img src="${drink.strDrinkThumb}" alt="">
                <button class="recipe___button">Get recipe</button>
                <div class="recipe___card-name">     
                <p>${drink.strDrink}</p>
                </div> 
              </div> 
              <div class="recipe___card-back">
                <p>${drink.strDrink}</p>
                <button class="recipe___exit"><i class="fa fa-times"></i></button>
                <p class="underline">Ingredients:</p>
                <ul>
                ${ingredients.join("")}
                </ul>
                </br>
                <p><span class="underline">Instructions</span>: ${
                  drink.strInstructions
                }</p>
              </div>     
            </div>
          </div>`
            recipes.innerHTML = html
          })
        }
      })
  }
}

const showBack = (e) => {
  if (e.target.classList.contains("recipe___button")) {
    e.target.parentElement.parentElement.classList.toggle("rotateY")
  }
}

const showFront = (e) => {
  if (e.target.classList.contains("recipe___exit")) {
    e.target.parentElement.parentElement.classList.toggle("rotateY")
  }
}

searchBtn.addEventListener("click", getRecipe)
searchInput.addEventListener("keyup", getRecipe)
document.addEventListener("click", showBack)
document.addEventListener("click", showFront)
