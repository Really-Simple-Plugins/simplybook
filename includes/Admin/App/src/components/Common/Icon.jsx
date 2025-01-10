import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircle,
  faSquareArrowUpRight,
  faSpinner,
  faChevronDown,
    faChevronUp,
    faCheck,
 } from "@fortawesome/free-solid-svg-icons";

// Map your icons to keys for easy referencing
const iconMap = {
  "square-arrow-up-right": faSquareArrowUpRight,
  "spinner": faSpinner,
  "chevron-down": faChevronDown,
  "chevron-up": faChevronUp,
  "check": faCheck,
};

const Icon = ({ name, color = "black", size = "1x", className = "", ...props }) => {
  let icon = iconMap[name];


  if (!icon) {
    console.warn(`Icon "${name}" does not exist in iconMap.`);
    // set circle as default icon
    icon = faCircle;
  }



  return <FontAwesomeIcon icon={icon} size={size} className={className} {...props} />;
};

export default Icon;
