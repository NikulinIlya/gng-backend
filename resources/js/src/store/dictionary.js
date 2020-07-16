import redaxios, { to } from "@/utils/fetch";

export default store => {
    store.on("@init", () => ({ dictionary: null }));
    store.on("dictionary/get", async ({ dictionary }) => {
        try {
            if (!dictionary) {
                const [err, dictionaryResponse] = await to(
                    redaxios("/api/phrases")
                );

                store.dispatch(
                    "dictionary/set",
                    dictionaryResponse.data.reduce((acc, cur) => {
                        acc[cur.id] = cur.phrase;
                        return acc;
                    }, {})
                );
            }
        } catch {
            store.dispatch("dictionary/set", null);
        }
    });
    store.on("dictionary/force-load", async () => {
        try {
            const [err, dictionaryResponse] = await to(
                redaxios("/api/phrases")
            );
            store.dispatch("dictionary/set", dictionaryResponse.data);
        } catch {
            store.dispatch("dictionary/set", null);
        }
    });
    store.on("dictionary/set", (_, newDictionary) => ({
        dictionary: newDictionary
    }));
};
