import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/**
 * Import the icon packages you want to use
 * Look at https://docs.fontawesome.com/web/use-with/react/add-icons for more information
 *
 * the authentication for FA is in the .npmrc which should only
 * be visible local and not pushed to main/production
 */
import {
    faArrowUpRightFromSquare,
    faCalendarDay,
    faCalendarWeek,
    faChevronDown,
    faChevronUp,
    faCircle,
    faCircleCheck,
    faCircleExclamation,
    faCircleXmark,
    faEye,
    faGlobe,
    faInfoCircle,
    faSpinner,
    faSquareArrowUpRight,
    faTriangleExclamation,
    faTrophy
} from "@fortawesome/free-solid-svg-icons";

// Map your icons to keys for easy referencing
const iconMap = {
    "calendar-day": faCalendarDay,
    "calendar-week": faCalendarWeek,
    "square-arrow-up-right": faSquareArrowUpRight,
    "circle-check": faCircleCheck,
    "circle-xmark": faCircleXmark,
    "warning": faTriangleExclamation,
    "spinner": faSpinner,
    "chevron-down": faChevronDown,
    "chevron-up": faChevronUp,
    "info-circle": faInfoCircle,
    "warning-circle": faCircleExclamation,
    "trophy": faTrophy,
    "eye": faEye,
    "support": faGlobe,
    "circle": faCircle,
    "target-blank": faArrowUpRightFromSquare
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