import React, { useState } from "react"
import Hero from "../components/jobs/hero/Hero"
import Jobs from "../components/jobs_template/Jobs"

const jobs = () => {
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
    categories: [],
  })
  return (
    <div className="jobs">
      <Hero setSearch={setSearch} search={search} />
      <main>
        <Jobs
          filter={true}
          search={search}
          setSearch={setSearch}
          heading="Recent Jobs"
        />
      </main>
    </div>
  )
}

export default jobs
