import { memo } from "react";

type BlockProps = {
  className?: string;
  children: React.ReactNode;
};

const Block = memo(({ className, children }: BlockProps) => {
  const classes = `bg-white shadow-md rounded-xl  ${className}`;

  return <div className={classes}>{children}</div>;
});

Block.displayName = "Block";

export default Block;
