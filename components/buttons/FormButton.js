import React from "react"
import rippleEffect from "../rippleEffect.js"
import Loader from "../loaders/ButtonLoader"

const FormButton = ({ text, btnClass, btnGroupClass, loading, click }) => {
  return (
    <div className={`btn-group ${btnGroupClass}`} onClick={click}>
      <button className={`btn ${btnClass}`} onClick={rippleEffect}>
        {text}
        {loading && <Loader />}
      </button>
    </div>
  )
}

export default FormButton
