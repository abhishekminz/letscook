import axios from "axios";
import config from "../../config";

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async fetchRecipeDetails() {        
        try {
            const recipeDetails = await axios.get(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${config.apiKey}`);
    
            this.title = recipeDetails.data.title;
            this.readyInTime = recipeDetails.data.readyInMinutes;
            this.servings = recipeDetails.data.servings;
            this.author = recipeDetails.data.sourceName;
            this.moreInfo = recipeDetails.data.sourceUrl;
            this.recipeIngredients = recipeDetails.data.extendedIngredients;
        } catch (e) {
            alert("Something went wrong!!");
        }
        
        console.log("From the recipe data model", this);
    }

    parseIngredients() {
        const newIngredient = this.recipeIngredients.map(ing => {
            return {
                id: ing.id,
                amount: ing.amount,
                unit: ing.unit.toLowerCase(),
                originalName: ing.originalName
            };
        })
        this.recipeIngredients = newIngredient;
    }
}