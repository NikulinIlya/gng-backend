import redaxios, { to } from "@/utils/fetch";

export default store => {
    store.on("@init", () => {
        store.dispatch("showcase/get-brands");
        store.dispatch("showcase/get-colors");
        store.dispatch("showcase/get-regions");
        store.dispatch("showcase/get-grape-sorts");
        return { brands: null, colors: null, sorts: null };
    });

    store.on("showcase/set-brands", (_, brands) => ({ brands }));
    store.on("showcase/set-colors", (_, colors) => ({ colors }));
    store.on("showcase/set-regions", (_, regions) => ({ regions }));
    store.on("showcase/set-grape-sorts", (_, sorts) => ({ sorts }));

    store.on("showcase/get-brands", async ({ brands }) => {
        if (brands) return brands;

        try {
            const [err, brandsResponse] = await to(redaxios(`/api/brands`));
            store.dispatch("showcase/set-brands", brandsResponse.data);
        } catch {
            return _;
        }
    });

    store.on("showcase/get-colors", async ({ colors }) => {
        if (colors) return colors;

        try {
            const [err, colorsResponse] = await to(redaxios(`/api/colours`));
            store.dispatch("showcase/set-colors", colorsResponse.data);
        } catch {
            return _;
        }
    });

    store.on("showcase/get-regions", async ({ regions }) => {
        if (regions) return regions;

        try {
            const [err, regionsResponse] = await to(redaxios(`/api/locations`));
            store.dispatch("showcase/set-regions", regionsResponse.data);
        } catch {
            return _;
        }
    });

    store.on("showcase/get-grape-sorts", async ({ sorts }) => {
        if (sorts) return sorts;

        try {
            const [err, sortsResponse] = await to(redaxios(`/api/grape-sorts`));
            store.dispatch("showcase/set-grape-sorts", sortsResponse.data);
        } catch {
            return _;
        }
    });
};
