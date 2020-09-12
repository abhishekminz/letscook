export default class List {
    constructor() {
        this.list = [];
    }

    addToList(ingredients) {
        ingredients.forEach(ing => {
            this.list.push(ing);
        });
    }
    
    removeFromList(id) {
        const index = this.list.findIndex(el => el.id === id);

        this.list.splice(index, 1);
    }
}