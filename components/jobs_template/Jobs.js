import React from "react"
import Link from "next/link"
import Template from "../template/Template"
import Job from "../job/Job"
import FilterCriteria from "../jobs/filter_criteria/FilterCriteria"
import NewsLetter from "../newsletter/NewsLetter"
import styles from "./jobs.module.sass"
import jobs from "../../data/jobs"

const Jobs = ({ filter, search, setSearch, heading }) => {
  return (
    <Template
      heading={
        typeof search === "object" && Object.keys(search).length > 0
          ? "Filter Criteria"
          : heading
      }
    >
      <div className={`${styles.template__layout} template__layout`}>
        <div className={`${styles.main__content} main__content`}>
          <FilterCriteria search={search} setSearch={setSearch} />
          {jobs.length > 0 &&
            jobs.slice(1, 6).map((job) => <Job job={job} key={job.id} />)}
          <div className={styles.more__link}>
            <Link href="/jobs">More Jobs &gt;&gt;</Link>
          </div>
        </div>
        <div className={`${styles.sub__content} sub__content`}>
          <NewsLetter />
        </div>
      </div>
    </Template>
  )
}

export default Jobs
