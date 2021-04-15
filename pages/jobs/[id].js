import React from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import JobDetails from "../../components/job/JobDetails"
import styles from "../../styles/job.module.sass"
import jobs from "../../data/jobs"

const job = () => {
  let router = useRouter()
  let id = router.query.id
  let job = jobs.filter((e) => e.id == id)
  let style = { "--rating": job[0]?.reviews * 5 }
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.logo__container}>
            <div className={styles.logo}>
              <Image
                src={`/assets/companies/${job[0]?.company.logo}`}
                alt={`${job[0]?.company.name} logo`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className={styles.job__heading}>
            <div className={styles.title}>
              <h2>{job[0]?.title}</h2>
              <div className="stars bg__stars" style={style}></div>
            </div>
            <div className={styles.time__details}>
              <div className={`${styles.time} ${styles.posted}`}>
                Posted at:&nbsp; {job[0]?.created_at}
              </div>
              <div className={`${styles.time} ${styles.deadline}`}>
                <span>Deadline: {job[0]?.close_date},</span>
                <span>{job[0]?.close_time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className={styles.template}>
          <h1 className="primary__header">Details</h1>
          <div className={`${styles.template__layout} template__layout`}>
            <div className={`${styles.main__content} main__content`}>
              {job[0] && <JobDetails job={job[0]} />}
            </div>
            <div className={`${styles.sub__content} sub__content`}>
              Related Jobs
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default job
