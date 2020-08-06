import React, { useState, useEffect } from "react";

import AsideLayout from "@/components/Layouts/AsideLayout";
import BottleCard from "@/components/BottleCard";

import "./strong.scss";

export default function Strong() {
    return (
        <div className="strong container">
            <AsideLayout
                title={"Крепкие напитки"}
                renderAside={_ => (
                    <div className="strong__filters">
                        <ul>
                            <li>hello</li>
                        </ul>
                    </div>
                )}
            >
                <div className="strong__grid">
                    <BottleCard />
                    <BottleCard />
                    <BottleCard />
                </div>
            </AsideLayout>
        </div>
    );
}
