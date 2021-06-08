import React, { useEffect, useState } from "react"
import Head from "next/head"
import Hero from "../components/home/hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import Companies from "../components/home/companies/Companies"
import { API } from "../components/api"

const Home = ({ data, companies, error }) => {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [loadCompanies, setLoadCompanies] = useState(true)
  useEffect(() => {
    if (data) {
      setLoading(false)
      setJobs(data.jobs)
    }
  }, [data])
  useEffect(() => {
    if (error) {
      setLoading(false)
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
        <Jobs heading="Recent Jobs" jobs={jobs} loading={loading} />
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
    error = "Internal server error"
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
