import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState({});
    const location = useLocation();

    useEffect(_ => {
        (async _ => {
            Promise.all([
                to(redaxios("/api/articles/brands/19")),
                to(redaxios("/api/articles/grapes/31")),
                to(redaxios("/api/articles/regions/16"))
            ]).then(([[, brand], [, grape], [, region]]) => {
                setArticles([brand.data[0], grape.data[0], region.data[0]]);
            });
        })();
    }, []);

    useEffect(
        _ => {
            const urlParams = new URLSearchParams(location.search);
            if (articles.length && urlParams.has("article")) {
                setCurrentArticle(
                    articles.find(art => art.id === +urlParams.get("article"))
                );
            } else {
                setCurrentArticle({});
            }
        },
        [articles, location.search]
    );

    return (
        <WrappedComponent
            {...props}
            articles={articles}
            currentArticle={currentArticle}
        />
    );
};
