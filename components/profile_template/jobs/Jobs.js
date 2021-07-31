import { useState, useEffect } from "react"
import Link from "next/link"
import moment from "moment"
import Section from "../Section"
import styles from "./jobs.module.sass"
import Cookies from "js-cookie"
import axios from "axios"
import { API } from "../../api"

const Jobs = ({ page, details }) => {
  // let { id } = details
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    if (page == "company") {
      const token = Cookies.get("token")
      const config = {
        headers: {
          authorization: `Bearer ` + token,
        },
      }
      axios
        .get(`${API}/companies/${details.id}?fields=jobs`, config)
        .then((res) => {
          setJobs(res.data.jobs)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  // console.log(jobs)

  return (
    <div className={styles.jobs}>
      <Section title="Jobs">
        <article className={styles.contents}>
          {jobs?.length > 0 ? (
            <>
              {jobs.map(
                ({
                  id,
                  name,
                  created,
                  closeDate,
                  job_type,
                  location,
                  reviews,
                }) => {
                  // let style = { "--rating": reviews * 5 }
                  console.log(id)
                  return (
                    <div className={`${styles.job} card`} key={id}>
                      <div className={styles.time__details}>
                        <h2>
                          <Link href={`/jobs/${id}`}>{name}</Link>
                        </h2>
                        {/* <div className="stars" style={style}></div> */}
                        <p>
                          Posted:{" "}
                          <span> {moment(created).format("MMM DD, YYYY")}</span>
                        </p>
                        <p>
                          Deadline:{" "}
                          <span>
                            {moment(closeDate).format("MMM DD, YYYY HH:mm")}
                          </span>
                        </p>
                      </div>
                      <div className={styles.job__descriptions}>
                        {job_type && (
                          <p>
                            Job Type: <span>{job_type}</span>
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
          ) : (
            <>
              <p>No Jobs found</p>
            </>
          )}
        </article>
      </Section>
    </div>
  )
}

export default Jobs
