import React from "react"
import styles from "./form_button.module.sass"

const FormButton = ({ text, btnClass, btnGroupClass }) => {
  return (
    <div className={`btn-group ${btnGroupClass}`}>
      <button className={`btn btn-${btnClass} span__full`}>{text}</button>
    </div>
  )
}

export default FormButton
