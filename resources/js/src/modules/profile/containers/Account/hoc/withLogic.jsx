import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

export default WrappedComponent => props => {
    const { userInfo } = useStoreon("userInfo");
    return <WrappedComponent {...props} userInfo={userInfo} />;
};
