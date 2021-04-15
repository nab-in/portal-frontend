import React from "react"
import Link from "next/link"
import Linkify from "react-linkify"
import styles from "./job_details.module.sass"

const JobDetails = ({ job }) => {
  let {
    id,
    title,
    job_type,
    location,
    company,
    created_at,
    close_date,
    close_time,
    email,
    attachment,
    descriptions,
    reviews,
  } = job
  return (
    <div className={styles.details}>
      <div className={styles.title}>
        Company/Organisation: <span>{company.name}</span>
      </div>
      <div className={styles.title}>
        Location: <span>{location}</span>
      </div>
      <div className={styles.title}>
        Open To: <span>{job_type}</span>
      </div>
      <div className={styles.title}>
        Email:
        <a href={`mailto:${email}`}>
          <span>{email}</span>
        </a>
      </div>
      <div className={styles.title}>
        Attachment:
        <Link href={`/assets/docs/${attachment}.pdf`}>
          <a target="_blank">
            <span>{attachment}.pdf</span>
          </a>
        </Link>
      </div>
      <div className={styles.descriptions}>
        <Linkify>{descriptions}</Linkify>
      </div>
      <div className={styles.job__footer}>
        <p>
          You need an account to apply for this job. Already have one?{" "}
          <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default JobDetails
