import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import dayjs from "dayjs"
import { GoVerified } from "react-icons/go"
import JobDetails from "../../components/job/JobDetails"
import RelatedJobs from "../../components/job/RelatedJobs"
import NewsLetter from "../../components/newsletter/NewsLetter"
import HeroLoader from "../../components/loaders/HeroLoader"
import DetailsLoader from "../../components/loaders/DetailsLoader"
import styles from "../../styles/job.module.sass"
import { API } from "../../components/api"
import { useAuthState } from "../../context/auth"
import Error from "../../components/error/Error"
import axios from "axios"

const job = ({ data, error }) => {
  let [loading, setLoading] = useState(true)
  let { isAuthenticated } = useAuthState()
  let [job, setJob] = useState(null)
  const router = useRouter()

  // useEffect(() => {
  //   if (data) {
  //     setJob(data)
  //     setLoading(false)
  //   }
  // }, [data])
  // useEffect(() => {
  //   if (error) {
  //     setLoading(false)
  //   }
  // }, [error])

  useEffect(() => {
    let mounted = true
    if (mounted)
      axios
        .get(
          `${API}/jobs/${router.query.id}?fields=openTo,jobType,name,title,closeDate,created,company,id,description,bio,location,email,attachment`
        )
        .then((res) => {
          setJob(res.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
        })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div>
      {loading ? (
        <>
          <div className={styles.hero}>
            <HeroLoader />
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
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          {job?.id ? (
            <>
              <div className={styles.hero}>
                <>
                  <div className={styles.container}>
                    <div className={styles.logo__container}>
                      <div className={styles.logo}>
                        <img
                          src={job.company?.logo}
                          alt={`${job?.name} logo`}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className={styles.job__heading}>
                      <div className={styles.title}>
                        <h1>
                          <span className={styles.name}>{job.name}</span>
                          <span
                            className={
                              job?.company?.verified === "true"
                                ? "badge verified"
                                : "badge unverified"
                            }
                          >
                            {job?.company?.verified === "true" ? (
                              <>
                                Verified <GoVerified className="icon" />
                              </>
                            ) : (
                              "Not Verified"
                            )}
                          </span>
                        </h1>
                      </div>
                      <div className={styles.time__details}>
                        <div className={`${styles.time} ${styles.posted}`}>
                          Posted at:&nbsp;{" "}
                          {dayjs(job.created).format("MMM DD, YYYY")}
                        </div>
                        <div className={`${styles.time} ${styles.deadline}`}>
                          <span>
                            Deadline:{" "}
                            {dayjs(job.closeDate).format("MMM DD, YYYY HH:mm")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
              <main>
                <div className={styles.template}>
                  <h1 className="primary__header">Details</h1>
                  <div
                    className={`${styles.template__layout} template__layout`}
                  >
                    <div className={`${styles.main__content} main__content`}>
                      {job && <JobDetails job={job} />}
                    </div>
                    <div className={`${styles.sub__content} sub__content`}>
                      <RelatedJobs job={job} />
                      {!isAuthenticated && (
                        <div className={styles.newsletter}>
                          <NewsLetter />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </>
          ) : (
            <Error />
          )}
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  let data = null
  let error = null
  try {
    const res = await fetch(
      `${API}/jobs/${context.params.id}?fields=openTo,jobType,name,title,closeDate,created,company,id,description,bio,location,email,attachment`
    )
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
