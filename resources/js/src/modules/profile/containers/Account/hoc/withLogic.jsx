import React, { useState, useEffect, useReducer } from "react";

export default WrappedComponent => props => {
    return <WrappedComponent {...props} />;
};
