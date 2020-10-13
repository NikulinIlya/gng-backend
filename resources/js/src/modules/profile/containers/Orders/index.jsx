import React, { useState, useEffect } from "react";

import Order from "./components/OrderCard";

import compose from "@/utils/compose";
import withApi from "./hoc/withApi";

import "./orders.scss";

function Orders() {
    return (
        <div className="orders">
            {["success", "canceled", "process"].map((o, i) => (
                <Order key={i} status={o} />
            ))}
        </div>
    );
}

export default compose(withApi)(Orders);
