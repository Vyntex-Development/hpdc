import React, { useCallback, useEffect, useState, useRef } from "react";
import classes from "./MultiRangeSlider.module.css";

const MultiRangeSlider = ({
  min,
  max,
  onChange,
  minValue,
  maxValue,
  onSetRangeElement,
  step,
}) => {
  const [minVal, setMinVal] = useState(minValue);
  const [maxVal, setMaxVal] = useState(maxValue);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    if (maxVal > max || minVal < min) return;
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  //   ${classes["thumb--zindex-5"] ? minVal > max - 100 : ""}
  return (
    <div className={classes.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        step={step}
        onChange={(event) => {
          let decrementValue = step === "0.1" ? 0.1 : 1;
          const value = Math.min(+event.target.value, maxVal - decrementValue);
          console.log(value);
          setMinVal(value);
          event.target.value = value.toString();
          onSetRangeElement(event, "from");
        }}
        className={`${classes["thumb"]} ${classes["thumb--zindex-3"]} 
        `}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        step={step}
        onChange={(event) => {
          let decrementValue = step === "0.1" ? 0.1 : 1;
          const value = Math.max(+event.target.value, minVal + decrementValue);
          setMaxVal(value);
          event.target.value = value.toString();
          onSetRangeElement(event, "to");
        }}
        className={`${classes["thumb"]} ${classes["thumb--zindex-4"]}`}
      />

      <div className={classes.slider}>
        <div className={classes["slider__track"]} />
        <div ref={range} className={classes["slider__range"]} />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
