import { Link } from "@tanstack/react-router";

const ButtonInput = ({ children, onClick, link = {}, variant = "primary", disabled = false, ...props }) => {
  // Base styles for both variants
  const baseStyles = "font-bold py-2 px-6 rounded-md transition-all duration-200";

  // Variants for primary and secondary buttons
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "border border-blue-600 text-blue-600 hover:bg-blue-100 active:bg-blue-200",
  };

  // Disabled styles
  const disabledStyles = "opacity-50 cursor-not-allowed";

  // Final className based on variant and disabled state
  const className = `${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ""}`;

  if (link.to) {
    return (
        <Link to={link.to} className={className} {...props} onClick={disabled ? (e) => e.preventDefault() : undefined}>
          {children}
        </Link>
    );
  }

  return (
      <button onClick={onClick} className={className} disabled={disabled} {...props}>
        {children}
      </button>
  );
};

export default ButtonInput;
