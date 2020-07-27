import React from "react";

import IconButton from "@/components/IconButton";

import burgerIcon from "@/assets/images/icons/burger.svg";
import closeIcon from "@/assets/images/icons/close-gold.svg";

function Burger({ state = false, ...buttonProps }) {
    return (
        <IconButton {...buttonProps}>
            <div style={{ minWidth: 28, display: 'flex', alignItems: 'center' }}>
                {state ? (
                    <img src={closeIcon} alt="" key="close" />
                ) : (
                    <img src={burgerIcon} alt="" key="burger" />
                )}
            </div>
        </IconButton>
    );
}

export default Burger;
