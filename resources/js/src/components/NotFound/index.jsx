import React from "react";

import Button from "@/components/Button";

import useTranslate from "@/utils/useTranslate";

import "./not-found.scss";

export default function NotFound() {
    const { t } = useTranslate();
    return (
        <div className="container">
            <section className="not-found">
                <div className="not-found__container">
                    <span className="not-found__heading">404</span>
                    <p className="not-found__description">
                        {t("nothing-was-found", "Ничего не найдено")}
                    </p>
                    <div className="not-found__home">
                        <Button to="/">
                            {t("to-home", "на главную страницу")}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export function Noop() {
    const { t } = useTranslate();
    return (
        <div className="container">
            <section className="not-found">
                <div className="not-found__container">
                    <span className="not-found__heading noop">
                        {t("coming-soon", "Coming soon")}
                    </span>
                    <p className="not-found__description">
                        {t(
                            "this-section-will-be-available-soon",
                            "Этот раздел скоро появится"
                        )}
                    </p>
                    <div className="not-found__home">
                        <Button to="/wines">
                            {t("check-out-our-catalog", "Перейти к каталогу")}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
