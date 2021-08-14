import { useState, useEffect } from "react"
import Hero from "../components/filter_hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import { API } from "../components/api"
import axios from "axios"
import infiniteScroll, { searching } from "../components/infiniteScroll"

const jobs = ({ data, error }) => {
  // states
  let [loadMore, setLoadMore] = useState(false)
  let [categories, setCategories] = useState([])
  let [page, setPage] = useState(data?.pager.page + 1)
  let [pages, setPages] = useState(data?.pager.page < data?.pager.pageCount)
  let [resultsPage, setResultsPage] = useState(1)
  let [resultsPages, setResultsPages] = useState(true)
  let [jobs, setJobs] = useState([])
  let [errors, setErrors] = useState(null)
  let [results, setResults] = useState(null)
  let [message, setMessage] = useState(null)
  let [loading, setLoading] = useState(true)
  let [number, setNumber] = useState(0)
  let [url, setUrl] = useState("")
  let [searchUrl, setSearchUrl] = useState(
    `${API}/jobs?pageSize=2&page=${resultsPage}&fields=name,title,closeDate,created,company,id,location${url}`
  )
  let [search, setSearch] = useState({
    name: "",
    location: "",
    categories: [],
  })

  let pageName = "jobs"

  let apiUrl = `${API}/jobs?pageSize=2&page=${page}&fields=name,title,closeDate,created,company,id,location`

  // updating UI

  useEffect(() => {
    searching({
      searchUrl,
      url,
      setLoading,
      setErrors,
      pageName,
      setResults,
      resultsPage,
      setResultsPage,
      resultsPages,
      setResultsPages,
      setNumber,
      search,
    })
    setResultsPages(true)
    setResultsPage(1)
    setSearchUrl(
      `${API}/jobs?pageSize=2&page=1&fields=name,title,closeDate,created,company,id,location${url}`
    )
  }, [search, url])

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
    axios
      .get(`${API}/jobCategories?fields=id,name,children[id, name]`)
      .then((res) => {
        setCategories(res.data.jobCategories)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleScroll = () => {
    setSearchUrl(
      `${API}/jobs?pageSize=2&page=${resultsPage}&fields=name,title,closeDate,created,company,id,location${url}`
    )
    infiniteScroll({
      apiUrl,
      searchUrl,
      resultsPage,
      setResultsPage,
      resultsPages,
      setResultsPages,
      url,
      setErrors,
      setPages,
      setPage,
      setItems: setJobs,
      setResults,
      items: jobs,
      results,
      page,
      loadMore,
      setLoadMore,
      data,
      pageName,
      setMessage,
      pages,
      search,
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

  return (
    <div className="jobs">
      <Hero
        setSearch={setSearch}
        search={search}
        categories={categories}
        title="Search for different Jobs."
        url={url}
        setUrl={setUrl}
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
          setLoading={setLoading}
          loadMore={loadMore}
          message={message}
          results={results}
          setResults={setResults}
          url={url}
          setUrl={setUrl}
          number={number}
        />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  let data = null
  let error = null
  try {
    const res = await fetch(
      `${API}/jobs?pageSize=2&fields=name,title,closeDate,created,company,id,location`
    )
    data = await res.json()
  } catch (err) {
    console.log(err)
    error = JSON.stringify(err)
  }

  return {
    props: {
      error,
      data,
    },
  }
}

export default jobs
