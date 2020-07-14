import React, { useState, useEffect } from "react";

import "./disclaimer.scss";

export default function Disclaimer() {
  return (
    <div className="cart-footer">
      <p className="cart-disclaimer">
        В соответствии с Постановлением Правительства РФ от 27.09.2007 N 612
        (ред. от 30.11.2019) «Об утверждении Правил продажи товаров
        дистанционным способом» мы не продаем алкогольную продукцию онлайн.
      </p>
      <p className="cart-line">
        Ваш заказ вы можете забрать по адресу: 335 E Sandy Lake Rd undefined New
        Orleans, Georgia
      </p>
      <p className="cart-line">
        По вопросам оформления заказа вы можете связаться с нами по телефону: 8
        (982) 655-50-00
      </p>
    </div>
  );
}
