import React, { useState, useEffect } from "react";

import Button from "@/components/Button";

import useMeasures from "@/utils/useMeasures";

import "./filters.scss";

function Filtering({ onClose, renderFiltersBody }) {
    const { isMobile } = useMeasures();
    return (
        <article className="filters">
            <form>
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
                    <Button variant="gold" onClick={onClose}>
                        Применить
                    </Button>
                    <Button onClick={onClose}>Сбросить</Button>
                </div>
            </form>
        </article>
    );
}

export default Filtering;
