const BlockHeading = ({ title, controls }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <h2 className="text-base font-bold">{title}</h2>
      {controls}
    </div>
  );
};
export default BlockHeading;
