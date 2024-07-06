export default function({className, children, ...props}) {
  return <div className={`${className} btn w-max`} {...props} >{children}</div>
}