import React, { useState, useEffect, useContext } from "react";
import SearchInput from "@/components/SearchInput";

import { HeaderContext } from "@/context/header";
import BottleCard from "@/components/BottleCard";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import AdvancedFilters from "./components/AdvancedFiltering";
import Filtering from "./components/Filtering";
import useMeasures from "@/utils/useMeasures";

import redaxios, { to } from "@/utils/fetch";

import "./catalog.scss";

const CatalogPage = _ => {
    const { isMobile } = useMeasures();
    const { setComponent } = useContext(HeaderContext);
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    const onInputChange = _ => console.log(_.target.value);

    useEffect(_ => {
        setComponent(_ => <SearchInput onChange={onInputChange} />);
        (async _ => {
            const [err, response] = await to(redaxios("/api/products"));
            setProducts(response.data);
            setIsLoaded(true);
            console.log("response", response.data);
        })();
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
        <div className="catalog">
            <div className="container">
                {isMobile && (
                    <div className="catalog-filters-handler">
                        <Button onClick={_ => setFiltersVisibility(true)}>
                            Фильтры
                        </Button>
                    </div>
                )}
                <AdvancedFilters />
                <div className="container-grid">
                    <aside hidden={!filtersVisibility}>
                        <Filtering onClose={_ => setFiltersVisibility(false)} />
                    </aside>
                    {isLoaded ? (
                        <div className="catalog-grid">
                            {products.map(({ name, price, brand }, i) => (
                                <BottleCard
                                    name={name}
                                    price={price}
                                    brand={brand}
                                    key={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
