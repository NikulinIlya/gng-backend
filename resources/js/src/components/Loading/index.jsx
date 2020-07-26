import React, { useState, useEffect } from "react";

import Spinner from "@/components/Spinner";

import "./loading.scss";

export default function Loading() {
    return (
        <div className="loading">
            <Spinner />
        </div>
    );
}
