import React, { useState } from "react"
import Link from "next/link"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"

const Company = () => {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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
  }
  return (
    <div className="register__company">
      <h2>Company/Organisation</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          name="Company/Organisation Name"
          handleChange={handleChange}
          id="name"
          title="Name:"
          error={errors.Name && errors.Name}
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
          type="password"
          name="password"
          handleChange={handleChange}
          placeholder=""
          id="password"
          title="Password:"
          error={errors.password && errors.password}
          inputClass="bg_input"
        />
        <Input
          type="password"
          name="confirmPassword"
          handleChange={handleChange}
          placeholder=""
          id="confirm-password"
          title="Confirm Password:"
          error={errors.confirmPassword && errors.confirmPassword}
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

export default Company
