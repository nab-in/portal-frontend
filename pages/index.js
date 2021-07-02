import React, { useEffect, useState } from "react"
import Head from "next/head"
import Hero from "../components/home/hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import Companies from "../components/home/companies/Companies"
import { API } from "../components/api"

const Home = ({ data, companies, error }) => {
  const [loading, setLoading] = useState(true)
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
      if ((JSON.parse(error).code = "EHOSTUNREACH"))
        setMessage(
          "Client error, please make sure you are connected to internet"
        )
    }
  }, [error])
  useEffect(() => {
    if (companies) setLoadCompanies(false)
  }, [companies])
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
          loading={loading}
          setLoading={setLoading}
        />
        <Companies companies={companies} loading={loadCompanies} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  let data = null
  let companies = null
  let error = null
  try {
    const res = await fetch(`${API}/jobs?pageSize=8`)
    companies = await (await fetch(`${API}/companies`)).json()
    data = await res.json()
  } catch (err) {
    error = JSON.stringify(err)
  }

  return {
    props: {
      error,
      data,
      companies,
    },
  }
}

export default Home
