export default store => {
    store.on("@init", _ => ({
        productsInCart: []
    }));

    store.on("cart/add", ({ productsInCart }, product) => {
        return {
            productsInCart: [
                ...productsInCart,
                { id: product.id, count: product.count }
            ]
        };
    });
};
