import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Input from "../components/inputs/Input"
import FormButton from "../components/buttons/FormButton"
import Logo from "../components/Logo"
import styles from "../styles/auth.module.sass"
import axios from "axios"
import { useAuthDispatch } from "../context/auth"

const login = () => {
  let router = useRouter()
  const dispatch = useAuthDispatch()
  const [formData, setFormData] = useState({
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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/login", formData)
      .then((res) => {
        console.log(res)
        dispatch({
          type: "LOGIN",
          payload: res.data,
        })
        setLoading(false)
        if (res.data.verified) router.push("/")
      })
      .catch((err) => {
        setLoading(false)

        console.log(err)
      })
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
          <h1>Welcome Back, Login to your account</h1>
          <Input
            type="text"
            name="username"
            handleChange={handleChange}
            id="username"
            title="Username/Email:"
            error={errors.username && errors.username}
          />
          <Input
            type="password"
            name="password"
            handleChange={handleChange}
            id="password"
            title="Password:"
          />
          {errors.msg && <p className={`alert ${error.type}`}>{errors.msg}</p>}
          <div className={styles.btns}>
            <FormButton text="Login" btnClass="btn-primary" loading={loading} />
            <Link href="/forgot_password">
              <a>Forgot password?</a>
            </Link>
          </div>
        </form>
        <div className={`${styles.extra__stuffs}`}>
          Don't have an account yet? <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default login
