import React, { useState } from "react"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import styles from "./newsletter.module.sass"
import SelectCategories from "./SelectCategories"

const NewsLetter = () => {
  const [formData, setFormdata] = useState({
    Name: "",
    email: "",
  })
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
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
        <SelectCategories
          selected={selected}
          setSelected={setSelected}
          bg="white"
        />
        <FormButton
          text="Subscribe"
          btnClass="btn-primary span__full"
          btnGroupClass="btns"
          loading={loading}
        />
      </form>
    </div>
  )
}

export default NewsLetter
