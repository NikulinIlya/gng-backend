import React from "react";

import Button from "@/components/Button";

import useTranslate from "@/utils/useTranslate";

import "./empty-list.scss";

export default function EmptyList() {
    const { t } = useTranslate();
    return (
        <div className="empty-list">
            <h3 className="empty-list__title">
                {t("nothing-was-found", "Nothing was found")}
            </h3>
            <p className="empty-list__description">
                {t(
                    "please-try-another-filter-or",
                    "Please try another filter or"
                )}
            </p>
            <div className="empty-list__button">
                <Button to={location.pathname}>
                    {t("reset-all-filters", "Reset all filters")}
                </Button>
            </div>
        </div>
    );
}
