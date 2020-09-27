import React, { useState, useEffect } from "react";

import Spinner from "@/components/Spinner";

import "./loading.scss";

export default function Loading({ fixed = false }) {
    return fixed ? <PageLoading /> : <SimpleLoading />;
}

function SimpleLoading() {
    return (
        <div className="loading">
            <Spinner />
        </div>
    );
}

function PageLoading() {
    return (
        <div className="loading-layout">
            <SimpleLoading />
        </div>
    );
}
