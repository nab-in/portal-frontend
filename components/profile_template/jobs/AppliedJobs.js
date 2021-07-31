import { useState, useEffect } from "react"
import Section from "../Section"
import Cookies from "js-cookie"
import axios from "axios"
import { API } from "../../api"

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
        `${API}/users/savedJobs?fields=id,name,company,location,created,closeDate`,
        config
      )
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <Section title="Applied Jobs">
      <article>
        <p>You didn't apply any job</p>
      </article>
    </Section>
  )
}

export default AppliedJobs
