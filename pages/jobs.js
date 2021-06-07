import React, { useState, useEffect } from "react"
import Router, { useRouter } from "next/router"
import Hero from "../components/filter_hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import categories from "../data/categories"
import { API } from "../components/api"

const jobs = ({ data }) => {
  const [loadMore, setLoadMore] = useState(false)
  let [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
    categories: [],
  })
  let router = useRouter()
  const startLoading = () => setLoadMore(true)
  const stopLoading = () => setLoadMore(false)
  useEffect(() => {
    if (data) {
      setLoading(false)
      setJobs(jobs.concat(data.jobs))
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
          let query = router.query
          query.page = parseInt(data.pager.page) + 1
          router.push({
            pathname: router.pathname,
            query: query,
          })
        }
      }
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading)
    Router.events.on("routeChangeComplete", stopLoading)
    return () => {
      Router.events.off("routeChangeStart", startLoading)
      Router.events.off("routeChangeComplete", stopLoading)
    }
  }, [])
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

export async function getServerSideProps({ query }) {
  let page = query.page || 1
  let data = null
  const res = await fetch(`${API}/jobs?page=${page}&pageSize=8`)
  data = await res.json()

  return {
    props: {
      data,
    },
  }
}

export default jobs
