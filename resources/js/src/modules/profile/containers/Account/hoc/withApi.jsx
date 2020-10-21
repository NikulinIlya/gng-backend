import React, { useState, useEffect } from "react";
import fetch, { to } from "@/utils/fetch";

import { status as REQUEST } from "@/utils/request-status";

export default WrappedComponent => props => {
    const [status, setStatus] = useState(REQUEST.success);

    const updateInfo = async () => {
        const [err, response] = await to(
            fetch.put("/api/update-user-info", {name: 'updated name'})
        );
    };

    return <WrappedComponent {...props} updateInfo={updateInfo} />;
};
