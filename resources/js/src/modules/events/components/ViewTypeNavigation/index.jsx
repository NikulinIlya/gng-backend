import React, { useState, useEffect } from "react";

import { ReactComponent as ListIcon } from "@/assets/images/icons/list_icon.svg";
import { ReactComponent as CalendarIcon } from "@/assets/images/icons/calendar_icon.svg";

export default function ViewTypeNavigation({ onChange, defaultType = 'list' }) {
  return (
    <div className="view-type">
      <label className="view-type__case case">
        <input
          className="visually-hidden"
          type="radio"
          name="view-type"
          value="list"
          defaultChecked={defaultType === 'list'}
          onChange={({ target }) => onChange(target.value)}
        />
        <div className="case__icon">
          <ListIcon />
        </div>
        <span className="case__name">Список</span>
      </label>
      <label className="view-type__case case">
        <input
          className="visually-hidden"
          type="radio"
          name="view-type"
          value="calendar"
          defaultChecked={defaultType === 'calendar'}
          onChange={({ target }) => onChange(target.value)}
        />
        <div className="case__icon">
          <CalendarIcon />
        </div>
        <span className="case__name">Календарь</span>
      </label>
    </div>
  );
}
