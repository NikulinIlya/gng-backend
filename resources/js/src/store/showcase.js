import redaxios, { to } from "@/utils/fetch";

export default store => {
    store.on("@init", () => ({ brands: null }));
    store.on("showcase/set-brands", async (store, brands) => ({
        ...store,
        brands
    }));
    store.on("showcase/get-brands", async ({ brands }) => {
        if (brands) return brands;

        try {
            const [err, langResponse] = await to(redaxios(`/api/brands`));
            store.dispatch("showcase/set-brands",langResponse.data);
        } catch {
            return _;
        }
    });
};
