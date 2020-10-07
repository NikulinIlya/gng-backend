import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import ruFlagIcon from "@/assets/images/icons/ru-flag.png";
import enFlagIcon from "@/assets/images/icons/en-flag.png";

import { RU_LANG, ENG_LANG } from "@/store/client";

export default function Langs() {
    const { dispatch, lang } = useStoreon("lang");
    function onChange({ target }) {
        const { value } = target;
        console.log('value',value)
        dispatch("client/set-lang", value);
    }
    return (
        <div className="langs">
            <label className="lang">
                <input
                    type="radio"
                    name="lang"
                    defaultChecked={lang === RU_LANG}
                    value={RU_LANG}
                    onChange={onChange}
                    className="visually-hidden"
                />
                <span className="lang__code">RU</span>
                <div className="lang__flag">
                    <img src={ruFlagIcon} alt="" />
                </div>
            </label>
            <label className="lang">
                <input
                    type="radio"
                    name="lang"
                    defaultChecked={lang === ENG_LANG}
                    value={ENG_LANG}
                    onChange={onChange}
                    className="visually-hidden"
                />
                <span className="lang__code">EN</span>
                <div className="lang__flag">
                    <img src={enFlagIcon} alt="" />
                </div>
            </label>
        </div>
    );
}
