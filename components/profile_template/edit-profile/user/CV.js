import { useState } from "react"
import Section from "../../Section"
import Button from "../../../buttons/FormButton"
import styles from "./cv.module.sass"
import axios from "axios"
import { API } from "../../../api"
import { config } from "../../../config"
import { useAlertsDispatch } from "../../../../context/alerts"
import { useAuthDispatch } from "../../../../context/auth"

const CV = ({ userCv }) => {
  let [loading, setLoading] = useState(false)
  const [cv, setCv] = useState(null)
  let [type, setType] = useState(false)
  const dispatch = useAuthDispatch()
  const alertDispatch = useAlertsDispatch()
  const handleFileChange = (e) => {
    const data = new FormData()
    data.append("", e.target.files[0])
    setCv(data)
    alertDispatch({
      type: "REMOVE",
    })
    if (e.target.files) {
      if (e.target.files[0]?.type === "application/pdf") {
        setType(true)
      } else {
        alertDispatch({
          type: "ADD",
          payload: {
            type: "danger",
            message: "Only pdf files are allowed",
          },
        })
      }
    }
  }

  const handleFileSubmit = (e) => {
    e.preventDefault(e)
    if (cv) {
      if (type === true) {
        setLoading(true)
        axios
          .post(`${API}/users/cv`, cv, config)
          .then((res) => {
            setLoading(false)
            dispatch({
              type: "ADD_CV",
              payload: res.data,
            })
            alertDispatch({
              type: "ADD",
              payload: {
                type: "success",
                message: res.data.message,
              },
            })
          })
          .catch((err) => {
            setLoading(false)
            if (err?.response) {
              alertDispatch({
                type: "ADD",
                payload: {
                  type: "danger",
                  message: err.response?.data?.message,
                },
              })
            } else if (err?.message) {
              if (err?.code === "ECONNREFUSED") {
                alertDispatch({
                  type: "ADD",
                  payload: {
                    type: "danger",
                    message: "Failed to connect, please try again",
                  },
                })
              } else {
                alertDispatch({
                  type: "ADD",
                  payload: {
                    type: "danger",
                    message: err?.message,
                  },
                })
              }
            } else {
              alertDispatch({
                type: "ADD",
                payload: {
                  type: "danger",
                  message: "Internal server error, please try again",
                },
              })
            }
          })
      } else {
        alertDispatch({
          type: "ADD",
          payload: {
            type: "danger",
            message: "Only pdf files are allowed",
          },
        })
      }
    } else {
      alertDispatch({
        type: "ADD",
        payload: {
          type: "danger",
          message: "Files shouldn't be empty",
        },
      })
    }
  }

  return (
    <Section title="Upload CV">
      <article className={styles.cv}>
        {userCv && (
          <p
            style={{
              marginBottom: "1rem",
            }}
          >
            CV:{" "}
            <a href={userCv} target="_blank">
              Your CV
            </a>
            <br />
            <span
              style={{
                marginTop: ".7rem",
                display: "block",
              }}
            >
              Change?
            </span>
          </p>
        )}
        <form onSubmit={(e) => handleFileSubmit(e)}>
          <label htmlFor="cv">
            <input
              type="file"
              name="cv"
              id="cv"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
          <Button text="Upload" btnClass="btn-primary" loading={loading} />
        </form>
      </article>
    </Section>
  )
}

export default CV
