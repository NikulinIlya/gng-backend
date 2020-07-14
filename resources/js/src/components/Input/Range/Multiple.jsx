import React, { useState, useEffect } from "react";

function MultipleRange({ min = 1, max = 100, defaultRange = [50, 50] }) {
  const [range, setRange] = useState(defaultRange);
  const [normalizedRange, setNormalized] = useState((_) => [
    Math.min(...range),
    Math.max(...range),
  ]);
  useEffect(() => setNormalized([Math.min(...range), Math.max(...range)]), [
    range,
  ]);
  // useEffect((_) => console.log("normalizedRange", normalizedRange), [
  //   normalizedRange,
  // ]);
  return (
    <div className="multiple-range">
      <div className="multiple-range__values">
        <input
          type="number"
          min={min}
          max={range[1]}
          value={normalizedRange[0]}
          onChange={({ target }) => setRange([+target.value, range[1]])}
        />
        <span>-</span>
        <input
          type="number"
          min={range[0]}
          max={max}
          value={normalizedRange[1]}
          onChange={({ target }) => setRange([range[0], +target.value])}
        />
      </div>
      <div className="multiple-range__input">
        <input
          min={min}
          max={max}
          type="range"
          className={"input-range"}
          value={range[0]}
          onChange={({ target }) => setRange([+target.value, range[1]])}
        />
        <input
          min={min}
          max={max}
          type="range"
          className={"input-range"}
          value={range[1]}
          onChange={({ target }) => setRange([range[0], +target.value])}
        />
      </div>
    </div>
  );
}

export default MultipleRange;
