import React, { useEffect, useState } from "react"
import Head from "next/head"
import Hero from "../components/home/hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import Companies from "../components/home/companies/Companies"
import { API } from "../components/api"
import axios from "axios"

const Home = ({ data, companies, error, companiesErr }) => {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)
  const [companyErrors, setCompanyErrors] = useState(null)
  const [jobs, setJobs] = useState([])
  let [message, setMessage] = useState(null)
  const [loadCompanies, setLoadCompanies] = useState(true)

  useEffect(() => {
    if (data) {
      setLoading(false)
      setJobs(data.jobs)
      if (data.jobs.length === 0) setMessage("Ooops! not a single job found")
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setLoading(false)
      if (JSON.parse(error)?.response) {
        setErrors({
          type: "danger",
          msg: JSON.parse(error)?.response?.data?.message,
        })
      } else if (JSON.parse(error)?.message) {
        setErrors({
          type: "danger",
          msg: JSON.parse(error)?.message,
        })
      } else {
        setErrors({
          type: "danger",
          msg: "Internal server error",
        })
      }
    }
  }, [error])

  useEffect(() => {
    if (companiesErr) {
      setLoadCompanies(false)
      if (JSON.parse(error)?.response) {
        setCompanyErrors({
          type: "danger",
          msg: JSON.parse(error)?.response?.data?.message,
        })
      } else if (JSON.parse(error)?.message) {
        setCompanyErrors({
          type: "danger",
          msg: JSON.parse(error)?.message,
        })
      } else {
        setCompanyErrors({
          type: "danger",
          msg: "Internal server error",
        })
      }
    }
  }, [companiesErr])

  useEffect(() => {
    if (companies) setLoadCompanies(false)
  }, [companies])

  const refreshJobs = () => {
    setLoading(true)
    axios
      .get(
        `${API}/jobs?pageSize=8&fields=name,title,closeDate,created,company,id,location`
      )
      .then((res) => {
        if (res?.data?.jobs?.length === 0) {
          setMessage("Ooops! not a single job found")
        } else {
          setJobs(res.data.jobs)
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        if (err?.response) {
          setErrors({
            type: "danger",
            msg: err?.response?.data?.message,
          })
        } else if (err?.message) {
          setErrors({
            type: "danger",
            msg: err?.message,
          })
        } else {
          setErrors({
            type: "danger",
            msg: "Internal server error",
          })
        }
      })
  }

  return (
    <div>
      <Head>
        <title>Job Portal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <main>
        <Jobs
          heading="Recent Jobs"
          jobs={jobs}
          message={message}
          error={errors}
          loading={loading}
          refresh={refreshJobs}
        />
        <Companies
          companies={companies}
          loading={loadCompanies}
          error={companyErrors}
        />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  let data = null
  let companies = null
  let error = null
  let companiesErr = null
  try {
    const res = await fetch(
      `${API}/jobs?pageSize=8&fields=name,title,closeDate,created,company,id,location`
    )
    data = await res.json()
  } catch (err) {
    error = JSON.stringify(err)
  }

  try {
    companies = await (await fetch(`${API}/companies`)).json()
  } catch (err) {
    companiesErr = JSON.stringify(err)
  }

  return {
    props: {
      error,
      companiesErr,
      data,
      companies,
    },
  }
}

export default Home
