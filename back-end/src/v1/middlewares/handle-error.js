const handleError = (error, req, res, next) => {  
  console.log(error)
  res.status(error.status || 500).send({
    error : {
      status : error.status || 500,
      message : error.message || 'Internal Server',
    }
  })
}

export default handleError