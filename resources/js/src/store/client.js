import redaxios, { to } from "@/utils/fetch";
import axios from "axios";

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

    store.on("@init", () => ({
        lang: memoizedLang || DEFAULT_LANG,
        isAuthorized: false,
        favoriteProducts: favoriteProducts || [],
        appIsPending: false,
        userInfo: {},
        pendingRoute: ""
    }));

    store.on("client/logout", async () => {
        try {
            await to(
                axios({
                    url: "/logout",
                    method: "post",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    data: {}
                })
            );
        } finally {
            store.dispatch("client/set-is-authorized", false);
        }
    });

    store.on("client/set-pending-route", (_, pendingRoute) => ({
        pendingRoute
    }));

    store.on("client/get-user-info", async (_, { appPending = false }) => {
        appPending && store.dispatch("client/set-app-pending", true);
        try {
            const [err, res] = await to(
                axios({
                    url: "api/user-info",
                    method: "get",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
            );
            if (err) return { userInfo: {} };
            if (res) {
                store.dispatch("client/set-user-info", res.data[0]);
                store.dispatch("client/set-is-authorized", true);
            }
        } catch (err) {
            return { userInfo: {} };
        } finally {
            appPending && store.dispatch("client/set-app-pending", false);
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
            await to(redaxios(`/api/lang/${langValue}`));
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
