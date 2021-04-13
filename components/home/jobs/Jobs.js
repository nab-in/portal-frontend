import React from "react"
import Template from "../../template/Template"
import Job from "../../job/Job"
import styles from "./jobs.module.sass"
import jobs from "../../../data/jobs"

const Jobs = () => {
  return (
    <Template heading="Recent Jobs">
      <div className={`${styles.template__layout} template__layout`}>
        <div className={`${styles.main__content} main__content`}>
          {jobs.length > 0 &&
            jobs.slice(1, 6).map((job) => <Job job={job} key={job.id} />)}
        </div>
        <div className={`${styles.sub__content} sub__content`}>Sub</div>
      </div>
    </Template>
  )
}

export default Jobs
