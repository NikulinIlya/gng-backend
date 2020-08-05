import React, { useState, useEffect, createElement } from "react";

export default function AsideLayout({
    title,
    titleAs = "h1",
    renderAside,
    children
}) {
    return (
        <section className="layout container">
            {title &&
                createElement(titleAs, {
                    className: "layout__title",
                    children: title
                })}
            <aside className="layout__aside">
                {renderAside &&
                    typeof renderAside === "function" &&
                    renderAside()}
            </aside>
            <div className="layout__content">{children}</div>
        </section>
    );
}
