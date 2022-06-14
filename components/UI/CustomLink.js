import classes from "./CustomLink.module.css";
import Link from "next/link";

const CustomLink = ({ children, type, href }) => {
  let className;

  if (type === "blue") {
    className = classes.LinkBlue;
  }

  if (type === "transparent") {
    className = classes.LinkTransparent;
  }

  return (
    <div className={className}>
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default CustomLink;
