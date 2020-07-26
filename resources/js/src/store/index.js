import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";

import dictionary from "./dictionary";
import client from "./client";
import showcase from "./showcase";

export const store = createStoreon([
    client,
    dictionary,
    showcase,
    process.env.NODE_ENV !== "production" && storeonLogger
]);
