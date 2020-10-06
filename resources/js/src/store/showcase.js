import redaxios, { to } from "@/utils/fetch";

export default store => {
    store.on("@init", () => {
        store.dispatch("showcase/get-brands");
        store.dispatch("showcase/get-colors");
        store.dispatch("showcase/get-regions");
        store.dispatch("showcase/get-grape-sorts");
        store.dispatch("showcase/get-product-categories");

        return {
            brands: null,
            colors: null,
            regions: null,
            sorts: null,
            productCategories: null,
            assistantPhrases: null,

            flatBrandNames: null,
            flatRegionMapImages: null,
            flatRegionImages: null,
            flatRegionNames: null,
            flatColorNames: null
        };
    });
    store.on("showcase/force-reinit", () => {
        store.dispatch("showcase/set-brands", null);
        store.dispatch("showcase/set-colors", null);
        store.dispatch("showcase/set-regions", null);
        store.dispatch("showcase/set-grape-sorts", null);
        store.dispatch("showcase/set-product-categories", null);

        store.dispatch("showcase/get-brands");
        store.dispatch("showcase/get-colors");
        store.dispatch("showcase/get-regions");
        store.dispatch("showcase/get-grape-sorts");
        store.dispatch("showcase/get-product-categories");
    });
    store.on("showcase/set-brands", (_, brands) => ({ brands }));
    store.on("showcase/set-product-categories", (_, productCategories) => ({
        productCategories
    }));
    store.on("showcase/set-flat-brands", (_, flatBrandNames) => ({
        flatBrandNames
    }));
    store.on("showcase/set-flat-color-names", (_, flatColorNames) => ({
        flatColorNames
    }));
    store.on("showcase/set-colors", (_, colors) => ({ colors }));
    store.on("showcase/set-regions", (_, regions) => ({ regions }));
    store.on("showcase/set-flat-region-images", (_, flatRegionImages) => ({
        flatRegionImages
    }));
    store.on(
        "showcase/set-flat-region-map-images",
        (_, flatRegionMapImages) => ({
            flatRegionMapImages
        })
    );
    store.on("showcase/set-flat-region-names", (_, flatRegionNames) => ({
        flatRegionNames
    }));
    store.on("showcase/set-grape-sorts", (_, sorts) => ({ sorts }));

    store.on("showcase/get-brands", async ({ brands }) => {
        if (brands) return brands;

        try {
            const [err, brandsResponse] = await to(redaxios(`/api/brands`));
            store.dispatch("showcase/set-brands", [
                ...brandsResponse.data
                    .filter(b => b.position)
                    .sort((a, b) => a.position - b.position),
                ...brandsResponse.data.filter(b => !b.position)
            ]);

            store.dispatch(
                "showcase/set-flat-brands",
                brandsResponse.data.reduce(
                    (acc, { id, name }) => ((acc[id] = name), acc),
                    {}
                )
            );
        } catch {
            return _;
        }
    });

    store.on(
        "showcase/get-product-categories",
        async ({ productCategories }) => {
            if (productCategories) return productCategories;

            try {
                const [err, categoriesResponse] = await to(
                    redaxios(`/api/product-categories`)
                );
                store.dispatch(
                    "showcase/set-product-categories",
                    categoriesResponse.data
                );
            } catch {
                return _;
            }
        }
    );

    store.on("showcase/get-colors", async ({ colors }) => {
        if (colors) return colors;

        try {
            const [err, colorsResponse] = await to(redaxios(`/api/colours`));
            store.dispatch("showcase/set-colors", colorsResponse.data);
            store.dispatch(
                "showcase/set-flat-color-names",
                colorsResponse.data.reduce(
                    (acc, { id, name }) => ((acc[id] = name), acc),
                    {}
                )
            );
        } catch {
            return _;
        }
    });

    store.on("showcase/get-regions", async ({ regions }) => {
        if (regions) return regions;

        try {
            const [err, regionsResponse] = await to(redaxios(`/api/locations`));
            store.dispatch("showcase/set-regions", regionsResponse.data);
            store.dispatch(
                "showcase/set-flat-region-map-images",
                regionsResponse.data.reduce(
                    (acc, { id, map_image }) => ((acc[id] = map_image), acc),
                    {}
                )
            );
            store.dispatch(
                "showcase/set-flat-region-images",
                regionsResponse.data.reduce(
                    (acc, { id, image }) => ((acc[id] = image), acc),
                    {}
                )
            );
            store.dispatch(
                "showcase/set-flat-region-names",
                regionsResponse.data.reduce(
                    (acc, { id, country }) => ((acc[id] = country), acc),
                    {}
                )
            );
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
