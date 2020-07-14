import React from "react";

import IconButton from "@/components/IconButton";

import burgerIcon from "@/assets/images/icons/burger.svg";
import closeIcon from "@/assets/images/icons/close-gold.svg";

function Burger({ state = false, ...buttonProps }) {
  return (
    <IconButton {...buttonProps}>
      {state ? (
        <img src={closeIcon} alt="" key="close" />
      ) : (
        <img src={burgerIcon} alt="" key="burger" />
      )}
    </IconButton>
  );
}

export default Burger;
