import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Input from "../components/inputs/Input"
import FormButton from "../components/buttons/FormButton"
import Logo from "../components/Logo"
import styles from "../styles/auth.module.sass"
import axios from "axios"
import { useAuthDispatch } from "../context/auth"
import { API } from "../components/api"
import { useAlertsDispatch } from "../context/alerts"

const login = () => {
  let router = useRouter()
  const dispatch = useAuthDispatch()
  let alertDispatch = useAlertsDispatch()
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
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    axios
      .post(`${API}/login`, formData)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: res.data,
        })
        setLoading(false)
        alertDispatch({
          type: "ADD",
          payload: {
            message: "You have successfully logged in",
            type: "success",
          },
        })
        router.push("/profile")
      })
      .catch((err) => {
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
          <div
            style={{
              textAlign: "right",
              marginTop: "1rem",
            }}
          >
            <Link href="/forgot_password">
              <a
                style={{
                  fontSize: ".9rem",
                }}
              >
                Forgot password?
              </a>
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            handleChange={handleChange}
            id="password"
            title="Password:"
          />
          {errors.msg && (
            <p className={`alerts ${errors.type}`}>{errors.msg}</p>
          )}
          <div className={styles.btns}>
            <FormButton text="Login" btnClass="btn-primary" loading={loading} />
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
