import React, { useState, useEffect } from "react";
import fetch, { to } from "@/utils/fetch";

import { status as REQUEST } from "@/utils/request-status";

export default WrappedComponent => props => {
    const [status, setStatus] = useState(REQUEST.success);

    const updateInfo = async data => {
        setStatus(REQUEST.pending);
        const [err, response] = await to(
            fetch.put("/api/update-user-info", data)
        );
        setStatus(REQUEST.success);
    };

    return (
        <WrappedComponent {...props} updateInfo={updateInfo} status={status} />
    );
};
