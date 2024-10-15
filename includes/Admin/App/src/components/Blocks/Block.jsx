const Block = ({ colSpan, rowSpan, children }) => {
  const classes = `bg-white shadow-md rounded-md col-span-${colSpan} col-start-${rowSpan}`;

  return <div className={classes}>{children}</div>;
};

export default Block;