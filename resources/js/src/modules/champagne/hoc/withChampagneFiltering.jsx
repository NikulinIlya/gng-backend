import React, { useState, useEffect } from "react";

export default WrappedComponent => props => {
    const { filters } = props;
    const [labeledFilters, setLabeledFilters] = useState({});

    return <WrappedComponent {...props} />;
};
