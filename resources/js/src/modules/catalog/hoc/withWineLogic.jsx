import React, { useState, useEffect, useContext } from "react";

import SearchInput from "@/components/SearchInput";
import { HeaderContext } from "@/context/header";

import useMeasures from "@/utils/useMeasures";

export default WrappedComponent => props => {
    const { isMobile } = useMeasures();
    const { setComponent } = useContext(HeaderContext);
    const [filtersVisibility, setFiltersVisibility] = useState(false);

    const onInputChange = _ => console.log(_.target.value);
    const handleFiltersVisibility = state => _ => setFiltersVisibility(state);
    
    useEffect(_ => {
        setComponent(_ => <SearchInput onChange={onInputChange} />);
    }, []);

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
        />
    );
};
