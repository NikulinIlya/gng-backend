import React, { useState, useEffect } from "react";

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

                {isMobile && (
                    <div className="filters__footer">
                        <button className="filters__submit" onClick={onClose}>
                            Применить
                        </button>
                        <button className="filters__reset" onClick={onClose}>
                            Сбросить
                        </button>
                    </div>
                )}
            </form>
        </article>
    );
}

export default Filtering;
