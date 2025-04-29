const apiKey = "2c2eadf7c2524888911cb61ded451e87";
let ingredients = [];

function addIngredient() {
  const input = document.getElementById('ingredientInput');
  const value = input.value.trim();
  if (value && !ingredients.includes(value)) {
    ingredients.push(value);
    updateIngredientList();
    input.value = '';
  }
}

function removeIngredient(name) {
  ingredients = ingredients.filter(i => i !== name);
  updateIngredientList();
}

function updateIngredientList() {
  const list = document.getElementById('ingredientList');
  list.innerHTML = '';
  ingredients.forEach(item => {
    list.innerHTML += `<span>${item} <button onclick="removeIngredient('${item}')">✖</button></span>`;
  });
}

function searchRecipes() {
  const diet = document.getElementById('dietSelect').value;
  const cuisine = document.getElementById('cuisineSelect').value;
  const query = ingredients.join(',+');
  const url = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${query}&number=10&apiKey=${apiKey}&diet=${diet}&cuisine=${cuisine}`;
  
  fetch(url)
    .then(res => res.json())
    .then(data => showRecipes(data.results))
    .catch(err => alert("Error fetching recipes."));
}

function showRecipes(recipes) {
  const container = document.getElementById('recipes');
  container.innerHTML = '';
  recipes.forEach(r => {
    container.innerHTML += `
      <div class="recipe-card">
        <img src="${r.image}" alt="${r.title}">
        <h3>${r.title}</h3>
        <p>⏱ ${r.readyInMinutes} mins</p>
        <p>🍽 ${r.servings} servings</p>
        <a href="${r.sourceUrl}" target="_blank">View Recipe</a><br>
        <button onclick='saveRecipe(${JSON.stringify(r)})'>💾 Save</button>
      </div>`;
  });
}

function saveRecipe(recipe) {
  const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
  saved.push(recipe);
  localStorage.setItem('savedRecipes', JSON.stringify(saved));
  alert('Recipe saved!');
  showSavedRecipes();
}

function showSavedRecipes() {
  const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
  const container = document.getElementById('savedRecipes');
  container.innerHTML = '';
  saved.forEach(r => {
    container.innerHTML += `
      <div class="recipe-card">
        <img src="${r.image}" alt="${r.title}">
        <h3>${r.title}</h3>
        <a href="${r.sourceUrl}" target="_blank">View Recipe</a><br>
      </div>`;
  });
}

function showSection(section) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById(section).style.display = 'block';
}


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}


    

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('savedRecipes')) {
    showSavedRecipes();
  }
  showSection('recipe'); // Show the recipe section by default
});
