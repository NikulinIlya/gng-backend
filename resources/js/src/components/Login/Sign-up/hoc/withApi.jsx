import React, { useState, useEffect } from "react";
import redaxios, { to } from "@/utils/fetch";
import axios from "axios";

import { status as REQUEST } from "@/utils/request-status";

export default WrappedComponent => props => {
    const [status, setStatus] = useState(REQUEST.success);

    const submitForm = async data => {
        setStatus(REQUEST.pending);
        await to(redaxios("/sanctum/csrf-cookie"));
        return await to(
            axios({
                url: "/register",
                method: "post",
                headers: { accept: "json", "Content-Type": "application/json" },
                data
            })
        );
    };

    return (
        <WrappedComponent
            {...props}
            status={status}
            setStatus={setStatus}
            submitForm={submitForm}
        />
    );
};
