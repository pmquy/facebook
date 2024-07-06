import { IconButton, Tooltip } from "@mui/material"
import React, { useRef } from "react"
import { MdUpload } from "react-icons/md"

export default ({children,className , ...props}) => {    
  const ref = useRef()
  return <div>
    <input type="file" multiple={true} hidden ref={ref} {...props}></input>
    <Tooltip title="Upload file">
      <IconButton color="primary" onClick={() => ref.current.click()}>
        <MdUpload />
      </IconButton>
    </Tooltip>
  </div>
}