import React from "react";

import Button from "@/components/Button";

import "./not-found.scss";

export default function NotFound() {
    return (
        <div className="container">
            <section className="not-found">
                <div className="not-found__container">
                    <span className="not-found__heading">404</span>
                    <p className="not-found__description">
                        Adipisicing fugiat id sint sint nisi occaecat velit do
                        fugiat. Aute id repreh enderit laborum eu quis irure
                        irure. Aute id repreh enderit laborum eu quis irure
                        irure.
                    </p>
                    <div className="not-found__home">
                        <Button to="/">на главную страницу</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export function Noop() {
    return (
        <div className="container">
            <section className="not-found">
                <div className="not-found__container">
                    <span className="not-found__heading noop">Coming soon</span>
                    <p className="not-found__description">
                        This section will be available soon
                    </p>
                    <div className="not-found__home">
                        <Button to="/wines">Check out our Catalog</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
