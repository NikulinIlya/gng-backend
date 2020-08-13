import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";

import dictionary from "./dictionary";
import client from "./client";
import showcase from "./showcase";
import cart from "./cart";

export const store = createStoreon([
    client,
    dictionary,
    showcase,
    cart,
    process.env.NODE_ENV !== "production" && storeonLogger
]);
