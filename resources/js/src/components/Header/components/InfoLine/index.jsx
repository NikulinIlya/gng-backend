import React from "react";

import phoneIcon from "@/assets/images/icons/phone.svg";
import markerIcon from "@/assets/images/icons/marker.svg";

import useTranslate from "@/utils/useTranslate";

import Langs from "../Langs";

import "./info.scss";

const InfoLine = _ => {
    const { t } = useTranslate();
    return (
        <div className="info">
            <div className="container">
                <div className="info-container">
                    <div className="contacts">
                        <div className="info-item">
                            <div className="info-item__icon">
                                <img src={phoneIcon} alt="" />
                            </div>
                            <a
                                className="info-item__text"
                                href="tel:+79826555000"
                            >
                                <span>{t('7-982-655-50-00','+7-982-655-50-00')}</span>
                            </a>
                        </div>
                        <div className="info-item">
                            <div className="info-item__icon">
                                <img src={markerIcon} alt="" />
                            </div>
                            <span className="info-item__text">
                                {t(
                                    "g-moskva-ul-seleznevskaya-dom-19-2",
                                    "г. Москва,  ул. Селезневская , дом 19/2"
                                )}
                            </span>
                        </div>
                    </div>
                    <Langs />
                </div>
            </div>
        </div>
    );
};

export default InfoLine;
