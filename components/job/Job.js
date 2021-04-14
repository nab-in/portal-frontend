import React, { CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import moment from "moment"
import styles from "./job.module.sass"

const Job = ({ job }) => {
  let {
    id,
    title,
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
          <Image
            src={`/assets/companies/${company.logo}`}
            alt={`${company.name} logo`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.time__details}>
        <h3 className="">
          <Link href={`/jobs/${id}`}>{title}</Link>
        </h3>
        <div
          class={`${styles.stars}`}
          style={style}
          aria-label="Rating of this product is 2.3 out of 5."
        >
          {/* &nbsp;
          {Math.round(reviews * 5 * 10) / 10} */}
        </div>
        <p>
          Posted: <span>{created_at}</span>
        </p>
        <p>
          Deadline:{" "}
          <span>
            {close_date} {close_time}
          </span>
        </p>
      </div>
      <div className={styles.job__descriptions}>
        <p className={styles.company__name}>
          Company Name: <span>{company.name}</span>
        </p>
        <p>
          Job Type: <span>{job_type}</span>
        </p>
        <p>
          Location: <span>{location}</span>
        </p>
      </div>
    </article>
  )
}

export default Job
