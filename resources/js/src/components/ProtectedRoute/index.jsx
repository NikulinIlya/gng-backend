import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { useStoreon } from "storeon/react";

export default function ProtectedRoute({ component: Component, ...restProps }) {
    const { dispatch, isAuthorized } = useStoreon("isAuthorized");
    const { pathname } = useLocation();
    
    useEffect(
        _ => {
            if (!isAuthorized) dispatch("client/set-pending-route", pathname);
        },
        [isAuthorized]
    );

    return isAuthorized ? (
        <Route {...restProps} component={Component} />
    ) : (
        <Redirect to="/?login=sign-in" />
    );
}
