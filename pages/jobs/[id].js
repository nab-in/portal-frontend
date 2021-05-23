import React from "react"
import { useRouter } from "next/router"
import JobDetails from "../../components/job/JobDetails"
import RelatedJobs from "../../components/job/RelatedJobs"
import NewsLetter from "../../components/newsletter/NewsLetter"
import HeroLoader from "../../components/loaders/HeroLoader"
import DetailsLoader from "../../components/loaders/DetailsLoader"
import styles from "../../styles/job.module.sass"
import jobs from "../../data/jobs"
import { useAuthState } from "../../context/auth"

let loading = false

const job = () => {
  let { isAuthenticated } = useAuthState()
  let router = useRouter()
  let id = router.query.id
  let job = jobs.filter((e) => e.id == id)
  let style = { "--rating": job[0]?.reviews * 5 }
  return (
    <div>
      <div className={styles.hero}>
        {loading ? (
          <>
            <HeroLoader />
          </>
        ) : (
          <>
            <div className={styles.container}>
              <div className={styles.logo__container}>
                <div className={styles.logo}>
                  <img
                    src={`/assets/companies/${job[0]?.company.logo}`}
                    alt={`${job[0]?.company.name} logo`}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className={styles.job__heading}>
                <div className={styles.title}>
                  <h1>{job[0]?.title}</h1>
                </div>
                <div className={styles.time__details}>
                  <div className={`${styles.time} ${styles.posted}`}>
                    Posted at:&nbsp; {job[0]?.created_at}
                  </div>
                  <div className={`${styles.time} ${styles.deadline}`}>
                    <span>Deadline: {job[0]?.close_date},</span>
                    <span>{job[0]?.close_time}</span>
                  </div>
                  <div
                    className={`stars bg__stars ${styles.stars}`}
                    style={style}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <main>
        <div className={styles.template}>
          <h1 className="primary__header">Details</h1>
          <div className={`${styles.template__layout} template__layout`}>
            <div className={`${styles.main__content} main__content`}>
              {loading ? (
                <>
                  <DetailsLoader />
                </>
              ) : (
                <>{job[0] && <JobDetails job={job[0]} />}</>
              )}
            </div>
            <div className={`${styles.sub__content} sub__content`}>
              <RelatedJobs />
              {!isAuthenticated && (
                <div className={styles.newsletter}>
                  <NewsLetter />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default job
