import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";

import dictionary from "./dictionary";
import client from "./client";

export const store = createStoreon([
    client,
    dictionary,
    process.env.NODE_ENV !== "production" && storeonLogger
]);
