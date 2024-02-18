export default function({className, children, ...props}) {
  return <button className={` btn-1 ${className}`} {...props} >{children}</button>
}