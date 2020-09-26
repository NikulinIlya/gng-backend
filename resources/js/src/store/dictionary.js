import redaxios, { to } from "@/utils/fetch";

export default store => {
    store.on("@init", _ => {
        store.dispatch("dictionary/get");
        store.dispatch("dictionary/get-assistant-phrases");
        return { dictionary: null, assistantPhrases: null };
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
    store.on(
        "dictionary/get-assistant-phrases",
        async ({ assistantPhrases }) => {
            if (assistantPhrases) return assistantPhrases;

            try {
                const [err, phrasesResponse] = await to(
                    redaxios(`/api/assistant-phrases`)
                );
                store.dispatch(
                    "dictionary/set-assistant-phrases",
                    parseAssistantPhrases(phrasesResponse.data)
                );
            } catch {
                return _;
            }
        }
    );
    store.on("dictionary/set", (_, dictionary) => ({ dictionary }));
    store.on("dictionary/set-assistant-phrases", (_, assistantPhrases) => ({
        assistantPhrases
    }));
};

function parseDictionary(dictionary) {
    return dictionary.reduce((acc, cur) => {
        acc[cur.slug] = cur.phrase;
        return acc;
    }, {});
}

function parseAssistantPhrases(phrases) {
    return phrases.reduce((draft, { phrase, brand_id }) => {
        if (!draft[brand_id]) draft[brand_id] = [phrase];
        else draft[brand_id] = [...draft[brand_id], phrase];

        return draft;
    }, {});
}
