import React from "react";
import { NavLink } from "react-router-dom";

import useTranslate from "@/utils/useTranslate";

import "./custom-tab-link.scss";

export default function CustomTabLink({ label, labelSlug, icon: Icon, id, hash }) {
    const { t } = useTranslate();
    return (
        <div className="tab">
            <NavLink
                to={`#${id}`}
                className={hash === `#${id}` ? "active-tab" : ""}
            />
            <div className="tab__icon">
                <Icon />
            </div>
            <span className="tab__label">{t(labelSlug, label)}</span>
        </div>
    );
}
