const Block = ({ className = '', children }) => {
  const classes = `bg-white shadow-md rounded-md  ${className}`;

  return <div className={classes}>{children}</div>;
};

export default Block;