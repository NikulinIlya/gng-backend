import React from "react";

import Button from "@/components/Button";

import "./empty-list.scss";

export default function EmptyList() {
    return (
        <div className="empty-list">
            <h3 className="empty-list__title">Nothing was found</h3>
            <p className="empty-list__description">
                Please try another filter or
            </p>
            <div className="empty-list__button">
                <Button to={location.pathname}>Reset all filters</Button>
            </div>
        </div>
    );
}
