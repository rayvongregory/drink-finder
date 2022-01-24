const searchBtn = document.getElementById("banner___search-btn");
const searchInput = document.getElementById("banner___search-input");
const recipes = document.getElementById("recipes");
const resultsH2 = document.getElementById("results___text-h2");
const resultsP = document.getElementById("results___text-p");

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
          resultsH2.innerHTML = "Sorry, there are no results.";
          resultsH2.style.margin = "1em auto 0";
          resultsP.innerHTML = "Try another search!";
          recipes.innerHTML = "";
          searchInput.value = "";
        } else {
          resultsH2.innerHTML = "Your results";
          resultsH2.style.margin = "1em auto";
          resultsP.innerHTML = "";
          let html = "";
          data.drinks.forEach((drink) => {
            let ingredients = [];
            let measurements = [];
            for (let key in drink) {
              if (`${key}`.startsWith("strIngredient") && drink[key]) {
                ingredients.push(drink[key]);
              } else if (`${key}`.startsWith("strMeasure") && drink[key]) {
                measurements.push(drink[key]);
              }
            }
            for (let i = 0; i < ingredients.length; i++) {
              ingredients[i] = `<li>${[measurements[i], ingredients[i]].join(
                " "
              )}</li>`;
            }

            html += ` <div class="recipe___card-container">
            <div class="recipe___card">
              <div class="recipe___card-front">
                <img src="${drink.strDrinkThumb}" alt="">
                <div class="recipe___button">
                  <button>Get recipe</button>
                </div>
                <div class="recipe___card-name">     
                <h2>${drink.strDrink}</h2>
                </div> 
              </div> 
              <div class="recipe___card-back">
                <h2>${drink.strDrink}</h2>
                <button class="recipe___exit">X</button>
                <p class="underline">Ingredients:</p>
                <ul>
                ${ingredients.join("")}
                </ul>
                </br>
                <p class="paddingBottom"><span class="underline">Instructions</span>: ${
                  drink.strInstructions
                }</p>
            
              </div>     
            </div>
          </div>`;
            recipes.innerHTML = html;
          });
        }
      });
  }
};

const showBack = (e) => {
  if (e.target.parentElement.classList[0] === "recipe___button") {
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      "rotateY"
    );
  }
};

const showFront = (e) => {
  if (e.target.classList[0] === "recipe___exit") {
    e.target.parentElement.parentElement.classList.toggle("rotateY");
  }
};

document.addEventListener("click", getRecipe);
document.addEventListener("keypress", getRecipe);
document.addEventListener("click", showBack);
document.addEventListener("click", showFront);
