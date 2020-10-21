import React, { useState } from "react";
import fetch, { to } from "@/utils/fetch";

import { status as REQUEST } from "@/utils/request-status";

export default WrappedComponent => props => {
    const [status, setStatus] = useState(REQUEST.success);

    const createOrder = async data => {
        setStatus(REQUEST.pending);
        return await to(fetch.post("/api/orders/create", data));
    };
    return (
        <WrappedComponent
            {...props}
            status={status}
            setStatus={setStatus}
            createOrder={createOrder}
        />
    );
};
