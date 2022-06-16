import classes from "./Button.module.css";
import { useRouter } from "next/router";

const Button = ({ children, type, onClick, active }) => {
  const router = useRouter();
  let className;
  let borderClass;

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

  if (active && router.pathname !== "/gallery") {
    borderClass = classes.BtnActive;
  }

  if (active && router.pathname === "/gallery") {
    borderClass = classes.BtnActivePink;
  }

  return (
    <button
      onClick={onClick}
      className={`${classes.Btn} ${className} ${borderClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
