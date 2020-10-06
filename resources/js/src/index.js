import React, {
    useState,
    useEffect,
    useCallback,
    createElement,
    Suspense,
    lazy
} from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import { StoreContext, useStoreon } from "storeon/react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogNavigation from "@/components/CatalogNavigation";
import AgeLimitation from "@/components/AgeLimitation";
import { SignIn, SignUp } from "@/components/Login";
import Modal from "@/components/Modal";
import NotFound from "@/components/NotFound";
import { CartNotificationProvider } from "@/components/CartNotification";
import Loading from "@/components/Loading";

import { HeaderContext } from "@/context/header";
import useMeasures from "@/utils/useMeasures";
import redaxios, { to } from "@/utils/fetch";

import { store } from "@/store";

import "@/index.scss";

export const history = createBrowserHistory();

const Home = lazy(_ => import("@/modules/home"));
const Wines = lazy(_ => import("@/modules/wines"));
const Champagne = lazy(_ => import("@/modules/champagne"));
const Strong = lazy(_ => import("@/modules/strong"));
const SearchPage = lazy(_ => import("@/modules/search-page"));
const ProductDetails = lazy(_ => import("@/modules/drink-details"));
const Events = lazy(_ => import("@/modules/events"));
const EventPage = lazy(_ => import("@/modules/events/containers/EventPage"));
const Exclusive = lazy(_ => import("@/modules/exclusive"));
const Accessories = lazy(_ => import("@/modules/accessories"));
const News = lazy(_ => import("@/modules/news"));
const Brands = lazy(_ => import("@/modules/brands"));
const Contacts = lazy(_ => import("@/modules/contacts"));
const Cart = lazy(_ => import("@/modules/cart"));
const Order = lazy(_ => import("@/modules/cart/containers/Order"));
const StaticPage = lazy(_ => import("@/modules/text-page"));
const About = lazy(_ => import("@/modules/about"));
const Profile = lazy(_ => import("@/modules/profile"));

const LoginVariants = {
    "sign-in": SignIn,
    "sign-up": SignUp
};

const App = () => {
    const [renderingComponent, setComponent] = useState(null);
    const [isAgeDisclaimerVisible, setIsAgeDisclaimerVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState({});
    const { search } = useLocation();
    const { isMobile } = useMeasures();
    const { dispatch, appIsPending } = useStoreon("appIsPending");

    const handleScrollY = useCallback(_ => {
        document.documentElement.style.setProperty(
            "--scroll-y",
            `${window.scrollY}px`
        );
    }, []);

    useEffect(_ => {
        (async _ => {
            const data = {
                name: 'vigen',
                email: 'some@mail.address',
                password: '123456789',
                second_name: '',
                phone:'89887776655',
                discount_agreed: true,
                events_agreed: true
            }
            const response = await to(redaxios("/sanctum/csrf-cookie"));
            const login = await to(
                redaxios({
                    method: "post",
                    url: "/api/register",
                    headers: {
                        accept: "json"
                    },
                    body: JSON.stringify(data)
                })
            );
            // const lang = await to(redaxios("/api/lang/en"));
            console.log("response", response);
        })();

        window.addEventListener("scroll", handleScrollY);
        return _ => window.removeEventListener("scroll", handleScrollY);
    }, []);
    useEffect(
        _ => {
            if (search) {
                const params = new URLSearchParams(search);

                params.has("login") &&
                    LoginVariants[params.get("login")] &&
                    setIsLoginModalVisible({
                        state: true,
                        variant: params.get("login")
                    });
            } else {
                setIsLoginModalVisible({});
            }
        },
        [search]
    );

    return (
        <>
            <main className="app-view">
                <CartNotificationProvider>
                    <HeaderContext.Provider
                        value={{ renderingComponent, setComponent }}
                    >
                        <Header />
                        <CatalogNavigation />
                        {appIsPending ? (
                            <Loading />
                        ) : (
                            <Suspense fallback="Loading...">
                                <Switch>
                                    <Route
                                        path="/brands"
                                        exact
                                        component={Brands}
                                    />
                                    <Route
                                        path="/contacts"
                                        component={Contacts}
                                    />
                                    <Route path="/about" component={About} />
                                    <Route
                                        exact
                                        path="/profile"
                                        component={Profile}
                                    />
                                    <Route
                                        exact
                                        path="/cart"
                                        component={Cart}
                                    />
                                    <Route
                                        path="/cart/order"
                                        component={Order}
                                    />
                                    <Route
                                        path="/static"
                                        component={StaticPage}
                                    />
                                    <Route
                                        exact
                                        path="/accessories"
                                        exact
                                        component={Accessories}
                                    />
                                    <Route
                                        exact
                                        path="/events"
                                        exact
                                        component={Events}
                                    />
                                    <Route
                                        path="/events/:eventId"
                                        exact
                                        component={EventPage}
                                    />
                                    <Route
                                        path="/news"
                                        exact
                                        component={News}
                                    />
                                    <Route
                                        path="/exclusive"
                                        exact
                                        component={Exclusive}
                                    />
                                    <Route
                                        path="/wines"
                                        exact
                                        component={Wines}
                                    />
                                    <Route
                                        path="/spirits"
                                        exact
                                        component={Strong}
                                    />
                                    <Route
                                        path="/champagne"
                                        exact
                                        component={Champagne}
                                    />
                                    <Route
                                        path="/search"
                                        component={SearchPage}
                                    />
                                    <Route
                                        path="/catalog/:productId"
                                        component={ProductDetails}
                                    />
                                    <Route path="/" exact component={Home} />
                                    <Route component={NotFound} />
                                </Switch>
                            </Suspense>
                        )}

                        {isLoginModalVisible.state && (
                            <Modal
                                closable={isMobile}
                                onClose={_ => history.push(location.pathname)}
                            >
                                {createElement(
                                    LoginVariants[isLoginModalVisible.variant],
                                    {
                                        onClose: _ =>
                                            history.push(location.pathname)
                                    }
                                )}
                            </Modal>
                        )}

                        {isAgeDisclaimerVisible && (
                            <Modal closable={false}>
                                <AgeLimitation
                                    onPositive={_ =>
                                        setIsAgeDisclaimerVisible(false)
                                    }
                                />
                            </Modal>
                        )}
                    </HeaderContext.Provider>
                </CartNotificationProvider>
                <Footer />
            </main>
        </>
    );
};

ReactDOM.render(
    <Router history={history}>
        <StoreContext.Provider value={store}>
            <App />
        </StoreContext.Provider>
    </Router>,
    document.querySelector("#root")
);
