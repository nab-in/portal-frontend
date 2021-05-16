import React, { useState } from "react"
import Link from "next/link"
import Input from "../components/inputs/Input"
import FormButton from "../components/buttons/FormButton"
import Logo from "../components/Logo"
import styles from "../styles/auth.module.sass"

const forgot_password = () => {
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
          <Link href="/">
            <a className={styles.logo}>
              <Logo height={20} width={116} />
            </a>
          </Link>
          <h1>Enter your email</h1>
          <Input
            type="text"
            name="email"
            handleChange={handleChange}
            id="email"
            title="Email:"
            error={errors.email && errors.email}
          />
          {errors.msg && <p className={`alert ${error.type}`}>{errors.msg}</p>}
          <div className={styles.btns}>
            <FormButton text="Submit" btnClass="btn-primary" btnGroupClass="" />
          </div>
        </form>
        <div className={`${styles.extra__stuffs}`}>
          Don't have an account yet? <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default forgot_password
