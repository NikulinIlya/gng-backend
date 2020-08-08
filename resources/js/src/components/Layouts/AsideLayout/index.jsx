import React, { useState, useEffect, createElement } from "react";
import cn from "classnames";

import Heading from "@/components/Heading";

import "./aside-layout.scss";

export default function AsideLayout({
    title,
    titleAs = "h1",
    renderAside,
    children
}) {
    return (
        <section
            className={cn("layout", { "layout--simplified": !renderAside })}
        >
            {title &&
                createElement(Heading, {
                    className: "layout__title",
                    as: titleAs,
                    children: title
                })}

            {renderAside && typeof renderAside === "function" && (
                <aside className="layout__aside">{renderAside()}</aside>
            )}

            <div className="layout__content">{children}</div>
        </section>
    );
}
