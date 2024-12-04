import clsx from "clsx";

const BlockContent = ({ children, className = "" }) => {
  return <div className={clsx(className,"p-5 flex-grow")}>{children}</div>;
};

BlockContent.displayName = "BlockContent";

export default BlockContent;
