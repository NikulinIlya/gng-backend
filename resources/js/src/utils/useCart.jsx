import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext as Cart } from "@/components/CartNotification";

import UNIT from "@/utils/product-unit";
import getRandom from "@/utils/get-random-item";

export default function useCart() {
    const { dispatch: storeDispatch, assistantPhrases } = useStoreon(
        "assistantPhrases"
    );
    const { notify } = useContext(Cart);

    const add = async (productId, count = 1, brandId = "") =>
        new Promise((resolve, reject) => {
            if (!productId) {
                reject("product id should be passed");
                return;
            }

            storeDispatch("cart/add", {
                product: { id: productId, count, unit: UNIT.case },
                callback: _ => throwNotification(brandId)
            });
            
            resolve();
        });

    const throwNotification = brandId => {
        const text =
            assistantPhrases && brandId
                ? getRandom(assistantPhrases[brandId])
                : "";
        notify({ text });
    };

    return { add };
}
