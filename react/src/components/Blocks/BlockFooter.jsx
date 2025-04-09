import clsx from "clsx";

const BlockFooter = ({ children, className = "" }) => {
  return (
    <div className={clsx(className, "px-5 py-4")}>
      {children}
    </div>
  );
};

BlockFooter.displayName = "BlockFooter";
export default BlockFooter;
