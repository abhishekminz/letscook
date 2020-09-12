import { domStrings } from './doms';

export const renderLoader = parent => {
    const loader = `<div class="loader">
                        <svg>
                            <use href="img/icons.svg#icon-cw"></use>
                        </svg>
                    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(domStrings.loader);

    if (loader) loader.parentElement.removeChild(loader);
};