export default function({className, children, ...props}) {
  return <button className={`${className} btn-1`} {...props} >{children}</button>
}