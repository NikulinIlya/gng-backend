import React, { useState, useEffect } from "react";

// import ExclusiveCard from "@/components/ExclusiveCard";
import { Noop } from "@/components/NotFound";
// import useTranslate from "@/utils/useTranslate";

import "./accessories.scss";

// import data from "./static";

export default function Exclusive() {
    // const { t } = useTranslate();
    return (
        <div className="container">
            <Noop />
            {/* <div className="exclusive">
                {data.map(d => (
                    <ExclusiveCard
                        key={d.name}
                        {...d}
                        description={t(d.descrSlug, d.description)}
                    />
                ))}
            </div> */}
        </div>
    );
}
