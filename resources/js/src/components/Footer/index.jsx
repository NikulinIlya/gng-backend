import React, { useState, useEffect } from "react";

import logo from "@/assets/images/footer-logo.svg";
import phone from "@/assets/images/icons/phone.svg";
import marker from "@/assets/images/icons/marker.svg";

import adult from "@/assets/images/icons/18plus.svg";

import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__common">
            <div className="footer__logo">
              <img src={logo} alt="" />
            </div>
            <div className="footer__contacts">
              <div className="contact-item phone">
                <img className="contact-item__icon" src={phone} alt="" />
                <a className="contact-item__value" href="">
                  8 (982) 655-50-00
                </a>
              </div>
              <div className="contact-item address">
                <img className="contact-item__icon" src={marker} alt="" />
                <p className="contact-item__value">
                  335 E Sandy Lake Rd undefined New Orleans, Georgia
                </p>
              </div>
            </div>
          </div>
          <div className="footer__links-grid">
            {["Покупателям", "Полезная информация", "О Grapes & Grain"].map(
              (_, i) => (
                <div className="links-col" key={i}>
                  <h4 className="links-col__title">{_}</h4>
                  <ul className="links-col__list">
                    <li className="links-col__item">
                      <a href="">Вино</a>
                    </li>
                    <li className="links-col__item">
                      <a href="">Шампанское и Игристое</a>
                    </li>
                    <li className="links-col__item">
                      <a href="">Крепкие напитки</a>
                    </li>
                    <li className="links-col__item">
                      <a href="">Аксессуары</a>
                    </li>
                    <li className="links-col__item">
                      <a href="">Частные мероприятия</a>
                    </li>
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="footer__copy">
        <div className="container">
          <Copy />
        </div>
      </div>
    </footer>
  );
}

function Copy() {
  return (
    <div className="footer-copy">
      <div className="copy__item copy__item--disclaimer">
        <img src={adult} alt="" />
        <span>Чрезмерное употребление алкоголя вредит вашему здоровью</span>
      </div>
      <div className="copy__item">
        <p>Grapes & Grains.com</p>
        <p>Все права защищены, 2020</p>
      </div>
    </div>
  );
}
