import React, { CSSProperties } from "react"
import Link from "next/link"
import styles from "./job.module.sass"

const Job = ({ job }) => {
  let {
    id,
    name,
    company,
    created_at,
    close_date,
    close_time,
    job_type,
    location,
    reviews,
  } = job
  let style = { "--rating": reviews * 5 }
  return (
    <article className={`card ${styles.job__card}`}>
      <div className={styles.logo__container}>
        <div className={styles.logo}>
          <img
            src={`/assets/companies/logo1.png`}
            alt={`${company?.name} logo`}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.time__details}>
        <h2>
          <Link href={`/jobs/${id}`}>{name}</Link>
        </h2>
        {reviews && <div className="stars" style={style}></div>}
        <p>{/* Posted: <span>{created_at}</span> */}</p>
        <p>
          Deadline: <span>{/* {close_date} {close_time} */}</span>
        </p>
      </div>
      <div className={styles.job__descriptions}>
        <p className={styles.company__name}>
          Company: <span>{company?.name}</span>
        </p>
        <p>{/* Job Type: <span>{job_type}</span> */}</p>
        <p>
          Location: <span>{location}</span>
        </p>
      </div>
    </article>
  )
}

export default Job
