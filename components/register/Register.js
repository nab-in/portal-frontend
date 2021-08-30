import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import axios from "axios"
import { API } from "../api"
import { useAlertsDispatch } from "../../context/alerts"
import checkSymbols, { checkChange } from "../checkSymbols"
import checkMail, { checkEmailChange } from "../checkEmail"
import styles from "../../styles/register.module.sass"

const Register = () => {
  const router = useRouter()
  const [errors, setErrors] = useState(null)
  const [error, setError] = useState(null)
  const [emailErr, setEmailErr] = useState(null)
  const [usernameErr, setUsernameErr] = useState(null)
  const alertDispatch = useAlertsDispatch()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

  const { firstname, email, username, password } = formData

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === "email") checkEmailChange(value, setEmailErr)

    if (name === "username") checkChange(value, setUsernameErr)

    // if (name === "lastname" && value.length < 3) {
    //   setErrors({ ...errors, lastname: "Not less tha 3 characters required" })
    // } else {
    //   setErrors({
    //     ...errors,
    //     lastname: "",
    //   })
    // }
    if (name === "password") {
      if (value.length < 6) {
        setErrors({ ...errors, password: "Your password is weak" })
      } else {
        setErrors({
          ...errors,
          password: "",
        })
      }
    }

    if (name === "firstname") {
      if (value.length < 6) {
        console.log(name, value)
        setErrors({
          ...errors,
          firstname: "Atleast three(3) characters required",
        })
      } else {
        setErrors({
          ...errors,
          firstname: "",
        })
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (errors || emailErr || usernameErr) {
      setError("There are error(s) in your form")
    } else if (
      username.trim().length < 3 ||
      password.trim().length < 6 ||
      firstname.trim().length < 3 ||
      email.trim().length < 3
    ) {
      setError("There are error(s) in your form")
      if (username.trim().length < 3)
        setUsernameErr({
          type: "danger",
          msg: "Atleast three(3) characters required",
        })
      if (email.trim().length < 3)
        setEmailErr({
          type: "danger",
          msg: "Invalid email",
        })
      if (password.trim().length < 6)
        setErrors({
          ...errors,
          password: "Your password is weak",
        })
      if (firstname.trim().length < 6)
        setErrors({
          ...errors,
          firstname: "Atleast three(3) characters required",
        })
    } else {
      setLoading(true)
      axios
        .post(`${API}/users/register`, formData)
        .then((res) => {
          console.log(res.data)
          setLoading(false)
          alertDispatch({
            type: "ADD",
            payload: {
              message: "You have successfully registered, Login now",
              type: "success",
            },
          })
          router.push("/login")
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.response)
        })
    }
  }

  checkMail(formData.email, setEmailErr)
  checkSymbols(formData.username, setUsernameErr)

  return (
    <div className={styles.register__jobseeker}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          name="firstname"
          handleChange={handleChange}
          id="firstname"
          title="First Name:"
          error={errors?.firstname && errors.firstname}
          inputClass="bg_input"
          // required={true}
        />
        <Input
          type="text"
          name="lastname"
          handleChange={handleChange}
          id="lastname"
          title="Last Name:"
          // error={errors?.lastname && errors.lastname}
          inputClass="bg_input"
        />
        <Input
          type="email"
          name="email"
          handleChange={handleChange}
          id="email"
          title="Email address:"
          error={emailErr?.msg && emailErr.msg}
          inputClass="bg_input"
          // required={true}
        />
        <Input
          type="text"
          name="username"
          handleChange={handleChange}
          id="username"
          title="Username:"
          error={usernameErr?.msg && usernameErr.msg}
          inputClass="bg_input"
          // required={true}
        />
        <Input
          type="password"
          name="password"
          handleChange={handleChange}
          id="password"
          title="Password:"
          error={errors?.password && errors.password}
          inputClass="bg_input"
          // required={true}
        />
        <p
          style={{
            fontSize: ".9rem",
          }}
        >
          By Registering you agree with our{" "}
          <Link href="/">
            <a className="dark_bg">Privacy Policy</a>
          </Link>{" "}
          and{" "}
          <Link href="/">
            <a className="dark_bg">Terms and conditions</a>
          </Link>
        </p>
        {error && <p className={`alerts danger`}>{error}</p>}
        <FormButton
          text="Register"
          btnClass="btn-primary"
          btnGroupClass="btns"
          loading={loading}
        />
      </form>
    </div>
  )
}

export default Register
