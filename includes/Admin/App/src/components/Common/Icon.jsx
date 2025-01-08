import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircle,
  faSquareArrowUpRight,
    faSpinner,

 } from "@fortawesome/free-solid-svg-icons";

// Map your icons to keys for easy referencing
const iconMap = {
  "square-arrow-up-right": faSquareArrowUpRight,
  "spinner": faSpinner,
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
