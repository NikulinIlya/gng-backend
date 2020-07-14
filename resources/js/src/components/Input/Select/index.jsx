import React, { useState, useEffect } from "react";

import "./select.scss";

export default function Select({ options = [], label = "" }) {
  return (
    <label className="select">
      {label && <span className="select__label">{label}</span>}
      <select className="select__input">
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </label>
  );
}
