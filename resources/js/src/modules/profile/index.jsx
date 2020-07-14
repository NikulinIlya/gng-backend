import React, { useState, useEffect, createElement } from "react";
import { useLocation } from "react-router-dom";

import Account from "./containers/Account";
import Favorite from "./containers/Favorite";
import Orders from "./containers/Orders";
import CustomTabLink from "./components/CustomTabLink";

import tabLinks from "./static";

import "./profile.scss";

const Tabs = {
  orders: Orders,
  favorite: Favorite,
  info: Account,
};

export default function Profile() {
  const [currentTab, setCurrentTab] = useState("info");
  const { hash } = useLocation();
  useEffect(
    (_) => {
      hash && Tabs[hash.substr(1)] && setCurrentTab(hash.substr(1));
    },
    [hash]
  );
  return (
    <div className="profile">
      <div className="container">
        <h1 className="profile__title">Личный Кабинет</h1>
        <div className="profile__nav">
          {tabLinks.map((t, i) => (
            <CustomTabLink key={i} {...t} hash={hash} />
          ))}
        </div>
        <div className="profile__tab-view">
          {createElement(Tabs[currentTab], {})}
        </div>
      </div>
    </div>
  );
}
