import React from 'react'
import '../index.css'
const Alert = ({message}) => {
  return (
    <>
    <div >
      <p className="px-2 border text-white font-normal alert-bg">
        {message}
      </p>
    </div>
  </>
  )
}

export default Alert
