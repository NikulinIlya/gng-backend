export default store => {
    const products = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    store.on("@init", _ => ({
        productsInCart: products
    }));

    store.on("cart/add", ({ productsInCart }, { product, callback = Function.prototype }) => {
        const resultCart = [
            ...productsInCart,
            { id: product.id, count: product.count }
        ];
        localStorage.setItem("cart", JSON.stringify(resultCart));
        callback();
        return {
            productsInCart: resultCart
        };
    });

    store.on("cart/remove", ({ productsInCart }, id) => {
        const resultCart = productsInCart.filter(p => p.id !== id);
        localStorage.setItem("cart", JSON.stringify(resultCart));
        console.log("resultCart", resultCart);
        return {
            productsInCart: resultCart
        };
    });

    store.on("cart/change", ({ productsInCart }, { id, count }) => {
        const resultCart = productsInCart.map(p => ({
            ...p,
            count: p.id === id ? count : p.count
        }));
        localStorage.setItem("cart", JSON.stringify(resultCart));
        return {
            productsInCart: resultCart
        };
    });
};
