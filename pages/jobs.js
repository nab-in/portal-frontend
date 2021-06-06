import React, { useState, useEffect } from "react"
import Hero from "../components/filter_hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import categories from "../data/categories"
import { API } from "../components/api"

const jobs = ({ jobs }) => {
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
    categories: [],
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (jobs) setLoading(false)
  }, [jobs])
  return (
    <div className="jobs">
      <Hero
        setSearch={setSearch}
        search={search}
        categories={categories}
        title="Search for different Jobs."
      />
      <main>
        <Jobs
          filter={true}
          search={search}
          setSearch={setSearch}
          heading="Recent Jobs"
          page="jobs"
          jobs={jobs}
          loading={loading}
        />
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

export default jobs
