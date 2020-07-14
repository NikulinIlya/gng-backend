import React, { useState, useEffect, useRef } from "react";

import IconButton from "@/components/IconButton";

import useMeasures from "@/utils/useMeasures";

import { ReactComponent as CloseIcon } from "@/assets/images/icons/close-gold-icon.svg";

import "./modal.scss";

const setBodyFixed = (state) =>
  state
    ? document.body.classList.add("fixed")
    : document.body.classList.remove("fixed");

export default function Modal({ children, onClose, closable = true }) {
  const { isMobile } = useMeasures();
  const cardRef = useRef(null);
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  useEffect(
    (_) => {
      const { current: card } = cardRef;
      setIsContentOverflowing(card.clientHeight > window.innerHeight);
    },
    [cardRef,children]
  );
  useEffect((_) => {
    setBodyFixed(true);
    return (_) => setBodyFixed(false);
  }, []);

  const onCloseModal = (_) => onClose && onClose();
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
                <button onClick={onCloseModal}>закрыть</button>
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
