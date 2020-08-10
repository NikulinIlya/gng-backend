import redaxios, { to } from "@/utils/fetch";

export default store => {
    store.on("@init", _ => {
        store.dispatch("dictionary/get");
        return { dictionary: null };
    });
    store.on("dictionary/get", async ({ dictionary }) => {
        try {
            if (!dictionary) {
                const [err, dictionaryResponse] = await to(
                    redaxios("/api/phrases")
                );

                store.dispatch(
                    "dictionary/set",
                    parseDictionary(dictionaryResponse.data)
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
            store.dispatch(
                "dictionary/set",
                parseDictionary(dictionaryResponse.data)
            );
        } catch {
            store.dispatch("dictionary/set", null);
        }
    });
    store.on("dictionary/set", (_, dictionary) => ({ dictionary }));
};

function parseDictionary(dictionary) {
    return dictionary.reduce((acc, cur) => {
        acc[cur.slug] = cur.phrase;
        return acc;
    }, {});
}
