import { create, all } from 'mathjs'

const config = { number: 'Fraction' };

export const math = create(all, config);

export const imageFormat = str => {
    if(!str) return ".jpg";
    return str.slice(str.indexOf('.'), str.length);
};

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}