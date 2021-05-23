import React from "react"
import Link from "next/link"
import Image from "next/image"
import Loader from "../loaders/CardLoader"
import jobs from "../../data/jobs"
import styles from "./related_jobs.module.sass"

let loading = false

const RelatedJobs = () => {
  return (
    <div className={styles.card}>
      <h2>Related Jobs</h2>
      <div className={styles.showcase}>
        {loading ? (
          <>
            <Loader stars={true} />
            <Loader stars={true} />
            <Loader stars={true} />
          </>
        ) : (
          <>
            {jobs
              .slice(2, 5)
              .map(
                ({
                  id,
                  company,
                  created_at,
                  close_time,
                  close_date,
                  title,
                  location,
                  job_type,
                }) => (
                  <article key={id} className="card">
                    <div className={styles.basic__info}>
                      <div className={styles.logo__container}>
                        <div className={styles.logo}>
                          <img
                            src={`/assets/companies/${company.logo}`}
                            alt={`${company.name} logo`}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className={styles.time__details}>
                        <p className={styles.time}>
                          Posted: <span>{created_at}</span>
                        </p>
                        <p className={styles.time}>
                          Deadline:{" "}
                          <span>
                            {close_date}, {close_time}
                          </span>
                        </p>
                      </div>
                      <div className={styles.company__info}>
                        <p>
                          Company name: <span>{company.name}</span>
                        </p>
                        <p>
                          Job Type: <span>{job_type}</span>
                        </p>
                        <p>
                          Location: <span>{location}</span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.title}>
                      <h3>
                        <Link href={`/jobs/${id}`}>{title}</Link>
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
