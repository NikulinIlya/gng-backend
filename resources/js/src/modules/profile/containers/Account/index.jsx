import React, { useState, useEffect } from "react";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { TextField, Checkbox, Select } from "@/components/Input";

import useTranslate from "@/utils/useTranslate";

import "./account.scss";

export default function Account() {
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
                    <TextField label={t("name", "Имя")} />
                    <TextField label={t("second-name", "Фамилия")} />
                    <TextField label={t("", "Отчество")} />
                    <div className="fields-grid">
                        <TextField label={t("mob-number", "Телефон")} />
                        <TextField label="Email" />
                        <DateInput
                            label={t("date-of-birth", "Дата Рождения")}
                        />
                        <div className="fields-flex">
                            <h3 className="fields-flex__title">
                                {t("sex", "Пол")}
                            </h3>
                            <div className="fields-flex__body">
                                <Checkbox
                                    variant="square"
                                    label="Мужской"
                                    defaultChecked
                                />
                                <Checkbox variant="square" label="Женский" />
                            </div>
                        </div>
                    </div>
                    <Button>{t("save", "Сохранить")}</Button>
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
                        label={t("old-password", "Старый пароль")}
                        type="password"
                    />
                    <div className="fields-grid">
                        <TextField
                            label={t("new-password", "Новый пароль")}
                            type="password"
                        />
                        <TextField
                            label={t(
                                "confirm-new-password",
                                "Подтверждение нового пароля"
                            )}
                            type="password"
                        />
                    </div>
                    <Button>{t("save", "Сохранить")}</Button>
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
                        defaultChecked
                    />
                    <Checkbox
                        variant="square"
                        label={t(
                            "receive-information-about-upcoming-events",
                            "Получать информацию о предстоящих  мероприятиях"
                        )}
                        defaultChecked
                    />
                    <Button>{t("save", "Сохранить")}</Button>
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

function DateInput({ label = "Дата" }) {
    const days = Array.from({ length: 31 }).map((_, i) => ({
        text: ++i,
        value: ++i
    }));
    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ];
    const minYear = new Date().getFullYear() - 100;
    const maxYear = new Date().getFullYear() - 18;
    return (
        <div className="date">
            {label && <h3 className="date__title">{label}</h3>}
            <div className="date__body">
                <Select options={days} />
                <Select
                    options={months.map((m, i) => ({ text: m, value: i }))}
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
