import { elements } from "./elements";
import { math } from "./utilites";

const checkTheAmount = (amount) => {
	if (amount) {
		const stringAmount = amount.toString();
		if (!stringAmount.includes(".")) return `${amount}`;
		const decimal = stringAmount.split(".");
		if (decimal[0] === "0") {
			const fraction = math.fraction(amount);
			return `${fraction.n}/${fraction.d}`;
		}
		const majorNumber = parseInt(decimal[0]);
		const fraction = math.fraction(amount - majorNumber);
		return `${majorNumber} ${fraction.n}/${fraction.d}`;
	}
	return "";
};

const createRecipeItem = (ingredient) => {
	// Cases 24, 2.5, .25
	// .25 use math function for sure to get 1/4
	// if(amt < 1) fraction = math.fraction(amt);

	// 2.5 if math function is used directly it will result in 5/2 but we need 2 1/2
	// 24 no math function usage since it does not have decimal in it
	return `
            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${checkTheAmount(
									ingredient.amount
								)}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${ingredient.unit} </span>
                    ${ingredient.originalName}
                </div>
            </li>`;
};

export const renderRecipe = (recipe, like = false) => {
	const imageUrl = recipe.imageUrl.replace("size", "556x370");
	const markup = `
        <figure class="recipe__fig">
                <img src="${imageUrl}">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
											recipe.readyInTime
										}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
											recipe.servings
										}</span>
                    <span class="recipe__info-text"> servings</span>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${
													like ? "" : "-outlined"
												}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.recipeIngredients
											.map((ingredient) => createRecipeItem(ingredient))
											.join("")}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${
											recipe.author
										}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${
									recipe.moreInfo
								}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;

	elements.recipeInfo.insertAdjacentHTML("afterbegin", markup);
};

export const clearRecipeSection = () => {
	elements.recipeInfo.innerHTML = "";
};
