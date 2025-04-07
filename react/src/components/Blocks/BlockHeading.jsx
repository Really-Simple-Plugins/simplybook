import clsx from "clsx";

const BlockHeading = ({ title, controls, className = "" }) => {
  return (
    <div className={clsx(className, "flex items-center justify-between px-5 py-1")}>
      <h2 className="text-base font-bold">{title}</h2>
      {controls}
    </div>
  );
};

BlockHeading.displayName = "BlockHeading";

export default BlockHeading;
