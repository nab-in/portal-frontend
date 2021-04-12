import React, { useState } from "react"
import Link from "next/link"
import Input from "../components/inputs/Input"
import FormButton from "../components/buttons/FormButton"
import styles from "../styles/auth.module.sass"

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
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
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={`${styles.auth} ${styles.login}`}>
      <div className={`${styles.container}`}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Log in to your account</h1>
          <Input
            type="text"
            name="email"
            handleChange={handleChange}
            id="email"
            title="Email:"
            error={errors.email && errors.email}
          />
          <Input
            type="password"
            name="password"
            handleChange={handleChange}
            id="password"
            title="Password:"
          />
          {errors.msg && (
            <p className={`${styles.alert} ${styles.alert__danger}`}>
              {errors.msg}
            </p>
          )}
          <FormButton
            text={loading ? "Please Wait" : "Login"}
            btnClass="primary"
            btnGroupClass=""
          />
        </form>
        <div className={`${styles.extra__stuffs}`}>
          Don't have an account yet? <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default login
