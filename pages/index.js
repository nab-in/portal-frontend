import { useEffect, useState } from "react"
import Head from "next/head"
import Hero from "../components/home/hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import Companies from "../components/home/companies/Companies"
import { API } from "../components/api"
import axios from "axios"

const Home = ({ data, error, companiesErr, companiesData }) => {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)
  const [companyErrors, setCompanyErrors] = useState(null)
  const [jobs, setJobs] = useState([])
  const [message, setMessage] = useState(null)
  const [companyMsg, setCompanyMsg] = useState(null)
  const [companies, setCompanies] = useState([])
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
        if (JSON.parse(error)?.code === "ECONNREFUSED") {
          setErrors({
            type: "danger",
            msg: "Failed to connect, please refresh",
          })
        } else {
          setErrors({
            type: "danger",
            msg: JSON.parse(error)?.message,
          })
        }
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
        if (JSON.parse(error)?.code === "ECONNREFUSED") {
          setCompanyErrors({
            type: "danger",
            msg: "Failed to connect",
          })
        } else {
          setCompanyErrors({
            type: "danger",
            msg: JSON.parse(error)?.message,
          })
        }
      } else {
        setCompanyErrors({
          type: "danger",
          msg: "Internal server error",
        })
      }
    }
  }, [companiesErr])

  useEffect(() => {
    if (companiesData) {
      setLoadCompanies(false)
      if (companiesData?.companies.length === 0) {
        setCompanyMsg("Ooops not a single company found")
      } else {
        setCompanies(companiesData?.companies)
      }
    }
  }, [companiesData])

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
          setMessage(null)
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

  const refreshCompanies = () => {
    setLoadCompanies(true)
    axios
      .get(`${API}/companies?pageSize=6&fields=name,id,logo`)
      .then((res) => {
        if (res?.data?.companies?.length === 0) {
          setCompanyMsg("Oops No company found")
        } else {
          setCompa(res.data.jobs)
          setMessage(null)
        }
        setLoadCompanies(false)
      })
      .catch((err) => {
        setLoadCompanies(false)
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
          message={companyMsg}
          refresh={refreshCompanies}
        />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  let data = null
  let companiesData = null
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
    companiesData = await (
      await fetch(`${API}/companies?pageSize=6&fields=name,id,logo`)
    ).json()
  } catch (err) {
    companiesErr = JSON.stringify(err)
  }

  return {
    props: {
      error,
      companiesErr,
      data,
      companiesData,
    },
  }
}

export default Home
