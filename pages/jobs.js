import { useState, useEffect } from "react"
import Hero from "../components/filter_hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
import { API } from "../components/api"
import axios from "axios"
import infiniteScroll, { searching } from "../components/infiniteScroll"
import { useAuthDispatch, useAuthState } from "../context/auth"

const jobs = ({ data, error }) => {
  // states
  let [loadMore, setLoadMore] = useState(false)
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
    `${API}/jobs?pageSize=8&page=1&fields=name,title,closeDate,created,company,id,location${url}`
  )
  let [search, setSearch] = useState({
    name: "",
    location: "",
    categories: [],
  })

  let pageName = "jobs"

  let apiUrl = `${API}/jobs?pageSize=8&page=${page}&fields=name,title,closeDate,created,company,id,location`

  const { categories } = useAuthState()
  const dispatch = useAuthDispatch()

  useEffect(() => {
    if (
      search?.name?.trim().length == 0 &&
      search?.location?.trim().length == 0 &&
      search?.categories?.length == 0
    )
      setResultsPages(true)
    setResultsPage(1)
    let searchingUrl = `${API}/jobs?pageSize=8&page=1&fields=name,title,closeDate,created,company,id,location${url}`

    searching({
      setResults,
      setLoading,
      setErrors,
      pageName,
      searchingUrl,
      setResultsPage,
      setResultsPages,
      search,
      setNumber,
      setMessage,
    })
  }, [search, url])

  useEffect(() => {
    if (data) {
      setLoading(false)
      setJobs(data.jobs)
      setNumber(data.pager?.total)
      if (data.jobs.length === 0) setMessage("Ooops! not a single job found")
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setLoading(false)
      if (JSON.parse(error)?.response) {
        setErrors({
          type: "normal",
          msg: JSON.parse(error)?.data?.message,
        })
      } else if (JSON.parse(error)?.message) {
        if (JSON.parse(error)?.code === "ECONNREFUSED") {
          setErrors({
            type: "normal",
            msg: "Failed to connect, please refresh",
          })
        } else {
          setErrors({
            type: "normal",
            msg: JSON.parse(error)?.message,
          })
        }
      } else {
        setErrors({
          type: "normal",
          msg: "Internal server error, please try again",
        })
      }
    }
  }, [error])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (categories?.length <= 1) {
        axios
          .get(`${API}/jobCategories?fields=id,name,children[id, name]`)
          .then((res) => {
            dispatch({
              type: "CATEGORIES",
              payload: res?.data?.jobCategories,
            })
          })
          .catch((err) => {
            dispatch({
              type: "CATEGORIES_FAIL",
            })
          })
      }
    }
    return () => {
      isMounted = false
    }
  }, [])

  const handleScroll = () => {
    setSearchUrl(
      `${API}/jobs?pageSize=8&page=${resultsPage}&fields=name,title,closeDate,created,company,id,location${url}`
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

  const loadMoreJobs = () => {
    setLoadMore(true)
    handleScroll()
  }

  const refreshJobs = () => {
    setLoading(true)
    axios
      .get(searchUrl)
      .then((res) => {
        setErrors(null)
        setNumber(res?.data?.pager.total)
        if (!url) {
          setResults(null)
          setJobs(res.data.jobs)
        } else {
          setResults(res.data.jobs)
        }
        setResultsPage(res.data?.pager.page + 1)
        setResultsPages(
          res.data.pager.page <=
            Math.ceil(res.data.pager.total / res.data.pager.pageSize)
        )
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setMessage(null)
        if (err?.response) {
          setErrors({
            type: "normal",
            msg: err?.response?.data?.message,
          })
        } else if (err?.message) {
          setErrors({
            type: "normal",
            msg: err?.message,
          })
        } else {
          setErrors({
            type: "normal",
            msg: "Internal server error, please try again",
          })
        }
      })
  }

  return (
    <div className="jobs">
      <Hero
        setSearch={setSearch}
        search={search}
        title="Search for different Jobs."
        url={url}
        setUrl={setUrl}
      />
      <main>
        <Jobs
          errors={errors}
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
          loadMoreJobs={loadMoreJobs}
          refresh={refreshJobs}
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
      `${API}/jobs?pageSize=8&fields=name,title,closeDate,created,company,id,location`
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
