import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircle,
  faSquareArrowUpRight,
  faSpinner,
  faChevronDown,
    faChevronUp,
    faCheck,
    faInfoCircle,
    faTimes,
    faTrophy,
    faUserGroup,
    faEye,
    faBullhorn,
    faClock,
    faShoppingCart,
 } from "@fortawesome/free-solid-svg-icons";

// Map your icons to keys for easy referencing
const iconMap = {
    "square-arrow-up-right": faSquareArrowUpRight,
    "spinner": faSpinner,
    "chevron-down": faChevronDown,
    "chevron-up": faChevronUp,
    "check": faCheck,
    "info": faInfoCircle,
    "times": faTimes,
    "trophy": faTrophy,
    "user-group": faUserGroup,
    "eye": faEye,
    "bullhorn": faBullhorn,
    "clock": faClock,
    "circle": faCircle,
    "cart": faShoppingCart,
};

const Icon = ({ name, color = "black", size = "1x", className = "", ...props }) => {
  let icon = iconMap[name];


  if (!icon) {
    console.warn(`Icon "${name}" does not exist in iconMap.`);
    // set circle as default icon
    icon = faCircle;
  }

  return <FontAwesomeIcon
        icon={icon}
        size={size}
        spin={name === 'spinner'}
        className={className}
        style={{
            color,
            ...(name === 'spinner' && { animationDuration: '2s' }),
        }}
        {...props}
    />
};

export default Icon;
