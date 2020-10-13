import React, { useState, useEffect, useRef } from "react";

import IconButton from "@/components/IconButton";

import useMeasures from "@/utils/useMeasures";
import useTranslate from "@/utils/useTranslate";

import { ReactComponent as CloseIcon } from "@/assets/images/icons/close-gold-icon.svg";

import "./modal.scss";

const setBodyFixed = state => {
    const body = document.body;
    if (state) {
        const scrollY = document.documentElement.style.getPropertyValue(
            "--scroll-y"
        );
        body.classList.add("fixed");
        body.style.top = `-${scrollY}`;
    } else {
        const scrollY = body.style.top;
        body.classList.remove("fixed");
        body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
};

export default function Modal({ children, onClose, closable = true }) {
    const { isMobile } = useMeasures();
    const cardRef = useRef(null);
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);
    const { t } = useTranslate();
    useEffect(
        _ => {
            const { current: card } = cardRef;
            setIsContentOverflowing(card.clientHeight > window.innerHeight);
        },
        [cardRef, children]
    );
    useEffect(_ => {
        setBodyFixed(true);
        return _ => setBodyFixed(false);
    }, []);

    const onCloseModal = _ => onClose && onClose();
    return (
        <div className="modal-overlay">
            <div
                className="modal-body container"
                style={{ display: isContentOverflowing ? "block" : "flex" }}
            >
                <div className="modal-card" ref={cardRef}>
                    {closable && (
                        <div className="modal-card__close">
                            {isMobile ? (
                                <button onClick={onCloseModal}>
                                    {t("close", "закрыть")}
                                </button>
                            ) : (
                                <IconButton onClick={onCloseModal}>
                                    <CloseIcon />
                                </IconButton>
                            )}
                        </div>
                    )}
                    {children}
                    <div style={{ height: 30, width: "100%" }}></div>
                </div>
            </div>
        </div>
    );
}
