import React, { useEffect, useState } from "react"
import Head from "next/head"
import Hero from "../components/home/hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import Companies from "../components/home/companies/Companies"
import { API } from "../components/api"

const Home = ({ jobs, companies }) => {
  const [loading, setLoading] = useState(true)
  const [loadCompanies, setLoadCompanies] = useState(true)
  useEffect(() => {
    if (jobs) setLoading(false)
  }, [jobs])
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

export async function getStaticProps() {
  const res = await fetch(`${API}/jobs`)
  const companies = await (await fetch(`${API}/companies`)).json()
  const jobs = await res.json()

  return {
    props: {
      jobs,
      companies,
    },
  }
}

export default Home
