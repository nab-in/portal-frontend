import React, { useEffect, useState } from "react"
import Link from "next/link"
import Template from "../template/Template"
import Job from "../job/Job"
import FilterCriteria from "../filter_criteria/FilterCriteria"
import NewsLetter from "../newsletter/NewsLetter"
import styles from "../../styles/template.module.sass"
import jobs from "../../data/jobs"
import { useAuthState } from "../../context/auth"

// main template to display jobs in landing page and jobs page
const Jobs = ({ search, setSearch, heading, page }) => {
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
  // updating UI
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
          {jobs.length > 0 &&
            jobs.slice(1, 6).map((job) => <Job job={job} key={job.id} />)}
          <div
            className={
              page === "jobs"
                ? `${styles.more__link} ${styles.more__link__center}`
                : `${styles.more__link}`
            }
          >
            {page === "jobs" ? (
              <button className="primary__text">Load More</button>
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
