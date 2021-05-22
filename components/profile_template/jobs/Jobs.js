import React from "react"
import Link from "next/link"
import Section from "../Section"
import styles from "./jobs.module.sass"
import jobs from "../../../data/jobs"

const Jobs = ({ page, details }) => {
  let { id } = details
  let company_jobs
  if (page == "company") {
    company_jobs = jobs.filter((job) => job.company.id == id)
  }

  return (
    <div className={styles.jobs}>
      <Section title="Jobs">
        <article className={styles.contents}>
          {company_jobs?.length > 0 ? (
            <>
              {company_jobs.map(
                ({
                  id,
                  title,
                  created_at,
                  close_date,
                  close_time,
                  job_type,
                  location,
                  reviews,
                }) => {
                  let style = { "--rating": reviews * 5 }
                  return (
                    <div className={`${styles.job} card`} key={id}>
                      <div className={styles.time__details}>
                        <h2>
                          <Link href={`/jobs/${id}`}>{title}</Link>
                        </h2>
                        <div className="stars" style={style}></div>
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
                        <p>
                          Job Type: <span>{job_type}</span>
                        </p>
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
              <h3>No Jobs found</h3>
            </>
          )}
        </article>
      </Section>
    </div>
  )
}

export default Jobs
