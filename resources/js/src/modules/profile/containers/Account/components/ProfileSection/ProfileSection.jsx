import React from "react";

export default function ProfileSection({ title, children }) {
    return (
        <section className="account-section">
            {title && title()}
            <div className="account-section__content">{children}</div>
        </section>
    );
}
