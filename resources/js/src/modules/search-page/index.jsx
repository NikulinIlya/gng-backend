import React, { useState, useEffect } from "react";

import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";

import { withApi, withLogic } from "./hoc";

import compose from "@/utils/compose";

import "./search-page.scss";

function SearchPage({ isLoaded, products, query }) {
    return (
        <div className="container">
            <div className="search-page">
                <h1 className="search-page__title">
                    Search results for "{query}"
                </h1>
                <div className="search-page__results">
                    {isLoaded ? (
                        <>
                            {products.length ? (
                                <div className="search-page__grid">
                                    {products.map(({ id, image, ...rest }) => (
                                        <BottleCard
                                            to={`/catalog/${id}`}
                                            bottle={image}
                                            {...rest}
                                            key={id}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="search-page__empty-result">
                                    Nothing was found
                                </p>
                            )}
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
}

export default compose(withApi, withLogic)(SearchPage);
