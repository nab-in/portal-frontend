import { useState } from "react"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import SelectCategories from "../newsletter/SelectCategories"
import styles from "./footer.module.sass"
import axios from "axios"
import { API } from "../api"
import { useAlertsDispatch } from "../../context/alerts"
import checkEmail, { checkEmailChange } from "../checkEmail"

const Subscribe = () => {
  const [formData, setFormdata] = useState({
    Name: "",
    email: "",
  })
  let alertDispatch = useAlertsDispatch()
  const [emailError, setEmailError] = useState(null)
  const [errors, setErrors] = useState(null)
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({
      ...formData,
      [name]: value,
    })
    setErrors(null)
    if (name === "email") checkEmailChange(value, setEmailError)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      ...formData,
      selected,
    }
    if (
      emailError ||
      selected?.length === 0 ||
      formData?.email?.trim().length === 0
    ) {
      setErrors({
        type: "danger",
        msg: "There are error(s) in your form",
      })
      if (formData?.email?.trim().length === 0)
        setEmailError({
          type: "danger",
          msg: "This field shouldn't be empty",
        })
      if (selected?.length === 0) {
        setErrors({
          type: "danger",
          msg: "Please select atleast one category",
        })
      }
    } else {
      setLoading(true)
      axios
        .post(`${API}/subscribers`, data)
        .then((res) => {
          setLoading(false)
          alertDispatch({
            type: "ADD",
            payload: {
              message: "You have successfully logged in",
              type: "success",
            },
          })
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          if (err?.response) {
            setErrors({
              type: "danger",
              msg: err?.response?.data?.message,
            })
          } else if (err?.message) {
            if (err?.code === "ECONNREFUSED") {
              setErrors({
                type: "danger",
                msg: "Failed to connect, please try again",
              })
            } else {
              setErrors({
                type: "danger",
                msg: err?.message,
              })
            }
          } else {
            setErrors({
              type: "danger",
              msg: "Internal server error, please try again",
            })
          }
        })
    }
  }

  checkEmail(formData.email, setEmailError)

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.inputs}>
        <Input
          type="text"
          name="name"
          handleChange={handleChange}
          id="name"
          title="Name:"
          inputClass="bg_input"
        />
        <Input
          type="email"
          name="email"
          handleChange={handleChange}
          id="footer-email"
          title="Email address:"
          inputClass="bg_input"
          error={emailError?.msg && emailError.msg}
        />
      </div>
      <SelectCategories
        selected={selected}
        setSelected={setSelected}
        bg="dark"
      />
      {errors?.msg && <p className="alerts danger">{errors.msg}</p>}

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
