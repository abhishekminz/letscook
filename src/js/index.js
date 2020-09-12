// Global app controller
// fcefbde4301847ec92ee846923b470f0
// https://api.spoonacular.com/recipes/search

import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import { elements } from './views/elements';
import { renderLoader, clearLoader } from './views/base';
import { imageFormat } from './views/utilites';

// GLOBAL STATE OF THE APP
const state = {};

const controlSearch = async e => {
    e.preventDefault();
    // Get the query from the UI
    const query = searchView.getQuery().trim();

    // Clear the input field after reading the values
    searchView.clearInputField();
    
    searchView.clearSearchList();
    // If there is a query then go further
    if(query) {
        
        // Change the state of the app as per the query and its state
        const search = state.search = new Search(query);
        
        // Request for the resources
        renderLoader(elements.searchResult);
    
        await search.getResults();
        clearLoader();
        
        // Create search list and add it to the UI    
        searchView.createSearchList(state.search.results);
        
        console.log('STATE', state);

        if(!state.search.results.length) return alert('Requested recipe not found. Try something else! :)');          
    }
};

const controlRecipe = async e => {
    // Clear the recipe section. Start off with blank.
    recipeView.clearRecipeSection();

    // Get the id from the hash
    const requestedRecipeId = parseInt(e.target.location.hash.replace('#', ''));
    
    const storage = localStorage.getItem('likes');
    let status = false;
    
    if(storage !== null) {
        const likes = JSON.parse(storage);
        status = likes.findIndex(el => el.id === requestedRecipeId) !== -1; 
    }
    // Create a new recipe object
    try {
        if(requestedRecipeId) {
            const recipe = state.recipe = new Recipe(requestedRecipeId);
    
            await recipe.fetchRecipeDetails();
            recipe.imageUrl = `https://spoonacular.com/recipeImages/${recipe.id}-size.jpg" alt="${recipe.title}" class="recipe__img"`
            recipe.parseIngredients();
            recipeView.renderRecipe(recipe, status);    
        }
        
    } catch (e) {
        alert('Something is not working. Try again after some time. :)')
    }
    
    // Fetch the recipe details

    // Inorder to view Recipe Image on top we need the imageType 
    // 1. Find the element in array to get to the image property of that object
    // const clickedRecipe = state.search.results.find(recipe => recipe.id === requestedRecipeId);
    
    // 2. Get the image format
    // const imageType = imageFormat(clickedRecipe.image);
    
    // 3. Call the renderRecipe method with the received recipe from AJAX and the imageType
    // 556x370
};

const controlList = () => {
    console.log("we are in the controlList");
    if(!state.list) state.list = new List();
    
    state.list.addToList(state.recipe.recipeIngredients);

};

const likeSection = () => {
    likesView.clearLikes();
    likesView.renderLikes(state.like.likes);
};

const controlLike = () => {
    if(!state.like) state.like = new Likes();
    console.log("we are in the controlLike", state);

    if(!state.like.isLiked(state.recipe.id)) {
        state.like.addLikes(state.recipe);    
        state.like.persistLikes();
        
        recipeView.clearRecipeSection();
        recipeView.renderRecipe(state.recipe, true);
    } else {        
        state.like.deleteLike(state.recipe.id);
        state.like.persistLikes();

        recipeView.clearRecipeSection();
        recipeView.renderRecipe(state.recipe);
    }
    likesView.toggleLikeBtn(state.like.likes.length);
    likeSection();
};

const controlRecipeSectionClick = e => {
    
    // Recipe button is clicked
    // 1. Add all the ingredient enlisted in the view to the Ingredient list View
    // 2. With whatever the serving the user has selected using plus or minus controller
    if(e.target.matches('.recipe__btn, .recipe__btn *')) controlList();
    
    // Increment or Decrement button is clicked
    // 1. As per the click increase or decrease the number of serving but serving should not get to zero
    // 2. As per the number in servings the amount of the ingredient should increase or decrease    
    // if(e.target.closest('.btn-tiny svg use')) console.log("Plus or minus is clicked");

    // Liked button is clicked
    // 1. Add the recipe to the liked list
    // 2. When adding it to the list the serving should be the default one not the modified one.
    if(e.target.matches('.recipe__love, .recipe__love *')) controlLike();

    // console.log(state);
};

const initialSetup = () => {
    const stringyFiedLikes = localStorage.getItem('likes');
    console.log(stringyFiedLikes);
    if(!stringyFiedLikes) likesView.toggleLikeBtn(0);
    
    if(stringyFiedLikes) {
        const likes = JSON.parse(stringyFiedLikes);
        if(!likes.length) return likesView.toggleLikeBtn(likes.length);
        state.like = new Likes();
        state.like.likes = [...likes];
        likesView.toggleLikeBtn(state.like.likes.length);
        likeSection();
    }

    console.log("From the initial setup", state);
};

const setupEventListeners = () => {

    elements.searchForm.addEventListener('submit', controlSearch);
    ['hashchange', 'load'].forEach(el => { window.addEventListener(el, controlRecipe) });
    elements.recipeInfo.addEventListener('click', controlRecipeSectionClick);
    window.addEventListener('load', initialSetup);
};
 
const init = () => {
    setupEventListeners();
};

init();

// getResults("pasta");

// When do we want to hit the API endpoint ?
// Only when there is a submit

// What will happen after submition of the form?
// Read the input for query
// If it has a value and it is not empty, only then the later things will happen otherwise not.