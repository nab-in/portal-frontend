import { useState } from "react"
import { useAuthState, useAuthDispatch } from "../../context/auth"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import SelectCategories from "../newsletter/SelectCategories"

const Subscribe = () => {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState([])

  const handleChange = (e) => {}

  const handleSubmit = (e) => {
    e.preventDefault()
    // setLoading(true)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="text"
        name="username"
        handleChange={handleChange}
        id="name"
        title="Name:"
        inputClass="bg_input"
        placeholder="Enter your full name"
      />
      <Input
        type="email"
        name="email"
        handleChange={handleChange}
        id="email"
        title="Email address:"
        inputClass="bg_input"
        placeholder="Enter your email address"
      />
      <SelectCategories selected={selected} setSelected={setSelected} />
      <FormButton
        text="Subscribe"
        btnClass="btn-primary"
        btnGroupClass="btns"
        loading={loading}
      />
    </form>
  )
}

export default Subscribe
