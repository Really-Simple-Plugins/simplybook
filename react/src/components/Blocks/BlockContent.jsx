import clsx from "clsx";

const BlockContent = ({ children, className = "" }) => {
  return <div className={clsx("block-content flex-grow", className)}>{children}</div>;
};

BlockContent.displayName = "BlockContent";

export default BlockContent;
