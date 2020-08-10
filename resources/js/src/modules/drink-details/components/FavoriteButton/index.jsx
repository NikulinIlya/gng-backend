import React, { useState, useEffect } from "react";

import defaultFav from "@/assets/images/icons/empty-heart.svg";
import containedFav from "@/assets/images/icons/contained-heart.svg";

import "./favorite-button.scss";

export default function FavoriteButton({ state, onChange }) {
    return (
        <label className="fav-btn">
            <input
                checked={state}
                onChange={onChange}
                type="checkbox"
                className="fav-btn__state visually-hidden"
            />
            <div className="fav-btn__custom-view">
                <img src={defaultFav} alt="" />
                <img src={containedFav} alt="" hidden />
            </div>
        </label>
    );
}
