import React from "react"
import Link from "next/link"
import Image from "next/image"
import jobs from "../../data/jobs"
import styles from "./related_jobs.module.sass"

const RelatedJobs = () => {
  return (
    <div className={styles.card}>
      <h2>Related Jobs</h2>
      <div className={styles.showcase}>
        {jobs
          .slice(2, 5)
          .map(({ id, company, created_at, close_time, close_date, title }) => (
            <article key={id} className="card">
              <div className={styles.basic__info}>
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
                  <div className={styles.time}>
                    Posted: <span>{created_at}</span>
                  </div>
                  <div className={styles.time}>
                    Deadline:{" "}
                    <span>
                      {close_date}, {close_time}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <h3>
                  <Link href={`/jobs/${id}`}>{title}</Link>
                </h3>
              </div>
            </article>
          ))}
      </div>
      <div className={styles.more__link}>
        <Link href="/jobs">More Jobs</Link>
      </div>
    </div>
  )
}

export default RelatedJobs
