import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import twf from "./translate";

export default function useMeasures() {
    const { dictionary } = useStoreon("dictionary");

    const t = (slug, fallback) => twf(dictionary, slug, fallback);

    return { t };
}
