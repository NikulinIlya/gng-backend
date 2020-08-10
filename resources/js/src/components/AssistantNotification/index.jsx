import React, { useState, useEffect } from "react";

import IconButton from "@/components/IconButton";
import { ReactComponent as CloseIcon } from "@/assets/images/icons/close-gold-icon.svg";

import logo from "@/assets/images/logo-col-variant.svg";

import "./assistant.scss";

export default function AssistantNotification({ children, closable = true }) {
    return (
        <div className="notification">
            <div className="container notification__container">
                <div className="notification__logo">
                    <img src={logo} alt="" />
                </div>
                <div className="notification__body">{children}</div>
                {closable && (
                    <div className="notification__close">
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </div>
                )}
            </div>
        </div>
    );
}
