import { useState, useEffect } from "react"
import Link from "next/link"
import dayjs from "dayjs"
import Section from "../Section"
import styles from "./jobs.module.sass"
import axios from "axios"
import { FaSync } from "react-icons/fa"
import Loader from "../../loaders/CardLoader"
import { API } from "../../api"

const Jobs = ({ page, details }) => {
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState([])
  const [errors, setErrors] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    let isMounted = true
    if (isMounted) refreshJobs()
    return () => {
      isMounted = false
    }
  }, [])

  const refreshJobs = () => {
    if (page == "company") {
      setLoading(true)
      axios
        .get(`${API}/companies/${details.id}?fields=jobs`)
        .then((res) => {
          if (res?.data?.jobs?.length === 0)
            setMessage(
              <>
                No jobs found. <Link href="/jobs">Explore jobs?</Link>
              </>
            )
          if (res?.data?.jobs?.length > 0) setJobs(res.data.jobs)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          if (err?.response) {
            setErrors({
              type: "normal",
              msg: err?.response?.data?.message,
            })
          } else if (err?.message) {
            if (err?.code === "ECONNREFUSED") {
              setErrors({
                type: "normal",
                msg: "Failed to connect, please refresh",
              })
            } else {
              setErrors({
                type: "normal",
                msg: err?.message,
              })
            }
          } else {
            setErrors({
              type: "normal",
              msg: "Internal server error, please try again",
            })
          }
        })
    }
  }

  return (
    <div className={styles.jobs}>
      <Section title="Jobs">
        <article className={styles.contents}>
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            <>
              {errors?.msg ? (
                <p className="alerts danger">{errors?.msg}</p>
              ) : (
                <>
                  {jobs?.length > 0 && (
                    <>
                      {jobs.map(
                        ({
                          id,
                          name,
                          created,
                          closeDate,
                          jobType,
                          openTo,
                          location,
                        }) => {
                          return (
                            <div className={`${styles.job} card`} key={id}>
                              <div className={styles.time__details}>
                                <h2>
                                  <Link href={`/jobs/${id}`}>{name}</Link>
                                </h2>
                                <p>
                                  Posted:{" "}
                                  <span>
                                    {" "}
                                    {dayjs(created).format("MMM DD, YYYY")}
                                  </span>
                                </p>
                                <p>
                                  Deadline:{" "}
                                  <span>
                                    {dayjs(closeDate).format(
                                      "MMM DD, YYYY HH:mm"
                                    )}
                                  </span>
                                </p>
                              </div>
                              <div className={styles.job__descriptions}>
                                {jobType && (
                                  <p>
                                    Job Type: <span>{jobType}</span>
                                  </p>
                                )}
                                {openTo && (
                                  <p>
                                    Open To: <span>{openTo}</span>
                                  </p>
                                )}
                                <p>
                                  Location: <span>{location}</span>
                                </p>
                              </div>
                            </div>
                          )
                        }
                      )}
                    </>
                  )}
                  {message && <p>{message}</p>}
                </>
              )}
              {jobs?.length === 0 && (
                <div
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    onClick={refreshJobs}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <FaSync
                      className={loading ? `spinner` : ``}
                      style={{
                        fontSize: "1.8rem",
                        color: "gray",
                      }}
                    />
                  </button>
                </div>
              )}
            </>
          )}
        </article>
      </Section>
    </div>
  )
}

export default Jobs
