import { useState } from "react"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import SelectCategories from "../newsletter/SelectCategories"
import styles from "./footer.module.sass"

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
      <div className={styles.inputs}>
        <Input
          type="text"
          name="username"
          handleChange={handleChange}
          id="name"
          title="Name:"
          inputClass="bg_input"
        />
        <Input
          type="email"
          name="email"
          handleChange={handleChange}
          id="email"
          title="Email address:"
          inputClass="bg_input"
        />
      </div>
      <SelectCategories
        selected={selected}
        setSelected={setSelected}
        bg="dark"
      />
      <FormButton
        text="Subscribe"
        btnClass="btn-primary"
        btnGroupClass="btns"
        loading={loading}
        color="#0D0D0D"
      />
    </form>
  )
}

export default Subscribe
