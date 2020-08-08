import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import SearchInput from "@/components/SearchInput";
import { HeaderContext } from "@/context/header";

import useMeasures from "@/utils/useMeasures";
import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products } = props;
    const { isMobile } = useMeasures();
    const { setComponent } = useContext(HeaderContext);
    const [filtersVisibility, setFiltersVisibility] = useState(false);

    const onInputChange = _ => console.log(_.target.value);
    const handleFiltersVisibility = state => _ => setFiltersVisibility(state);

    const extendedProducts = useBrands(products);

    useEffect(_ => {
        setComponent(_ => <SearchInput onChange={onInputChange} />);
    }, []);

    useEffect(_ => setFiltersVisibility(!isMobile), [isMobile]);
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
