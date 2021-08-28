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
import checkMail, { checkChange } from "../../../checkEmail"

const Email = ({ email }) => {
  const [error, setError] = useState(null)
  const [passErr, setPassErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    userpassword: "",
  })
  const dispatch = useAuthDispatch()
  const alertsDispatch = useAlertsDispatch()
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name == "email") {
      checkChange(name, setError)
    }
    if (name == "userpassword") setPassErr(null)
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
          dispatch({
            type: "ADD_PROFILE",
            payload: res.data?.payload,
          })
          alertsDispatch({
            type: "ADD",
            payload: {
              type: "success",
              message: "Email changed successfully",
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
          if (error?.message) {
          }
        })
    }
  }

  checkMail(formData.email, setError)

  let title = (
    <span>
      Change email <strong> ({email})*</strong>
    </span>
  )
  return (
    <Accordion title={title}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          type="email"
          title="Enter your new email"
          handleChange={handleChange}
          name="email"
          error={error && error?.msg}
        />
        <Input
          type="password"
          title="Enter Password"
          handleChange={handleChange}
          name="userpassword"
          error={passErr && passErr}
        />
        <Button text="Update" btnClass="btn-primary" loading={loading} />
      </form>
    </Accordion>
  )
}

export default Email
