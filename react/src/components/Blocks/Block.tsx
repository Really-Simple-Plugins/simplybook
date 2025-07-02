import { memo } from "react";
import clsx from "clsx";

type BlockProps = {
  className?: string;
  children: React.ReactNode;
};

const Block = memo(({ className = "", children }: BlockProps) => {
  return (
    <div className={clsx("content-block bg-white shadow-md rounded-xl flex flex-col pb-4", className)}>
      {children}
    </div>
  );
});

Block.displayName = "Block";

export default Block;
