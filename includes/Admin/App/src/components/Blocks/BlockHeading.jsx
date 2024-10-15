const BlockHeading = ({title, controls }) => {

  return (
      <div className="py-4 px-5 flex justify-between items-center">
        <h2 className="text-base font-bold">{title}</h2>
        {controls}
      </div>
  )
}
export default BlockHeading;