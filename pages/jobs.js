import React, { useState, useEffect } from "react"
import Hero from "../components/filter_hero/Hero"
import Jobs from "../components/jobs_template/Jobs"
// import categories from "../data/categories"
import { API } from "../components/api"
import axios from "axios"
import infiniteScroll, { searching } from "../components/infiniteScroll"

const jobs = ({ data, error }) => {
  // states
  const [loadMore, setLoadMore] = useState(false)
  const [categories, setCategories] = useState([])
  let [page, setPage] = useState(data?.pager.page + 1)
  let [pages, setPages] = useState(data?.pager.page < data?.pager.pageCount)
  let [jobs, setJobs] = useState([])
  let [errors, setErrors] = useState(null)
  let [results, setResults] = useState(null)
  let [message, setMessage] = useState(null)
  let [loading, setLoading] = useState(true)
  let [search, setSearch] = useState({
    keyword: "",
    location: "",
    categories: [],
  })

  let returnValue = "res.data.jobs"

  let url = `${API}/jobs?&fields=name,title,closeDate,created,company,id,location`

  let searchUrl = ``

  // const searching = () => {
  //   let s = ""
  //   if (search?.keyword.trim() != "")
  //     s += `&filter=name:ilike:${search?.keyword}`

  //   if (search?.location.trim() != "")
  //     s += `&filter=location:ilike:${search?.location}`
  //   search?.categories.forEach((category) => {
  //     s += `&filter=name:ilike:${category.name}`
  //     category.sub_categories.forEach((sub) => {
  //       s += `&filter=name:ilike:${sub.name}`
  //     })
  //   })
  //   let url = `${API}/jobs?${s}&fields=name,title,closeDate,created,company,id,location`
  //   if (s.trim().length > 0) {
  //     setLoading(true)
  //     axios
  //       .get(url)
  //       .then((res) => {
  //         console.log(res.data)
  //         setResults(res.data.jobs)
  //         setLoading(false)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         setLoading(false)
  //       })
  //   }
  // }
  // updating UI
  useEffect(() => {
    searching({
      url,
      searchUrl,
      setLoading,
      setErrors,
      returnValue,
      setResults,
    })
  }, [search])

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

  // const handleScroll = () => {
  //   // getting the last job card
  //   let jobCards = document.querySelectorAll(".main__content > .card")
  //   let lastJob = jobCards[jobCards.length - 1]

  //   // checking for the last job item
  //   if (lastJob) {
  //     let lastJobOffset = lastJob.offsetTop + lastJob.clientHeight
  //     let pageOffset = window.pageYOffset + window.innerHeight
  //     if (pageOffset > lastJobOffset) {
  //       // checking if page number is less than the actual number of pages sent from api
  //       if (
  //         page <= Math.ceil(data?.pager.total / data?.pager.pageSize) &&
  //         !loadMore &&
  //         pages
  //       ) {
  //         // fetching more jobs
  //         setLoadMore(true)
  //         axios
  //           .get(
  //             `${API}/jobs?page=${page}&pageSize=8&fields=name,title,closeDate,created,company,id,location`
  //           )
  //           .then((res) => {
  //             if (res.data) {
  //               // check if number of pages returned from api is less than the actual number of pages
  //               setPages(
  //                 res.data.pager.page <=
  //                   Math.ceil(res.data.pager.total / res.data.pager.pageSize)
  //               )

  //               // concatenating jobs items
  //               setJobs(jobs.concat(res.data.jobs))
  //               setLoadMore(false)

  //               // setting the page number
  //               setPage(parseInt(res.data?.pager.page) + 1)
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err)
  //             setLoadMore(false)
  //           })
  //       }

  //       // checks if existing page number is greater than the page returned from the api
  //       if (page > Math.ceil(data?.pager.total / data?.pager.pageSize)) {
  //         setLoadMore(false)
  //         setMessage("You have seen it all")
  //       }
  //     }
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // })

  infiniteScroll({
    url,
    searchUrl,
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
    returnValue,
    setMessage,
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
          jobs={jobs}
          loading={loading}
          setLoading={setLoading}
          loadMore={loadMore}
          message={message}
          results={results}
          setResults={setResults}
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
