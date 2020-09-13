export const status = {
    pending: "pending",
    success: "success",
    error: "error"
};

export const handleStatus = (dispatch, actionCreator) => statusValue => {
    if (statusValue && !status[statusValue])
        throw new Error(`Invalid request status value. Got "${statusValue}"`);
    dispatch(
        actionCreator
            ? actionCreator()
            : { type: "set-status", payload: statusValue }
    );
};
