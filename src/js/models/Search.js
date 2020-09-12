import axios from 'axios';
import config from './../../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        // Send an http request with a query to the recipe endpoint and store it to the result property of a Search instance

        try {
            const res = await axios(`https://api.spoonacular.com/recipes/search?apiKey=${config.apiKey}&query=${this.query}`);
            this.results = res.data.results;
        } catch (e) {
            alert('Sorry! something went wrong...');
        }
    }
}