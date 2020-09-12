export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLikes(recipe) {
        this.likes.push(recipe);
    }

    deleteLike(id) {
        this.likes.splice(this.likes.findIndex(el => el.id === id), 1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    numOfLikes() {
        return this.likes.length;
    }

    persistLikes() {
        const likes = JSON.stringify(this.likes);

        localStorage.setItem('likes', likes);
    }

    retreiveLikes() {
        const likes = JSON.parse(localStorage.getItem('likes'));

        this.likes = likes;
    }
}