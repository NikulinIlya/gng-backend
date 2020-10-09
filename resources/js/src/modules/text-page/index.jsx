import React, { useState, useEffect } from "react";

import compose from "@/utils/compose";
import isEmpty from "@/utils/is-empty";
import { status as REQUEST } from "@/utils/request-status";

import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";

import withApi from "./hoc/withApi";

import "./text-page.scss";

function StaticPage({ text, status }) {
    if (status === REQUEST.pending) return <Loading />;
    return (
        <div className="static-page">
            {[REQUEST.success, REQUEST.error].includes(status) &&
                isEmpty(text) && <NotFound />}
            {status === REQUEST.success && !isEmpty(text) && (
                <>
                    <img
                        src={text.image}
                        alt=""
                        className="static-page__main-img"
                    />
                    <div className="container">
                        <>
                            <h1 className="static-page__title">{text.name}</h1>
                            {text.text.split("\n").map((_, i) => (
                                <p key={i}>{_}</p>
                            ))}
                        </>
                    </div>
                </>
            )}
        </div>
    );
}

export default compose(withApi)(StaticPage);
