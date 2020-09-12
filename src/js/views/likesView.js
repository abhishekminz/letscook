import { limitRecipeTitle } from './utilites';
import { elements } from './elements';

export const renderLikes = (likeList) => {
    const allLikedRecipes =likeList.map(like => {
    const imageUrl = like.imageUrl.replace('size', '90x90');
    return `<li>
                <a class="likes__link" href="#${like.id}">
                    <figure class="likes__fig">
                        <img src="${imageUrl}" alt="${limitRecipeTitle(like.title)}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                        <p class="likes__author">${like.author}</p>
                    </div>
                </a>
            </li>
            `
    }).join('');

    elements.likeList.insertAdjacentHTML('beforeend', allLikedRecipes);
};

export const clearLikes = () => {
    elements.likeList.innerHTML = "";
};
                        
export const toggleLikeBtn = likes => {
    elements.headerLikeBtn.style.visibility = likes > 0 ? 'visible' : 'hidden';
};