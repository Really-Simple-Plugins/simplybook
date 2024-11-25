import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

// Map your icons to keys for easy referencing
const iconMap = {
  "square-arrow-up-right": faSquareArrowUpRight,
};

const Icon = ({ name, color = "black", size = "1x", className, ...props }) => {
  const icon = iconMap[name];

  if (!icon) {
    console.warn(`Icon "${name}" does not exist in iconMap.`);
    return null;
  }

  const classes = clsx("px-2", className);

  return <FontAwesomeIcon icon={icon} size={size} className={classes} {...props} />;
};

export default Icon;
