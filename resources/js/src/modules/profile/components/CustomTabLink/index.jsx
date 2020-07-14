import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./custom-tab-link.scss";

export default function CustomTabLink({ label, icon: Icon, id, hash }) {
  return (
    <div className="tab">
      <NavLink
        to={`#${id}`}
        className={hash === `#${id}` ? "active-tab" : ""}
      />
      <div className="tab__icon">
        <Icon />
      </div>
      <span className="tab__label">{label}</span>
    </div>
  );
}
