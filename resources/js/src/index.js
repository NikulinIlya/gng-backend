import React, { useState, useEffect, createElement } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "@/modules/home";
import Catalog from "@/modules/catalog";
import ProductDetails from "@/modules/catalog/containers/ProductDetails";
import Events from "@/modules/events";
import EventPage from "@/modules/events/containers/EventPage";
import Exclusive from "@/modules/exclusive";
import News from "@/modules/news";
import Brands from "@/modules/brands";
import Contacts from "@/modules/contacts";
import Cart from "@/modules/cart";
import Order from "@/modules/cart/containers/Order";
import StaticPage from "@/modules/text-page";
import About from "@/modules/about";
import Profile from "@/modules/profile"

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogNavigation from "@/components/CatalogNavigation";
import AgeLimitation from "@/components/AgeLimitation";
import { SignIn, SignUp } from "@/components/Login";
import Modal from "@/components/Modal";

import { HeaderContext } from "@/context/header";
import useMeasures from "@/utils/useMeasures";

import "@/index.scss";

export const history = createBrowserHistory();

const LoginVariants = {
  "sign-in": SignIn,
  "sign-up": SignUp,
};

const App = () => {
  const [isProtectedVisit, setIsProtectedVisit] = useState((_) =>
    localStorage.getItem("is-protected")
  );
  const [renderingComponent, setComponent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState({});
  const { search } = useLocation();
  const { isMobile } = useMeasures();

  useEffect(
    (_) => {
      if (search) {
        const params = new URLSearchParams(search);

        params.has("login") &&
          LoginVariants[params.get("login")] &&
          setIsLoginModalVisible({ state: true, variant: params.get("login") });

        if (
          params.has("visit") &&
          params.get("visit") === "37693cfc748049e45"
        ) {
          localStorage.setItem("is-protected", true);
          setIsProtectedVisit(true);
        }
      } else {
        setIsLoginModalVisible({});
      }
    },
    [search]
  );

  if (!isProtectedVisit) return null;

  return (
    <>
      <main className="app-view">
        <HeaderContext.Provider value={{ renderingComponent, setComponent }}>
          <Header />
          <CatalogNavigation />
          <Switch>
            <Route path="/brands" exact component={Brands} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/about" component={About} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/cart/order" component={Order} />
            <Route path="/static" component={StaticPage} />
            <Route exact path="/events" exact component={Events} />
            <Route path="/events/:eventId" exact component={EventPage} />
            <Route path="/news" exact component={News} />
            <Route path="/exclusive" exact component={Exclusive} />
            <Route path="/catalog" exact component={Catalog} />
            <Route path="/:productId" component={ProductDetails} />
            <Route path="/" exact component={Home} />
          </Switch>

          {isLoginModalVisible.state && (
            <Modal
              closable={isMobile}
              onClose={(_) => history.push(window.location.pathname)}
            >
              {createElement(LoginVariants[isLoginModalVisible.variant], {
                onClose: (_) => history.push(window.location.pathname),
              })}
            </Modal>
          )}

          {isModalVisible && (
            <Modal closable={false}>
              <AgeLimitation onPositive={(_) => setIsModalVisible(false)} />
            </Modal>
          )}
        </HeaderContext.Provider>
        <Footer />
      </main>
    </>
  );
};

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector("#root")
);
