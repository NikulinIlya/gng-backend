import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useTranslate from "@/utils/useTranslate"

import data from "./static";

import "./expanded-inline.scss";

export default function ExpandedInlineMenu({ onChangeState }) {
  const {t} = useTranslate()
  return (
    <ul className="expanded-inline">
      {data.map(({ label, labelSlug, to }) => (
        <li className="expanded-inline__item" key={label}>
          <Link to={to} onClick={_ => onChangeState(false)}>{t(labelSlug,label)}</Link>
        </li>
      ))}
    </ul>
  );
}
