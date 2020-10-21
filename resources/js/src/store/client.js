import fetch, { to } from "@/utils/fetch";

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
    const favoriteProducts =
        (localStorage.getItem("favorite-products") &&
            JSON.parse(localStorage.getItem("favorite-products"))) ||
        null;
    const token = localStorage.getItem("token") || "";

    store.on("@init", () => ({
        lang: memoizedLang || DEFAULT_LANG,
        isAuthorized: false,
        favoriteProducts: favoriteProducts || [],
        appIsPending: true,
        userInfo: {},
        pendingRoute: "",
        token
    }));

    store.on("client/set-token", (_, token) => {
        localStorage.setItem("token", token);
        return { token };
    });

    store.on("client/logout", async () => {
        await to(fetch.post("/api/logout"));
        store.dispatch("client/set-user-info", {});
        store.dispatch("client/set-is-authorized", false);
        localStorage.removeItem("token");
    });

    store.on("client/set-pending-route", (_, pendingRoute) => ({
        pendingRoute
    }));

    store.on("client/get-user-info", async (_, { appPending = false }) => {
        appPending && store.dispatch("client/set-app-pending", true);
        try {
            const [err, res] = await to(fetch.get("/api/user-info"));

            if (err) return { userInfo: {} };

            if (res && res.data && res.data.id) {
                store.dispatch("client/set-is-authorized", true);
                store.dispatch("client/set-user-info", res.data);
                return { userInfo: res.data };
            } else {
                return { userInfo: {} };
            }
        } catch (err) {
            return { userInfo: {} };
        } finally {
            store.dispatch("client/set-app-pending", false);
        }
    });

    store.on("client/set-user-info", (_, userInfo) => ({
        userInfo
    }));

    store.on(
        "client/set-favorite-products",
        ({ isAuthorized }, favoriteProducts) => {
            if (!isAuthorized)
                localStorage.setItem(
                    "favorite-products",
                    JSON.stringify(favoriteProducts)
                );
            return { favoriteProducts };
        }
    );

    store.on("client/set-is-authorized", (_, isAuthorized) => ({
        isAuthorized
    }));

    store.on("client/set-lang", async (_, langValue) => {
        if (!existingLangs[langValue]) return { lang: DEFAULT_LANG };
        store.dispatch("client/set-app-pending", true);
        try {
            await to(fetch.get(`/api/lang/${langValue}`));
            localStorage.setItem("lang", langValue);

            return { ..._, lang: langValue };
        } catch {
            return { lang: DEFAULT_LANG };
        } finally {
            store.dispatch("dictionary/force-load");
            store.dispatch("showcase/force-reinit");
            store.dispatch("client/set-app-pending", false);
        }
    });
    store.on("client/set-app-pending", (_, state) => ({ appIsPending: state }));
};
