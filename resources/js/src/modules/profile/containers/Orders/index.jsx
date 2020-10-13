import React, { useState, useEffect } from "react";

import Order from "./components/OrderCard";
import Loading from "@/components/Loading";

import compose from "@/utils/compose";
import withApi from "./hoc/withApi";

import { status as REQUEST } from "@/utils/request-status";

import "./orders.scss";

function Orders({ orders, status }) {
    return (
        <div className="orders">
            {status === REQUEST.pending ? (
                <Loading />
            ) : (
                orders.map(order => <Order key={order.id} {...order} />)
            )}
        </div>
    );
}

export default compose(withApi)(Orders);
