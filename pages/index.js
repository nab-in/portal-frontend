import React, { useEffect, useState } from "react"
import Head from "next/head"
import Hero from "../components/home/hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import Companies from "../components/home/companies/Companies"
import { API } from "../components/api"

const Home = ({ jobs }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (jobs) setLoading(false)
  }, [jobs])
  return (
    <div>
      <Head>
        <title>Job Portal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <main>
        <Jobs heading="Recent Jobs" jobs={jobs} loading={loading} />
        <Companies />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API}/jobs`)
  const jobs = await res.json()

  return {
    props: {
      jobs,
    },
  }
}

export default Home
