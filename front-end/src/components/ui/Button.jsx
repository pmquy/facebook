export default function({className, children, ...props}) {
  return <button className={`${className}`} {...props} >{children}</button>
}