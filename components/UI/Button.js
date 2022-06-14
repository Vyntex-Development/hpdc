import classes from "./Button.module.css";

const Button = ({ children, type, onClick, active }) => {
  let className;

  if (type === "transparent") {
    className = classes.BtnTransparent;
  }

  if (type === "blue") {
    className = classes.BtnBlue;
  }

  if (type === "filter") {
    className = classes.BtnFilter;
  }

  if (type === "hide-filters") {
    className = classes.BtnHideFilters;
  }

  return (
    <button
      onClick={onClick}
      className={`${classes.Btn} ${className} ${
        active ? classes.BtnActive : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
