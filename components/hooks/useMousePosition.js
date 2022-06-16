import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, isHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.target.id !== "unique") return;
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const checkIfElementIsHovered = (ev) => {
      console.log(ev.currentTarget);
      if (ev.target.id === "unique") {
        isHovered(true);
        return;
      }
      isHovered(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", checkIfElementIsHovered);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", checkIfElementIsHovered);
    };
  }, []);

  return {
    mousePosition,
    hovered,
  };
};

export default useMousePosition;
