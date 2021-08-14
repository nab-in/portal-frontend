import React, { useEffect, useState } from "react"
import Link from "next/link"
import { IoMdRefresh } from "react-icons/io"
import Template from "../template/Template"
import Job from "../job/Job"
import Loader from "../loaders/CardLoader"
import Spinner from "../loaders/ButtonLoader"
import FilterCriteria from "../filter_criteria/FilterCriteria"
import NewsLetter from "../newsletter/NewsLetter"
import styles from "../../styles/template.module.sass"
import { useAuthState } from "../../context/auth"
import { API } from "../api"
import axios from "axios"
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
}) => {
  let [filter, setFilter] = useState(false)

  let { isAuthenticated } = useAuthState()

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
  return (
    <Template heading={filter ? "Filter Criteria" : heading}>
      <div
        className={
          isAuthenticated
            ? `${styles.template__layout} template__layout full__width`
            : `${styles.template__layout} template__layout`
        }
      >
        <div className={`${styles.main__content} main__content`}>
          <FilterCriteria search={search} setSearch={setSearch} />
          {filter && <h3 className={styles.results__header}>Results</h3>}
          {loading ? (
            <>
              <Loader stars={true} />
              <Loader stars={true} />
              <Loader stars={true} />
            </>
          ) : (
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
                    <></>
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
          {message && <p>{message}</p>}
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
                  <></>
                ) : (
                  <>{loadMore ? <Spinner bg="light" /> : <></>}</>
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
