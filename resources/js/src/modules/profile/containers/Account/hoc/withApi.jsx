import React, { useState, useEffect } from "react";
import fetch, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const updateInfo = async data => {
        return await to(fetch.put("/api/update-user-info", data));
    };

    const changePass = async data => {
        return await to(fetch.post("/api/password/reset", data));
    };

    return (
        <WrappedComponent
            {...props}
            updateInfo={updateInfo}
            changePass={changePass}
        />
    );
};
