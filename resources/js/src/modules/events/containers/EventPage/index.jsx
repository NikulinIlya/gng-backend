import React, { useState, useEffect } from "react";

import ProductCounter from "@/components/ProductCounter";
// import ProductFeature from "@/components/ProductFeature";
// import Heading from "@/components/Heading";
import Loading from "@/components/Loading";

import { status as REQUEST } from "@/utils/request-status";
import compose from "@/utils/compose";

import { withApi, withLogic } from "./hoc";

import "./event-page.scss";

function EventPage({ eventInstance = {}, status }) {
    if (status === REQUEST.pending) return <Loading />;
    const {
        day,
        month,
        year,
        time,
        address,
        name,
        main_image,
        description,
        price
    } = eventInstance;
    return (
        <div className="event-page">
            <div className="container">
                <div className="event-page__details">
                    <div className="event-page__image">
                        <img src={main_image} alt="" />
                    </div>
                    <div className="event-page__info event-info">
                        <h1 className="event-info__name">{name}</h1>
                        <p className="event-info__place">{address}</p>
                        <p className="event-info__date">{`${day} ${month}, ${year} / ${time}`}</p>
                        <p className="event-info__description">{description}</p>
                        <div className="event-calc">
                            <ProductCounter
                                title="Бронирование мест"
                                price={price}
                                label={_ => (
                                    <span className="event-calc__label">
                                        стоимость за 1 человека
                                    </span>
                                )}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="event-page__additional">
                    <Heading>О мероприятии</Heading>
                    <ul className="event-page__char-list">
                        {[
                            {
                                name: "Производитель",
                                value: "Cloudy Bay",
                                icon: "flag"
                            },
                            {
                                name: "Регион",
                                value: "Новая Зеландия, Мальборо",
                                icon: "marker"
                            },
                            {
                                name: "Lorem Ipsum",
                                value: "8 - 10°C",
                                icon: "wineglass"
                            },
                            {
                                name: "Виноград",
                                value: "Sauvignon Blanc",
                                icon: "grape"
                            }
                        ].map((f, i) => (
                            <li
                                className="event-page__char-item char-item"
                                key={i}
                            >
                                <ProductFeature {...f} />
                            </li>
                        ))}
                    </ul>
                </div> */}
                {/* <div className="event-page__thumbs">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div className="event-page__thumbs-item" key={i}>
                            <img
                                src={require(`@/assets/images/templates/event-page-${++i}.png`)}
                                alt=""
                            />
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}

export default compose(withApi, withLogic)(EventPage);
