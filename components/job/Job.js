import Link from "next/link"
import dayjs from "dayjs"
import { config } from "../config"
import { API } from "../api"
import axios from "axios"
import styles from "./job.module.sass"
import { useState } from "react"
import { useAlertsDispatch } from "../../context/alerts"
import Button from "../buttons/FormButton"

const Job = ({ job, page, setItems }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAlertsDispatch()
  let { id, name, company, created, closeDate, job_type, location } = job
  const remove = () => {
    if (page === "saved-jobs") {
      setLoading(true)
      axios
        .delete(`${API}/jobs/${id}/remove`, config)
        .then((res) => {
          setLoading(false)
          setItems((prev) => {
            let arr = prev.filter((el) => el.id != job.id)
            return arr
          })
          dispatch({
            type: "ADD",
            payload: {
              type: "success",
              message: "Job removed successfully",
            },
          })
        })
        .catch((err) => {
          setLoading(false)
          if (err?.response) {
            dispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: err?.response.data?.message,
              },
            })
          } else if (err?.message) {
            dispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: err.message,
              },
            })
          } else {
            dispatch({
              type: "ADD",
              payload: {
                type: "danger",
                message: "Internal server error",
              },
            })
          }
        })
    }
  }
  return (
    <article className={`card ${styles.job__card}`}>
      <div className={styles.logo__container}>
        <div className={styles.logo}>
          <img
            src={company?.logo}
            alt={`${job?.company?.name} logo`}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.time__details}>
        <h2>
          <Link href={`/jobs/${id}`}>{name}</Link>
        </h2>
        <p>
          Posted: <span> {dayjs(created).format("MMM DD, YYYY")}</span>
        </p>
        <p>
          Deadline: <span>{dayjs(closeDate).format("MMM DD, YYYY HH:mm")}</span>
        </p>
      </div>
      <div className={styles.job__descriptions}>
        <p className={styles.company__name}>
          Company:{" "}
          <Link href={`/companies/${job.company?.id}`}>
            <a>{job?.company?.name}</a>
          </Link>
        </p>
        {job_type && (
          <p>
            Job Type: <span>{job_type}</span>
          </p>
        )}
        {location && (
          <p>
            Location: <span>{location}</span>
          </p>
        )}
        {page === "saved-jobs" && (
          <Button
            click={remove}
            btnClass="btn-secondary"
            text="Remove"
            loading={loading}
            fontSize={14}
            fontWeight={400}
            color="#00507A"
            bg="light"
          />
        )}
      </div>
    </article>
  )
}

export default Job
