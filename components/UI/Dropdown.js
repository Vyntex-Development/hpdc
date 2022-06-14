import CrossSvg from "../../assets/images/CrossSvg";
import classes from "./Dropdown.module.css";

const Dropdown = ({ id, dropdownText, panelText, onActive, active, color }) => {
  return (
    <div>
      <div
        id={id}
        onClick={(ev) => onActive(ev, id)}
        className={`${active === id ? classes.FullOpacity : ""} ${
          classes.Dropdown
        }`}
      >
        <div
          style={{ backgroundColor: `${color}` }}
          className={classes.Color}
        ></div>
        <span className={`${active === id ? classes.TextWhite : ""}`}>
          {dropdownText}
        </span>
        <div className={`${active === id ? classes.Rotate : ""}`}>
          <CrossSvg />
        </div>
      </div>
      <div
        className={`${classes.Panel} ${
          active === id ? classes.Active : "non-active"
        }`}
      >
        <p>{panelText}</p>
      </div>
    </div>
  );
};

export default Dropdown;
