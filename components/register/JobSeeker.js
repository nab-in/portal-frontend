import React, { useState } from "react"
import Link from "next/link"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"

const JobSeeker = () => {
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
    <div className="register__jobseeker">
      <h2>Job Seeker</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          name="Name"
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
          By Registering you agree with our <Link href="/">Privacy Policy</Link>{" "}
          and <Link href="/">Terms and conditions</Link>
        </p>
        {errors && Object.keys(errors).keys.length > 0 && (
          <p className="alert alert-danger">You have error(s) in your form</p>
        )}
        <FormButton
          text={loading ? "Please Wait" : "Register"}
          btnClass={loading ? "disabled" : "primary"}
          btnGroupClass=""
        />
      </form>
    </div>
  )
}

export default JobSeeker
