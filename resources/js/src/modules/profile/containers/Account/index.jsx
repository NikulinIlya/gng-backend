import React from "react";

import {
    monthNames,
    monthNamesEn
} from "@/modules/events/components/CalendarView/calendar-helpers";

import compose from "@/utils/compose";

import CommonInfoForm from "./components/CommonInfoForm/CommonInfoForm";
import PassForm from "./components/PassForm/PassForm";
import AgreementsForm from "./components/AgreementsForm/AgreementsForm";

import { withApi, withLogic } from "./hoc";

import "./account.scss";

function Account({ updateInfo, changePass }) {
    return (
        <div className="account">
            <CommonInfoForm updateInfo={updateInfo} />
            <PassForm changePass={changePass} />
            <AgreementsForm updateInfo={updateInfo} />
        </div>
    );
}

function DateInput({ label = "Дата", lang = "ru" }) {
    const days = Array.from({ length: 31 }).map((_, i) => ({
        text: ++i,
        value: ++i
    }));
    const minYear = new Date().getFullYear() - 100;
    const maxYear = new Date().getFullYear() - 18;
    const localizedMonthNames = lang === "en" ? monthNamesEn : monthNames;
    return (
        <div className="date">
            {label && <h3 className="date__title">{label}</h3>}
            <div className="date__body">
                <Select options={days} />
                <Select
                    options={localizedMonthNames.map((m, i) => ({
                        text: m,
                        value: i
                    }))}
                />
                <Select
                    options={Array.from({ length: maxYear - minYear }).map(
                        (_, i) => ({
                            text: maxYear - i,
                            value: maxYear - i
                        })
                    )}
                />
            </div>
        </div>
    );
}

export default compose(withApi, withLogic)(Account);
