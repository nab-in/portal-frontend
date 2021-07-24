import React, { useState } from "react"
import Link from "next/link"
import Linkify from "react-linkify"
import styles from "./job_details.module.sass"
import { useAuthState } from "../../context/auth"
import { API } from "../api"
import axios from "axios"
import Cookies from "js-cookie"
import Button from "../buttons/FormButton"
import moment from "moment"

const JobDetails = ({ job }) => {
  let [rate, setRate] = useState(0)
  let { isAuthenticated } = useAuthState()
  let [loading, setLoading] = useState(false)
  const [text, setText] = useState("Apply")
  let stars = [1, 2, 3, 4, 5]
  let style = { "--rating": rate }
  console.log(job)
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
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    axios
      .post(`${API}/jobs/${id}/save`, config)
      .then((res) => {
        console.log(res)
        setLoading(false)
        setText("Applied!")
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.message)
      })
  }

  const apply = () => {
    setLoading(true)
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    if (text == "Apply") {
      axios
        .post(`${API}/jobs/${id}/apply`, config)
        .then((res) => {
          console.log(res)
          setLoading(false)
          setText("Revoke")
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.message)
        })
    }
    if (text == "Revoke") {
      axios
        .post(`${API}/jobs/${id}/revoke`, config)
        .then((res) => {
          console.log(res)
          setLoading(false)
          setText("Revert")
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.message)
        })
    }
  }

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
          Deadline: <span>{moment(closeDate).format("MMM DD, YYYY")}</span>
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
              <span>{attachment}.pdf</span>
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
              text="Save"
              loading={loading}
            />
            <Button
              click={apply}
              btnClass={text === "Applied!" ? "btn-secondary" : "btn-primary"}
              text={text}
              loading={loading}
            />
          </div>
          <div className={styles.rate}>
            <p>Rate this job</p>
            <div className={styles.stars} style={style}>
              {stars.map((star) => (
                <span
                  key={star}
                  className={styles.star}
                  onClick={() => setRate(star)}
                ></span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default JobDetails
