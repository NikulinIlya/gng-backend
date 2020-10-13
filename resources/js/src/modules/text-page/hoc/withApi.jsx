import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { status as REQUEST } from "@/utils/request-status";
import { createApiService } from "@/utils/api-services";

const fetchTexts = createApiService("/api/about-info");

export default WrappedComponent => props => {
    const [status, setStatus] = useState(REQUEST.pending);
    const [text, setText] = useState({});
    const location = useLocation();

    useEffect(
        _ => {
            (async _ => {
                const urlParams = new URLSearchParams(location.search);

                if (!urlParams.has("doc")) {
                    setStatus(REQUEST.error);
                    return;
                }
                window.scrollTo({ top: 0 });
                setText(await loadText(`/${urlParams.get("doc")}`));
            })();
        },
        [location.search]
    );

    const loadText = async (search = "") => {
        setStatus(REQUEST.pending);
        const [err, response] = await fetchTexts({ search });
        if (err) return setStatus(REQUEST.error);
        setStatus(REQUEST.success);
        return response.data[0];
    };

    return <WrappedComponent {...props} text={text} status={status} />;
};
