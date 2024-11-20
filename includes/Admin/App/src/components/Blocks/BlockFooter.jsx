const BlockFooter = ({ children }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      {children}
    </div>
  );
};

BlockFooter.displayName = "BlockFooter";
export default BlockFooter;
