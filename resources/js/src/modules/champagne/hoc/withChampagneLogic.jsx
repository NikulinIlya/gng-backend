import React, { useState, useEffect } from "react";

import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products } = props;
    const extendedProducts = useBrands(products);
    return <WrappedComponent {...props} products={extendedProducts} />;
};
