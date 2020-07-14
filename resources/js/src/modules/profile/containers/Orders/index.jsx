import React, { useState, useEffect } from "react";

import Order from "./components/OrderCard";

import "./orders.scss";

export default function Orders() {
  return (
    <div className="orders">
      {["success", "canceled", "process"].map((o, i) => (
        <Order key={i} status={o} />
      ))}
    </div>
  );
}
