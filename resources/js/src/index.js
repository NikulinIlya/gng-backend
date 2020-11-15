import React, { useState, useEffect, createElement, Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { StoreContext, useStoreon } from "storeon/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogNavigation from "@/components/CatalogNavigation";
import AgeLimitation from "@/components/AgeLimitation";
import { SignIn, SignUp, RestorePass } from "@/components/Login";
import Modal from "@/components/Modal";
import { CartNotificationProvider } from "@/components/CartNotification";
import Loading from "@/components/Loading";
import ProtectedRoute from "@/components/ProtectedRoute";

import isEmpty from "@/utils/is-empty";
import handleScrollY from "@/utils/handle-y-scroll";
import useMeasures from "@/utils/useMeasures";
import useQueryParams from "@/utils/useQueryParams";
import fetch, { to } from "@/utils/fetch";

import { store } from "@/store";
import routes from "@/routes";

import "@/index.scss";

export const history = createBrowserHistory();

const LoginVariants = {
    "sign-in": SignIn,
    "sign-up": SignUp,
    restore: RestorePass
};

const App = () => {
    const [isAgeDisclaimerVisible, setIsAgeDisclaimerVisible] = useState(
        !localStorage.getItem("age-confirmed")
    );
    const [loginVariant, setLoginVariant] = useState({});
    const { isMobile } = useMeasures();
    const { params } = useQueryParams();
    const { dispatch, appIsPending } = useStoreon("appIsPending");

    /** On query params change */
    useEffect(
        _ => {
            if (!params) return;

            /** Verifying user */

            if (params["verify_code"]) {
                (async _ => {
                    dispatch("client/set-app-pending", true);
                    const [err, response] = await to(
                        fetch.post("/api/verify", {
                            verify_code: params["verify_code"]
                        })
                    );
                    if (response) {
                        dispatch("client/set-is-authorized", true);
                        dispatch("client/set-user-info", response.data);
                        console.log("response", response);
                    }
                    console.log("err", err);
                    dispatch("client/set-app-pending", false);
                })();
            }

            /** Handling login modals (sign-in/sign-up/restore pass) */

            if (params["login"]) {
                if (LoginVariants[params["login"]]) {
                    setLoginVariant({
                        state: true,
                        variant: params["login"]
                    });
                }
            }
            if (isEmpty(params)) setLoginVariant({});
        },
        [params]
    );

    /** On initial render */
    useEffect(_ => {
        /** Handling user-info */

        (async () => {
            dispatch("client/get-user-info", { appPending: true });
        })();

        /** Aplying scroll listener for modal position tracking */

        window.addEventListener("scroll", handleScrollY);
        return _ => window.removeEventListener("scroll", handleScrollY);
    }, []);

    return (
        <main className="app-view">
            <Header />
            <CatalogNavigation />
            {appIsPending ? (
                <Loading />
            ) : (
                <Suspense
                    fallback={
                        <div style={{ height: 200 }}>
                            <Loading />
                        </div>
                    }
                >
                    <Switch>
                        {routes.map((route, i) =>
                            createElement(
                                route.protected ? ProtectedRoute : Route,
                                { ...route, key: i }
                            )
                        )}
                    </Switch>
                </Suspense>
            )}

            {loginVariant.state && (
                <Modal
                    closable={isMobile}
                    onClose={_ => history.push(location.pathname)}
                >
                    {createElement(LoginVariants[loginVariant.variant], {
                        onClose: _ => history.push(location.pathname)
                    })}
                </Modal>
            )}

            {isAgeDisclaimerVisible && (
                <Modal closable={false}>
                    <AgeLimitation
                        onPositive={_ => {
                            localStorage.setItem("age-confirmed", true);
                            setIsAgeDisclaimerVisible(false);
                        }}
                    />
                </Modal>
            )}
            <Footer />
        </main>
    );
};

ReactDOM.render(
    <Router history={history}>
        <StoreContext.Provider value={store}>
            <CartNotificationProvider>
                <App />
            </CartNotificationProvider>
        </StoreContext.Provider>
    </Router>,
    document.querySelector("#root")
);
