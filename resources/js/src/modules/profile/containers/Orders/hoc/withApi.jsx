import React, { useState, useEffect } from "react";
import redaxios, { to } from "@/utils/fetch";
import axios from "axios";

import { status as REQUEST } from "@/utils/request-status";

export default WrappedComponent => props => {
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
            console.log("orders", res);
        })();
    });

    return <WrappedComponent {...props} />;
};
