import React, { useState } from "react"
import Hero from "../components/filter_hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import categories from "../data/categories"

const jobs = () => {
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
    categories: [],
  })
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
        />
      </main>
    </div>
  )
}

export default jobs
