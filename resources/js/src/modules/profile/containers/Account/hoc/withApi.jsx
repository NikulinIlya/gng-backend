import React, { useState, useEffect } from "react";
import redaxios, { to } from "@/utils/fetch";
import axios from "axios";

import { status as REQUEST } from "@/utils/request-status";

export default WrappedComponent => props => {
    const [status, setStatus] = useState(REQUEST.success);

    const getUserInfo = async () => {
        await to(redaxios("/sanctum/csrf-cookie"));
        return await to(
            axios({
                url: "api/user-info",
                method: "get",
                headers: { accept: "json" }
            })
        );
    };

    return <WrappedComponent {...props} />;
};
