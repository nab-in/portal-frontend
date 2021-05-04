import React, { useState } from "react"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import styles from "./newsletter.module.sass"
import rippleEffect from "../rippleEffect.js"

const NewsLetter = () => {
  const [formData, setFormdata] = useState({
    Name: "",
    email: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={`${styles.card} newslatter`}>
      <h3>
        Subscribe to be an early bird to receive notifications on new jobs
      </h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input title="Name" handleChange={handleChange} name="Name" id="Name" />
        <Input
          title="Email"
          handleChange={handleChange}
          name="email"
          id="email"
        />
        <FormButton
          text="Subscribe"
          btnClass="btn-primary span__full"
          btnGroupClass="btns"
        />
      </form>
    </div>
  )
}

export default NewsLetter
