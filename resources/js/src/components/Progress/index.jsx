import React, { useState, useEffect } from "react";

import './progress.scss'

export default function Progress({ value = 50, label = "" }) {
  return (
    <div className="progress">
      {label && <div className="progress__label">{label}</div>}
      <div className="progress__value">
        <progress value={value} max="100" min="1"></progress>
      </div>
    </div>
  );
}
