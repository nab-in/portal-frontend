import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { API } from "../api"
import Loader from "../loaders/CardLoader"
import styles from "./related_jobs.module.sass"
import dayjs from "dayjs"

const RelatedJobs = () => {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios
      .get(
        `${API}/jobs?pageSize=3&fields=name,company,location,closeDate,created,id`
      )
      .then((res) => {
        setJobs(res.data.jobs)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  return (
    <div className={styles.card}>
      <h2>Related Jobs</h2>
      <div className={styles.showcase}>
        {loading ? (
          <>
            <Loader />
            <Loader />
            <Loader />
          </>
        ) : (
          <>
            {jobs.map(
              ({
                id,
                company,
                created,
                closeDate,
                location,
                job_type,
                name,
              }) => (
                <article key={id} className="card">
                  <div className={styles.basic__info}>
                    <div className={styles.logo__container}>
                      <div className={styles.logo}>
                        <img
                          src={company?.logo}
                          alt={`${company?.name} logo`}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className={styles.time__details}>
                      <p className={styles.time}>
                        Posted:{" "}
                        <span>{dayjs(created).format("MMM DD, YYYY")}</span>
                      </p>
                      <p className={styles.time}>
                        Deadline:{" "}
                        <span>
                          {dayjs(closeDate).format("MMM DD, YYYY HH:mm")}
                        </span>
                      </p>
                    </div>
                    <div className={styles.company__info}>
                      <p>
                        Company name: <span>{company?.name}</span>
                      </p>
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
                  <div className={styles.title}>
                    <h3>
                      <Link href={`/jobs/${id}`}>{name}</Link>
                    </h3>
                  </div>
                </article>
              )
            )}
          </>
        )}
      </div>
      <div className={styles.more__link}>
        <Link href="/jobs">More Jobs</Link>
      </div>
    </div>
  )
}

export default RelatedJobs
