export default (state, action) => {
    switch (action.type) {
        case "set-products":
            return { ...state, products: action.payload };
        case "set-filters-visibility":
            return { ...state, filtersVisibility: action.payload };
        default:
            return state;
    }
};
