const formmatter = new Intl.NumberFormat(['ban', 'id']);

export const format = (price) => {
    return formmatter.format(price);
};
