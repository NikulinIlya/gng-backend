import React, { useState, useEffect } from "react";

import useBrands from "@/utils/useBrands";
import useCart from "@/utils/useCart";
import redaxios, { to } from "@/utils/fetch";
import { status as REQUEST } from "@/utils/request-status";

export default function usePopular() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState(REQUEST.pending);
    const extendedProducts = useBrands(products);
    const { add } = useCart();

    useEffect(_ => {
        (async _ => {
            const [err, response] = await to(redaxios("/api/popular-products"));
            if (err) {
                setStatus(REQUEST.error);
                return;
            }
            setProducts(response.data);
            setStatus(REQUEST.success);
        })();
    }, []);

    const onAdd = async (id, count = 1) => {
        const brandId = extendedProducts.find(p => p.id === id).brand_id;
        await add(id, count, brandId);
    };

    return { status, products: extendedProducts, onAdd };
}
