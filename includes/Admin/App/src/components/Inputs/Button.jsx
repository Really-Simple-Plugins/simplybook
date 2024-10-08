import {Link} from '@tanstack/react-router';

const Button = ({
  children,
  onClick,
  link = {},
  ...props
}) => {
  const className = "bg-red-500 hover:bg-red-700 hover:text-white text-white font-bold py-2 px-24 rounded-2xl max-w-xs mx-auto";
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