import { Link } from "@tanstack/react-router";

const Button = ({ children, onClick, link = {}, ...props }) => {
  const className =
    "bg-red-500 hover:bg-red-700 hover:text-white text-white  text-center font-bold py-2 px-24 rounded-2xl";
  if (link.to) {
    return (
      <Link to={link.to} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
