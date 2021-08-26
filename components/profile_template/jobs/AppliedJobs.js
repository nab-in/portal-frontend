import { useState, useEffect } from "react"
import Section from "../Section"
import Cookies from "js-cookie"
import axios from "axios"
import { API } from "../../api"
import Job from "../../job/Job"

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    const token = Cookies.get("token")
    const config = {
      headers: {
        authorization: `Bearer ` + token,
      },
    }
    axios
      .get(
        `${API}/users/appliedJobs?fields=id,name,companies,jobType,location,created,closeDate`,
        config
      )
      .then((res) => {
        console.log(res.data?.jobs)
        setJobs(res.data.jobs)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Section title="Applied Jobs">
      <article>
        {jobs?.length > 0 ? (
          <>
            {jobs.map((job) => (
              <Job key={job.id} job={job} />
            ))}
          </>
        ) : (
          <p>You didn't apply any job</p>
        )}
      </article>
    </Section>
  )
}

export default AppliedJobs
