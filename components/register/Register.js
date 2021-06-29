import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import axios from "axios"
import { API } from "../api"
import { useAlertsDispatch } from "../../context/alerts"

const Register = () => {
  const router = useRouter()
  const alertDispatch = useAlertsDispatch()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: "",
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
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
        console.log(err)
      })
  }
  return (
    <div className="register__jobseeker">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          name="firstname"
          handleChange={handleChange}
          id="firstname"
          title="First Name:"
          error={errors.firstname && errors.firstname}
          inputClass="bg_input"
        />
        <Input
          type="text"
          name="lastname"
          handleChange={handleChange}
          id="lastname"
          title="Last Name:"
          error={errors.lastname && errors.lastname}
          inputClass="bg_input"
        />
        <Input
          type="email"
          name="email"
          handleChange={handleChange}
          id="email"
          title="Email address:"
          error={errors.email && errors.email}
          inputClass="bg_input"
        />
        <Input
          type="text"
          name="username"
          handleChange={handleChange}
          id="username"
          title="Username:"
          error={errors.username && errors.username}
          inputClass="bg_input"
        />
        <Input
          type="password"
          name="password"
          handleChange={handleChange}
          id="password"
          title="Password:"
          error={errors.password && errors.password}
          inputClass="bg_input"
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
        {errors && Object.keys(errors).keys.length > 0 && (
          <p className={`alert ${error.type}`}>
            You have error(s) in your form
          </p>
        )}
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
