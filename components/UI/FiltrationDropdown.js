import CrossSvg from "../../assets/images/CrossSvg";
import classes from "./FiltrationDropdown.module.css";
import { useState } from "react";

const FiltrationDropdown = ({ id, dropdownTitle, children, type }) => {
  const [active, setActive] = useState("0");

  const setActiveHandler = (_, id) => {
    console.log(id);
    setActive(active === id ? "" : id);
  };
  return (
    <div className={classes.FiltrationDropdown}>
      <div
        id={id}
        onClick={(ev) => setActiveHandler(ev, id)}
        className={`${active === id ? classes.FullOpacity : ""} ${
          classes.Dropdown
        }`}
      >
        <span className={`${active === id ? classes.TextWhite : ""}`}>
          {dropdownTitle}
        </span>
        <div className={`${active === id ? classes.Rotate : ""}`}>
          <CrossSvg />
        </div>
      </div>
      <div
        className={`${classes.Panel} ${
          active === id ? classes.Active : "non-active"
        } ${type === "multiple" && active === id ? classes.Multiple : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FiltrationDropdown;
