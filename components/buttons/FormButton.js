import React from "react"
import rippleEffect from "../rippleEffect.js"

const FormButton = ({ text, btnClass, btnGroupClass }) => {
  return (
    <div className={`btn-group ${btnGroupClass}`}>
      <button className={`btn ${btnClass}`} onClick={rippleEffect}>
        {text}
      </button>
    </div>
  )
}

export default FormButton
