import React, { useState } from "react"
import Link from "next/link"
import Linkify from "react-linkify"
import styles from "./job_details.module.sass"
import { useAuthState } from "../../context/auth"

const JobDetails = ({ job }) => {
  let [rate, setRate] = useState(0)
  let { user, isAuthenticated } = useAuthState()
  let { verified, role } = user
  let stars = [1, 2, 3, 4, 5]
  let style = { "--rating": rate }
  let { id, job_type, location, company, email, attachment, descriptions } = job
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
      {!isAuthenticated && (
        <section className={styles.job__footer}>
          <p>
            You need an account to apply for this job. Already have one?{" "}
            <Link href="/login">Login</Link>
          </p>
        </section>
      )}
      {isAuthenticated && verified && role !== company && (
        <section>
          <div className={styles.btns}>
            <button className="btn btn-secondary">Save</button>
            <button className="btn btn-primary">Apply</button>
          </div>
          <div className={styles.rate}>
            <p>Rate this job</p>
            <div className={styles.stars} style={style}>
              {stars.map((star) => (
                <span
                  key={star}
                  className={styles.star}
                  onClick={() => setRate(star)}
                ></span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default JobDetails
