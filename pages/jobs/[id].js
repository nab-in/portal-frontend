import React from "react"
import JobDetails from "../../components/job/JobDetails"
import RelatedJobs from "../../components/job/RelatedJobs"
import NewsLetter from "../../components/newsletter/NewsLetter"
import HeroLoader from "../../components/loaders/HeroLoader"
import DetailsLoader from "../../components/loaders/DetailsLoader"
import styles from "../../styles/job.module.sass"
import { API } from "../../components/api"
import { useAuthState } from "../../context/auth"

let loading = false

const job = ({ data }) => {
  let { isAuthenticated } = useAuthState()
  let job = data
  console.log(job)
  let style = { "--rating": 0.85 * 5 }
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
                    src={`/assets/companies/logo1.png`}
                    alt={`${job.name} logo`}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className={styles.job__heading}>
                <div className={styles.title}>
                  <h1>{job.name}</h1>
                </div>
                <div className={styles.time__details}>
                  <div className={`${styles.time} ${styles.posted}`}>
                    Posted at:&nbsp; {job.created}
                  </div>
                  <div className={`${styles.time} ${styles.deadline}`}>
                    <span>Deadline: {job.created},</span>
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
                <>{job && <JobDetails job={job} />}</>
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

export async function getServerSideProps(context) {
  let data = null
  let error = null
  try {
    const res = await fetch(`${API}/jobs/${context.params.id}`)
    data = await res.json()
  } catch (err) {
    error = JSON.stringify(err)
  }

  return {
    props: {
      error,
      data,
    },
  }
}

export default job
