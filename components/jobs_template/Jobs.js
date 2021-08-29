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
              <>
                {results != null && typeof results == "object" ? (
                  <>
                    {results?.length > 0 ? (
                      <>
                        <p>Showing {number} results</p>
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
              {errors?.msg && (
                <p className={`alerts ${errors?.type}`}>{errors.msg}</p>
              )}
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
                {message ? (
                  <p>{message}</p>
                ) : (
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
                )}
              </>
            ) : (
              <Link href="/jobs">More Jobs &gt;&gt;</Link>
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
