const BlockContent = ({ children, className = "p-5 pt-0" }) => {
  return <div className={className}>{children}</div>;
};

BlockContent.displayName = "BlockContent";

export default BlockContent;
