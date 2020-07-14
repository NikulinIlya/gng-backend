import React, { useState, useEffect } from "react";

import ExclusiveCard from "@/components/ExclusiveCard";

import "./exclusive.scss";

import data from "./static";

export default function Exclusive() {
  return (
    <div className="container">
      <div className="exclusive">
        {data.map((d) => (
          <ExclusiveCard key={d.name} {...d} />
        ))}
      </div>
    </div>
  );
}
