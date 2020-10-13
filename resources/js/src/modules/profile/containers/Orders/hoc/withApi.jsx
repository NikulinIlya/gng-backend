import React, { useState, useEffect } from "react";
import redaxios, { to } from "@/utils/fetch";
import axios from "axios";

import { status as REQUEST } from "@/utils/request-status";

const statuses = {
    1: "process",
    2: "success",
    3: "canceled"
};

export default WrappedComponent => props => {
    const [status, setStatus] = useState(REQUEST.pending);
    const [orders, setOrders] = useState([]);
    useEffect(_ => {
        (async _ => {
            const [err, res] = await to(
                axios({
                    url: "/api/orders",
                    method: "get",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
            );

            if (res) {
                setOrders(
                    res.data.map(ord => ({
                        ...ord,
                        date: new Date(ord.created_at),
                        status: statuses[ord.order_status_id]
                            ? statuses[ord.order_status_id]
                            : statuses[1]
                    }))
                );
            }

            setStatus(REQUEST.success);

            console.log("orders", res);
        })();
    });

    return <WrappedComponent {...props} orders={orders} status={status} />;
};
