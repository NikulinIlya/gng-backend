import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import SearchInput from "@/components/SearchInput";
import { HeaderContext } from "@/context/header";

import useMeasures from "@/utils/useMeasures";

export default WrappedComponent => props => {
    const { products } = props;
    const [extendedProducts, setExtendedProducts] = useState([]);
    const { isMobile } = useMeasures();
    const { setComponent } = useContext(HeaderContext);
    const { flatBrands } = useStoreon("flatBrands");
    const [filtersVisibility, setFiltersVisibility] = useState(false);

    const onInputChange = _ => console.log(_.target.value);
    const handleFiltersVisibility = state => _ => setFiltersVisibility(state);
    const decorateProductsWithBrands = (products, brands) =>
        products.map(({ brand_id, ...restProps }) => ({
            ...restProps,
            brand: brands[brand_id]
        }));

    useEffect(_ => {
        setComponent(_ => <SearchInput onChange={onInputChange} />);
    }, []);

    useEffect(
        _ => {
            setExtendedProducts(
                decorateProductsWithBrands(products, flatBrands)
            );
        },
        [flatBrands, products]
    );

    useEffect(
        _ => {
            setFiltersVisibility(!isMobile);
        },
        [isMobile]
    );
    useEffect(
        _ => {
            document.body.style.position =
                filtersVisibility && isMobile ? "fixed" : "static";
        },
        [filtersVisibility, isMobile]
    );
    return (
        <WrappedComponent
            {...props}
            {...{ isMobile, filtersVisibility, handleFiltersVisibility }}
            products={extendedProducts}
        />
    );
};
