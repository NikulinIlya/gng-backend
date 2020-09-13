import React, { useState, useEffect, useMemo } from "react";

import { status as REQUEST, handleStatus } from "@/utils/request-status";

export default (dispatch, actionCreator) => {
    const statusHandler = useMemo(_ => handleStatus(dispatch, actionCreator), [
        dispatch,
        actionCreator
    ]);
    return statusHandler;
};
