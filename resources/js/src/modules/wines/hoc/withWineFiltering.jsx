import React, { useState, useEffect } from "react";

export default WrappedComponent => props => {
    return <WrappedComponent {...props} />;
};
