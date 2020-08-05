import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Info from "./components/InfoLine";

import { HeaderContext } from "@/context/header";
import SearchInput from "@/components/SearchInput";
import IconButton from "@/components/IconButton";
import useMeasures from "@/utils/useMeasures";
import useTranslate from "@/utils/useTranslate";

import logo from "@/assets/images/logo.svg";
import logoText from "@/assets/images/logo-text.svg";
import favoriteIcon from "@/assets/images/icons/heart.svg";
import cartIcon from "@/assets/images/icons/cart.svg";
import searchIcon from "@/assets/images/icons/search.svg";
import detailsIcon from "@/assets/images/icons/details.svg";

import "./header.scss";

const Header = () => {
    const [mobileNavVisibility, setMobileNavVisibility] = useState(false);
    const [mobileSearchVisibility, setMobileSearchVisibility] = useState(false);
    const { renderingComponent } = useContext(HeaderContext);
    const { isMobile } = useMeasures();
    const { t } = useTranslate();
    useEffect(
        _ => {
            if (isMobile)
                document.body.style.position = mobileNavVisibility
                    ? "fixed"
                    : "static";
        },
        [mobileNavVisibility, isMobile]
    );
    return (
        <header
            className={`header ${mobileNavVisibility ? "header--opened" : ""}`}
        >
            {!isMobile && <Info />}
            <div className="header__main">
                <div className="container">
                    <div className="header__inner">
                        <div className="logo">
                            <div className="logo-icon">
                                <img src={logo} alt="" />
                            </div>
                            {!isMobile && (
                                <div className="logo-text">
                                    <img src={logoText} alt="" />
                                </div>
                            )}
                            <Link to="/"></Link>
                        </div>
                        {!isMobile && (
                            <div className="header__render-container">
                                {/* Modules can render self components here */}
                                {renderingComponent ? (
                                    renderingComponent
                                ) : (
                                    <SearchInput />
                                )}
                            </div>
                        )}
                        <div className="header__nav">
                            {!isMobile && (
                                <div className="header__nav-item">
                                    <Link
                                        className="sign-in"
                                        to="?login=sign-in"
                                    >
                                        {t("sign-in", "Вход")}
                                    </Link>
                                    {"/"}
                                    <Link
                                        className="sign-up"
                                        to="?login=sign-up"
                                    >
                                        {t("sign-up", "Регистрация")}
                                    </Link>
                                </div>
                            )}
                            {isMobile && (
                                <div className="header__nav-item nav-item search-handler">
                                    <IconButton
                                        onClick={_ =>
                                            setMobileSearchVisibility(
                                                !mobileSearchVisibility
                                            )
                                        }
                                    >
                                        <img src={searchIcon} alt="" />
                                    </IconButton>
                                </div>
                            )}
                            {!isMobile && (
                                <div className="header__nav-item nav-item favorite">
                                    <div className="nav-item__icon">
                                        <img src={favoriteIcon} alt="" />
                                    </div>
                                    <Link to="/profile#favorite"></Link>
                                </div>
                            )}
                            <div className="header__nav-item nav-item">
                                <div className="nav-item__icon">
                                    <img src={cartIcon} alt="" />
                                </div>
                                <Link to="/cart"></Link>
                            </div>
                            {isMobile && (
                                <div className="header__nav-item nav-item menu-handler">
                                    <IconButton
                                        onClick={_ =>
                                            setMobileNavVisibility(
                                                !mobileNavVisibility
                                            )
                                        }
                                    >
                                        <img src={detailsIcon} alt="" />
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isMobile && mobileSearchVisibility && (
                <SearchInput iconVisibility={false} placeholder="Поиск" />
            )}
            {isMobile && mobileNavVisibility && (
                <div className="header__mobile-nav">
                    <div className="container">
                        <div className="mobile-nav__section">
                            <div className="mobile-nav__item">
                                <Link to="/about">О компании</Link>
                            </div>
                            <div className="mobile-nav__item">
                                <Link to="/static">
                                    Ответственное потребление
                                </Link>
                            </div>
                            <div className="mobile-nav__item">
                                <Link to="/contacts">Контакты</Link>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="mobile-nav__section">
                            <div className="mobile-nav__item">
                                <Link to="/profile#favorite">Избранное</Link>
                            </div>
                            <div className="mobile-nav__item">
                                <Link
                                    to="?login=sign-in"
                                    onClick={_ =>
                                        setMobileNavVisibility(
                                            !mobileNavVisibility
                                        )
                                    }
                                >
                                    {t("sign-in", "Вход")}
                                </Link>
                                /
                                <Link
                                    to="?login=sign-up"
                                    onClick={_ =>
                                        setMobileNavVisibility(
                                            !mobileNavVisibility
                                        )
                                    }
                                >
                                    {t("sign-up", "Регистрация")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Info />
                </div>
            )}
        </header>
    );
};

export default Header;
