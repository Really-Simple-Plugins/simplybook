import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/**
 * Import the icon packages you want to use
 * Look at https://docs.fontawesome.com/web/use-with/react/add-icons for more information
 *
 * the authentication for FA is in the .npmrc which should only
 * be visible local and not pushed to main/production
 */
import {
  fas,
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
  faSupport,
  faShoppingCart,
  faCircleCheck,
  faCircleXmark,
  faArrowUpRightFromSquare,
  faLinesLeaning,
  faTriangleExclamation,
  faCircleExclamation
 } from "@fortawesome/free-solid-svg-icons";

 import { 
  faGlobe,
  faFileSlash,
  faFileCircleXmark,
  faCalendarDay,
  faCalendarWeek,
} from "@fortawesome/pro-regular-svg-icons";

 import { 
  faYoutube 
} from "@fortawesome/free-brands-svg-icons";

// Map your icons to keys for easy referencing
const iconMap = {
    "calendar-day": faCalendarDay,
    "calendar-week": faCalendarWeek,
    "retry": faFileCircleXmark,
    "square-arrow-up-right": faSquareArrowUpRight,
    "circle-check": faCircleCheck,
    "circle-xmark": faCircleXmark,
    "warning": faTriangleExclamation,
    "spinner": faSpinner,
    "chevron-down": faChevronDown,
    "chevron-up": faChevronUp,
    "check": faCheck,
    "info-circle": faInfoCircle,
    "warning-circle": faCircleExclamation,
    "times": faTimes,
    "trophy": faTrophy,
    "user-group": faUserGroup,
    "eye": faEye,
    "bullhorn": faBullhorn,
    "support": faGlobe,
    "clock": faClock,
    "circle": faCircle,
    "cart": faShoppingCart,
    "target-blank": faArrowUpRightFromSquare,
    "youtube": faYoutube,
    "tips": faLinesLeaning
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