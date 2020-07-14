import React from "react";

import phoneIcon from "@/assets/images/icons/phone.svg";
import markerIcon from "@/assets/images/icons/marker.svg";
import ruFlagIcon from "@/assets/images/icons/ru-flag.svg";

import './info.scss'

const InfoLine = (_) => {
  return (
    <div className="info">
      <div className="container">
        <div className="info-container">
          <div className="contacts">
            <div className="info-item">
              <div className="info-item__icon">
                <img src={phoneIcon} alt="" />
              </div>
              <a className="info-item__text" href="tel:+79826555000">
                <span>8(982)655-50-00</span>
              </a>
            </div>
            <div className="info-item">
              <div className="info-item__icon">
                <img src={markerIcon} alt="" />
              </div>
              <span className="info-item__text">
                335 E Sandy Lake Rd undefined New Orleans, Georgia
              </span>
            </div>
          </div>
          <div className="lang">
            <div className="lang__code">RU</div>
            <div className="lang__flag">
              <img src={ruFlagIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoLine;
