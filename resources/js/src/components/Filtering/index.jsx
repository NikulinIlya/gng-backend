import React, { useState, useEffect, useRef } from "react";

import Button from "@/components/Button";

import useMeasures from "@/utils/useMeasures";
import useTranslate from "@/utils/useTranslate";

import "./filters.scss";

function Filtering({ onClose, onSubmit, onReset, renderFiltersBody }) {
    const { isMobile } = useMeasures();
    const { t } = useTranslate();
    const formRef = useRef(null);
    const onSubmitFilters = e => {
        e.preventDefault();
        onSubmit();
    };
    const onResetFilters = e => {
        e.preventDefault();
        Array.from(formRef.current.elements).forEach(
            el => el.checked && (el.checked = false)
        );
        onReset();
    };
    return (
        <article className="filters">
            <form ref={formRef}>
                {isMobile && (
                    <div className="filters__head">
                        <button
                            className="filters__hide"
                            type="button"
                            onClick={onClose}
                        >
                            Скрыть фильтр
                        </button>
                    </div>
                )}
                {renderFiltersBody &&
                    typeof renderFiltersBody === "function" && (
                        <div className="filters__body">
                            {renderFiltersBody()}
                        </div>
                    )}

                <div className="filters__footer">
                    <Button variant="gold" onClick={onSubmitFilters}>
                        {t("apply", "Применить")}
                    </Button>
                    <Button onClick={onResetFilters} type="reset">
                        {t("reset", "Сбросить")}
                    </Button>
                </div>
            </form>
        </article>
    );
}

export default Filtering;
