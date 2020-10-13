import React, { useEffect } from "react";
import { useStoreon } from "storeon/react";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { TextField, Checkbox, Select } from "@/components/Input";
import {
    monthNames,
    monthNamesEn
} from "@/modules/events/components/CalendarView/calendar-helpers";

import useTranslate from "@/utils/useTranslate";
import compose from "@/utils/compose";

import { withApi, withLogic } from "./hoc";

import "./account.scss";

function Account({ userInfo }) {
    const { t } = useTranslate();
    return (
        <div className="account">
            <ProfileSection
                title={_ => (
                    <Heading className="account-section-heading">
                        {t("personal-data", "Персональные данные")}
                    </Heading>
                )}
            >
                <form className="personal-info">
                    <TextField
                        label={t("name", "Имя")}
                        disabled
                        value={userInfo.name}
                    />
                    <TextField
                        label={t("second-name", "Фамилия")}
                        value={userInfo.second_name}
                        disabled
                    />
                    <div className="fields-grid">
                        <TextField
                            label={t("mob-number", "Телефон")}
                            value={userInfo.phone}
                            disabled
                        />
                        <TextField
                            label="Email"
                            disabled
                            value={userInfo.email}
                        />
                        {/* <DateInput
                            // TODO: FIX
                            lang={localStorage.getItem("lang")}
                            label={t("date-of-birth", "Дата Рождения")}
                        />
                        <div className="fields-flex">
                            <h3 className="fields-flex__title">
                                {t("sex", "Пол")}
                            </h3>
                            <div className="fields-flex__body">
                                <Checkbox
                                    variant="square"
                                    label={t("male", "Мужской")}
                                    defaultChecked
                                />
                                <Checkbox
                                    variant="square"
                                    label={t("female", "Женский")}
                                />
                            </div>
                        </div> */}
                    </div>
                    <Button disabled>{t("save", "Сохранить")}</Button>
                </form>
            </ProfileSection>

            <ProfileSection
                title={_ => (
                    <Heading className="account-section-heading">
                        {t("change-password", "Изменить пароль")}
                    </Heading>
                )}
            >
                <form className="password">
                    <TextField
                        disabled
                        label={t("old-password", "Старый пароль")}
                        type="password"
                    />
                    <div className="fields-grid">
                        <TextField
                            disabled
                            label={t("new-password", "Новый пароль")}
                            type="password"
                        />
                        <TextField
                            disabled
                            label={t(
                                "confirm-new-password",
                                "Подтверждение нового пароля"
                            )}
                            type="password"
                        />
                    </div>
                    <Button disabled>{t("save", "Сохранить")}</Button>
                </form>
            </ProfileSection>

            <ProfileSection
                title={_ => (
                    <Heading className="account-section-heading">
                        {t("notifications", "Оповещения")}
                    </Heading>
                )}
            >
                <form className="notifications">
                    <Checkbox
                        variant="square"
                        label={t(
                            "receive-news-and-offers-by-e-mail",
                            "Получать новости и выгодные предложения на e-mail"
                        )}
                        checked={userInfo.discount_agreed}
                    />
                    <Checkbox
                        variant="square"
                        checked={userInfo.events_agreed}
                        label={t(
                            "receive-information-about-upcoming-events",
                            "Получать информацию о предстоящих  мероприятиях"
                        )}
                    />
                    <Button disabled>{t("save", "Сохранить")}</Button>
                </form>
            </ProfileSection>
        </div>
    );
}

function ProfileSection({ title, children }) {
    return (
        <section className="account-section">
            {title && title()}
            <div className="account-section__content">{children}</div>
        </section>
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
