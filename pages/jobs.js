import React, { useState, useEffect } from "react"
// import Router, { useRouter } from "next/router"
import Hero from "../components/filter_hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import categories from "../data/categories"
import { API } from "../components/api"
import axios from "axios"

const jobs = ({ data }) => {
  const [loadMore, setLoadMore] = useState(false)
  let [page, setPage] = useState(data?.pager.page + 1)
  let [pages, setPages] = useState(false)
  let [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
    categories: [],
  })

  useEffect(() => {
    if (data) {
      setLoading(false)
      setJobs(data.jobs)
    }
  }, [data])
  const handleScroll = () => {
    let jobCards = document.querySelectorAll(".main__content > .card")
    let lastJob = jobCards[jobCards.length - 1]
    if (lastJob) {
      let lastJobOffset = lastJob.offsetTop + lastJob.clientHeight
      let pageOffset = window.pageYOffset + window.innerHeight
      if (pageOffset > lastJobOffset) {
        if (data?.pager.page < data?.pager.pageCount && !loadMore) {
          setLoadMore(true)
          axios
            .get(`${API}/jobs?page=${page}&pageSize=3`)
            .then((res) => {
              if (res.data) {
                setPages(true)
                // setPages(res.data.pager.page < res.data.pager.pageCount)
                setJobs(jobs.concat(res.data.jobs))
              }
            })
            .catch((err) => console.log(err))
          setPage(parseInt(page) + 1)
          console.log(pages)
          if (pages) {
            handleScroll()
            console.log("here")
          }
        }
      }
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

  console.log(jobs, page, pages, data)
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
          loadMore={loadMore}
        />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  let data = null
  try {
    const res = await fetch(`${API}/jobs?pageSize=3`)
    data = await res.json()
  } catch (err) {
    console.log(err)
  }

  return {
    props: {
      data,
    },
  }
}

export default jobs
