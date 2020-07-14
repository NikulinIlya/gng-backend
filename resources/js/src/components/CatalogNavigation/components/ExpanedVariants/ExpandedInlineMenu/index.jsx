import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import data from "./static";

import "./expanded-inline.scss";

export default function ExpandedInlineMenu({ onChangeState }) {
  return (
    <ul className="expanded-inline">
      {data.map(({ label, to }) => (
        <li className="expanded-inline__item" key={label}>
          <Link to={to} onClick={_ => onChangeState(false)}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}
