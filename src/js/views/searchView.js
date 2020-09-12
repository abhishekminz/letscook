import { elements } from "./elements"
import { imageFormat, limitRecipeTitle } from './utilites';

// const limitTitle = (title, limit = 17) => {
//     const completeTitle = title.split(' ');
//     let desiredTitle = '';

//     completeTitle.forEach((cur, index) => {
//         if(desiredTitle.length <= 15) {
//             if(index !== 0) desiredTitle += ' ' + cur;
//             else desiredTitle += cur;
//         }
//     });

//     return desiredTitle + '...';
// };

const createListItems = (arr) => {
    const listItems = arr.map((cur, index, array) => {
        let type = imageFormat(cur.image);

        return `<li>
                    <a class="results__link" href="#${cur.id}">
                        <figure class="results__fig">
                        <img src="${`https://spoonacular.com/recipeImages/${cur.id}-90x90${type}`}" alt="Test">
                        </figure>
                        <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(cur.title)}</h4>
                        </div>
                    </a>
                </li>`
            });

    return listItems.join('');
};

export const clearSearchList = () => {
    elements.searchList.innerHTML = '';
};

export const getQuery = () => elements.searchInput.value;

export const clearInputField = () => {
    elements.searchInput.value = '';
};

export const createSearchList = (arr) => {
    // Clear the the SearchList
    clearSearchList();
    
    // Get the markup for all the items
    const allListItem = createListItems(arr);

    // Add the markup to the UI
    elements.searchList.insertAdjacentHTML('beforeend', allListItem);
};