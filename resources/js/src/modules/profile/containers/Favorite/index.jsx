import React, { useState, useEffect } from "react";

import BottleCard from "@/components/BottleCard";

import "./favorite.scss";

export default function Favorite() {
  return (
    <div className="favorite">
      <div className="container">
        <div className="favorite__list">
          {Array.from({ length: 4 }).map((p, i) => (
            <BottleCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
