import { useState } from "react"
import Accordion from "./Accordion"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import { config } from "../../../config"
import { API } from "../../../api"
import axios from "axios"
import styles from "./settings.module.sass"
import checkSymbols, { checkChange } from "../../../checkSymbols"
import { useAlertsDispatch } from "../../../../context/alerts"
import { useAuthDispatch } from "../../../../context/auth"

const Username = ({ username }) => {
  const [error, setError] = useState(null)
  const [passErr, setPassErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    userpassword: "",
  })
  const dispatch = useAuthDispatch()
  const alertsDispatch = useAlertsDispatch()
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name == "username") {
      checkChange(formData.username, setError)
    }
    if (name == "userpassword") setPassErr(null)
  }
  const handleSubmit = (e) => {
    e.preventDefault(e)
    if (formData.username.trim().length < 3) {
      setError({
        type: "danger",
        msg: "Username should have atleast three characters",
      })
    } else if (error) {
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
              message: "Username changed successfully",
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

  checkSymbols(formData.username, setError)

  let title = (
    <span>
      Change username <strong> ({username})*</strong>
    </span>
  )
  return (
    <Accordion title={title} items={error}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          title="Enter your new username"
          handleChange={handleChange}
          value={formData.username}
          name="username"
          error={error && error.msg}
        />
        <Input
          type="password"
          title="Enter Password"
          handleChange={handleChange}
          value={formData.userpassword}
          name="userpassword"
          error={passErr && passErr}
        />
        <Button text="Update" btnClass="btn-primary" loading={loading} />
      </form>
    </Accordion>
  )
}

export default Username
