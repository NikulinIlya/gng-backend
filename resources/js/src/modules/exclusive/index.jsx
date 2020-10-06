import React, { useState, useEffect } from "react";

import ExclusiveCard from "@/components/ExclusiveCard";
import useTranslate from "@/utils/useTranslate";

import "./exclusive.scss";

import data from "./static";

export default function Exclusive() {
    const { t } = useTranslate();
    return (
        <div className="container">
            <div className="exclusive">
                {data.map(d => (
                    <ExclusiveCard
                        key={d.name}
                        {...d}
                        name={t(d.nameSlug,d.name)}
                        description={t(d.descrSlug, d.description)}
                    />
                ))}
            </div>
        </div>
    );
}
