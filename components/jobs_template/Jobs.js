import React, { useEffect, useState } from "react"
import Link from "next/link"
import Template from "../template/Template"
import Job from "../job/Job"
import Loader from "../loaders/CardLoader"
import Spinner from "../loaders/ButtonLoader"
import FilterCriteria from "../filter_criteria/FilterCriteria"
import NewsLetter from "../newsletter/NewsLetter"
import styles from "../../styles/template.module.sass"
import { useAuthState } from "../../context/auth"
import Swiper from "./swiper"
import { FaSync } from "react-icons/fa"

// main template to display jobs in landing page and jobs page
const Jobs = ({
  search,
  setSearch,
  heading,
  page,
  jobs,
  loading,
  results,
  loadMore,
  message,
  number,
  url,
  setUrl,
  errors,
  error,
  refresh,
  loadMoreJobs,
}) => {
  let [filter, setFilter] = useState(false)

  let { isAuthenticated, categories } = useAuthState()

  // check if search object has any value to dynamically render heading
  let checkSearch = (obj) => {
    for (let key in obj) {
      if (obj[key] !== null && obj[key].length > 0) {
        setFilter(true)
        return
      }
      if (obj[key] == [] && obj.categories.length > 0) {
        setFilter(true)
        return
      }
      setFilter(false)
      return
    }
  }

  useEffect(() => {
    checkSearch(search)
  }, [search])

  const filters = (
    <div className={styles.categories}>
      {categories?.length > 0 && (
        <>
          <p>Filter By</p>
          <Swiper
            categories={categories}
            search={search}
            setSearch={setSearch}
            url={url}
            setUrl={setUrl}
          />
        </>
      )}
    </div>
  )

  return (
    <Template
      heading={filter ? "Filter Criteria" : heading}
      filters={page == "jobs" ? filters : ""}
    >
      <div
        className={
          isAuthenticated
            ? `${styles.template__layout} template__layout full__width`
            : `${styles.template__layout} template__layout`
        }
      >
        <div className={`${styles.main__content} main__content`}>
          <FilterCriteria
            search={search}
            setSearch={setSearch}
            url={url}
            setUrl={setUrl}
          />
          {filter && <h3 className={styles.results__header}>Results</h3>}
          {loading ? (
            <>
              <Loader stars={false} />
              <Loader stars={false} />
              <Loader stars={false} />
            </>
          ) : (
            <>
              {errors?.type === "normal" ? (
                <p className="alerts danger">{errors?.msg}</p>
              ) : (
                <>
                  {(jobs?.length > 0 || results?.length > 0) && (
                    <p
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      Showing {number} results
                    </p>
                  )}
                  {results != null && typeof results == "object" ? (
                    <>
                      {results?.length > 0 ? (
                        <>
                          {results.map((job) => (
                            <Job job={job} key={job.id} />
                          ))}
                        </>
                      ) : (
                        <p>No Job match your Criteria</p>
                      )}
                    </>
                  ) : (
                    <>
                      {jobs?.length > 0 ? (
                        <>
                          {jobs.map((job) => (
                            <Job job={job} key={job.id} />
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              )}

              {page !== "jobs" && message && !loading && <p>{message}</p>}
              {errors?.type === "infinite" && (
                <p className={`alerts danger`}>{errors.msg}</p>
              )}
              {error?.msg && <p className={`alerts danger`}>{error.msg}</p>}
            </>
          )}
          <div
            className={
              page === "jobs"
                ? `${styles.more__link} ${styles.more__link__center}`
                : `${styles.more__link}`
            }
          >
            {page === "jobs" ? (
              <>
                {message && !loading ? (
                  <p>{message}</p>
                ) : (
                  <>
                    {jobs?.length > 0 || results?.length > 0 ? (
                      <>
                        {loadMore ? (
                          <Spinner bg="light" />
                        ) : (
                          <>
                            <button
                              className="primary__text"
                              onClick={loadMoreJobs}
                            >
                              Load More
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={refresh}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <FaSync
                            className={loading ? `spinner` : ``}
                            style={{
                              fontSize: "1.8rem",
                              color: "gray",
                            }}
                          />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {(message || error?.msg) && jobs?.length === 0 ? (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <button
                      onClick={refresh}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <FaSync
                        className={loading ? `spinner` : ``}
                        style={{
                          fontSize: "1.8rem",
                          color: "gray",
                        }}
                      />
                    </button>
                  </div>
                ) : (
                  <Link href="/jobs">More Jobs &gt;&gt;</Link>
                )}
              </>
            )}
          </div>
        </div>
        {!isAuthenticated && (
          <div className={`${styles.sub__content} sub__content newslatter`}>
            <NewsLetter />
          </div>
        )}
      </div>
    </Template>
  )
}

export default Jobs
