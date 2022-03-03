import { useState } from "react"
import { config } from "../../../config"
import { API } from "../../../api"
import axios from "axios"
import Accordion from "./Accordion"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import styles from "./settings.module.sass"
import { useAlertsDispatch } from "../../../../context/alerts"
import { useAuthDispatch } from "../../../../context/auth"

const Password = () => {
  const [formData, setFormData] = useState({
    password: "",
    userpassword: "",
  })
  const [error, setError] = useState(null)
  const [passErr, setPassErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const alertsDispatch = useAlertsDispatch()
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "password" && value.length < 6)
      setError({
        type: "danger",
        msg: "Your password is weak",
      })
    if (name === "password" && value.length >= 6) {
      setError(null)
    }
    if (name === "userpassword") setPassErr(null)
  }
  const handleSubmit = (e) => {
    e.preventDefault(e)
    if (error) {
      alertsDispatch({
        type: "ADD",
        payload: {
          type: "danger",
          message: "There are errors in your form",
        },
      })
    } else {
      setLoading(true)
      axios
        .put(`${API}/users`, formData, config)
        .then((res) => {
          alertsDispatch({
            type: "ADD",
            payload: {
              type: "success",
              message: "Password changed successfully",
            },
          })
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          if (err?.response?.data?.message)
            alertsDispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: err?.response?.data.message,
              },
            })
          if (err?.response?.data == "Incorrect password") {
            setPassErr(err?.response?.data)
            alertsDispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: err?.response?.data,
              },
            })
          }
        })
    }
  }
  return (
    <Accordion title="Change Password">
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          type="password"
          title="Enter your current password"
          handleChange={handleChange}
          name="userpassword"
          error={passErr && passErr}
        />
        <Input
          type="password"
          title="Enter New Password"
          handleChange={handleChange}
          name="password"
          error={error && error?.message}
        />
        <Button text="Update" btnClass="btn-primary" loading={loading} />
      </form>
    </Accordion>
  )
}

export default Password
