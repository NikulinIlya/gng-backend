import redaxios, { to } from "@/utils/fetch";

export const RU_LANG = "ru";
export const ENG_LANG = "en";

export const existingLangs = {
    [RU_LANG]: RU_LANG,
    [ENG_LANG]: ENG_LANG
};

export const DEFAULT_LANG = RU_LANG;

export default store => {
    const memoizedLang =
        (localStorage.getItem("lang") &&
            existingLangs[localStorage.getItem("lang")]) ||
        null;

    store.on("@init", () => ({
        lang: memoizedLang || DEFAULT_LANG
    }));
    store.on("client/set-lang", async (_, lang) => {
        if (!existingLangs[lang]) return { lang: DEFAULT_LANG };

        try {
            const [err, langResponse] = await to(redaxios(`/api/lang/${lang}`));
            store.dispatch("dictionary/force-load");
            localStorage.setItem("lang", lang);
            return { lang };
        } catch {
            return _;
        }
    });
};
