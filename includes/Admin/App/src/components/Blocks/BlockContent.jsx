const BlockContent = ({ children,  className = 'p-5' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default BlockContent;