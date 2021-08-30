import { useEffect, useState } from "react"
import Link from "next/link"
import Linkify from "react-linkify"
import styles from "./job_details.module.sass"
import { useAuthState } from "../../context/auth"
import { API } from "../api"
import axios from "axios"
import Cookies from "js-cookie"
import Button from "../buttons/FormButton"
import dayjs from "dayjs"

const JobDetails = ({ job }) => {
  let { isAuthenticated, user } = useAuthState()
  let [loading, setLoading] = useState(false)
  let [saveLoading, setSaveLoading] = useState(false)
  const [text, setText] = useState("Apply")
  const [saveText, setSaveText] = useState("Save")

  let token = Cookies.get("token")
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + token,
    },
  }

  let {
    id,
    job_type,
    location,
    company,
    email,
    attachment,
    bio,
    description,
    closeDate,
  } = job

  const save = () => {
    setSaveLoading(true)
    if (saveText == "Save") {
      axios
        .post(`${API}/jobs/${id}/save`, {}, config)
        .then((res) => {
          console.log(res)
          setSaveLoading(false)
          setSaveText("Saved!")
        })
        .catch((err) => {
          setSaveLoading(false)
          console.log(err.response)
        })
    } else if (saveText == "Saved!") {
      axios
        .delete(`${API}/jobs/${id}/remove`, config)
        .then((res) => {
          console.log(res)
          setSaveLoading(false)
          setSaveText("Save")
        })
        .catch((err) => {
          setSaveLoading(false)
          console.log(err.response)
        })
    }
  }

  const apply = () => {
    setLoading(true)
    if (text == "Apply") {
      axios
        .post(`${API}/jobs/${id}/apply`, {}, config)
        .then((res) => {
          console.log(res)
          setLoading(false)
          setText("Revoke")
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.response)
        })
    }
    if (text == "Revoke") {
      axios
        .delete(`${API}/jobs/${id}/revoke`, config)
        .then((res) => {
          console.log(res)
          setLoading(false)
          setText("Apply")
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.message)
        })
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted)
      axios
        .get(`${API}/jobs/${id}/applications/${user?.id}`, config)
        .then((res) => {
          setText("Revoke")
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isMounted)
      axios
        .get(`${API}/jobs/${id}/saves/${user?.id}`, config)
        .then((res) => {
          setSaveText("Saved!")
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={styles.details}>
      {company && (
        <div className={styles.title}>
          Company/Organisation: <span>{company?.name}</span>
        </div>
      )}
      {location && (
        <div className={styles.title}>
          Location: <span>{location}</span>
        </div>
      )}
      {job_type && (
        <div className={styles.title}>
          Open To: <span>{job_type}</span>
        </div>
      )}
      {bio && (
        <div className={styles.title}>
          Bio: <span>{bio}</span>
        </div>
      )}
      {closeDate && (
        <div className={styles.title}>
          Deadline: <span>{dayjs(closeDate).format("MMM DD, YYYY HH:mm")}</span>
        </div>
      )}
      {email && (
        <div className={styles.title}>
          Email:
          <a href={`mailto:${email}`}>
            <span>{email}</span>
          </a>
        </div>
      )}
      {attachment && (
        <div className={styles.title}>
          Attachment:
          <Link href={attachment}>
            <a target="_blank">
              <span>Attachment.pdf</span>
            </a>
          </Link>
        </div>
      )}
      <div className={styles.descriptions}>
        <Linkify>{description}</Linkify>
      </div>
      {!isAuthenticated && (
        <section className={styles.job__footer}>
          <p>
            You need an account to apply for this job. Already have one?{" "}
            <Link href="/login">Login</Link>
          </p>
        </section>
      )}
      {isAuthenticated && (
        <section>
          <div className={styles.btns}>
            <Button
              click={save}
              btnClass="btn-secondary"
              text={saveText}
              loading={saveLoading}
              color="#00507A"
            />
            <Button
              click={apply}
              btnClass={text === "Applied!" ? "btn-secondary" : "btn-primary"}
              text={text}
              loading={loading}
            />
          </div>
        </section>
      )}
    </div>
  )
}

export default JobDetails
