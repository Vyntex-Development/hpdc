import classes from "./CustomLink.module.css";
import Link from "next/link";

const CustomLink = ({ children, type, href, onClick }) => {
  let className;

  if (type === "blue") {
    className = classes.LinkBlue;
  }

  if (type === "transparent") {
    className = classes.LinkTransparent;
  }

  return (
    <div className={className} onClick={onClick}>
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default CustomLink;
