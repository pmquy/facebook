class CustomError extends Error {
  constructor(msg, status) {
    super(msg)
    this.status = status
  }
}

export default CustomError