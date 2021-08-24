import Link from "next/link"
import dayjs from "dayjs"
import styles from "./job.module.sass"

const Job = ({ job }) => {
  let { id, name, company, created, closeDate, job_type, location } = job
  return (
    <article className={`card ${styles.job__card}`}>
      <div className={styles.logo__container}>
        <div className={styles.logo}>
          <img
            src={company?.logo}
            alt={`${job?.company?.name} logo`}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.time__details}>
        <h2>
          <Link href={`/jobs/${id}`}>{name}</Link>
        </h2>
        <p>
          Posted: <span> {dayjs(created).format("MMM DD, YYYY")}</span>
        </p>
        <p>
          Deadline: <span>{dayjs(closeDate).format("MMM DD, YYYY HH:mm")}</span>
        </p>
      </div>
      <div className={styles.job__descriptions}>
        <p className={styles.company__name}>
          Company:{" "}
          <Link href={`/companies/${job.company?.id}`}>
            <a>{job?.company?.name}</a>
          </Link>
        </p>
        {job_type && (
          <p>
            Job Type: <span>{job_type}</span>
          </p>
        )}
        {location && (
          <p>
            Location: <span>{location}</span>
          </p>
        )}
      </div>
    </article>
  )
}

export default Job
