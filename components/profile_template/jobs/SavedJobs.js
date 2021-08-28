import { useState, useEffect } from "react"
import { config } from "../../config"
import axios from "axios"
import { API } from "../../api"
import Section from "../Section"
import Job from "../../job/Job"
import Loader from "../../loaders/CardLoader"
import Spinner from "../../loaders/ButtonLoader"
import infiniteScroll from "../../infiniteScroll"

const SavedJobs = () => {
  const [jobs, setJobs] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(false)
  let [errors, setErrors] = useState(null)
  let [message, setMessage] = useState(null)
  const [loadMore, setLoadMore] = useState(false)
  const apiUrl = `${API}/users/savedJobs?page=${page}&pageSize=1&fields=id,name,company,location,created,closeDate`

  const pageName = "jobs"

  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `${API}/users/savedJobs?page=${page}&pageSize=6&fields=id,name,company,location,created,closeDate`,
        config
      )
      .then((res) => {
        setJobs(res.data.jobs)
        setPage(2)
        setPages(
          res.data.pager.page <=
            Math.ceil(res.data.pager.total / res.data.pager.pageSize)
        )
        setErrors(null)
        setLoading(false)
        if (res.data.pager.total <= res.data.pager.pageSize)
          setMessage("You have seen it all")
      })
      .catch((err) => {
        setLoading(false)
        if (err?.response) {
          console.log("here")
          setErrors({
            type: "danger",
            msg: err?.response?.data?.message,
          })
        } else if (err?.message == "Network Error") {
          setErrors({
            type: "danger",
            msg: "Network Error",
          })
        } else {
          setErrors({
            type: "danger",
            msg: "Internal server error, please try again",
          })
        }
      })
  }, [])

  useEffect(() => {
    if (page === 2 && pages === false) {
      setMessage("You have seen it all")
    }
  }, [pages])

  const loadMoreJobs = () => {
    infiniteScroll({
      apiUrl,
      searchUrl: null,
      resultsPage: null,
      setResultsPage: null,
      resultsPages: null,
      setResultsPages: null,
      setErrors,
      setPages,
      setPage,
      setItems: setJobs,
      items: jobs,
      page,
      loadMore,
      setLoadMore,
      pageName,
      setMessage,
      pages,
      config,
    })
  }

  return (
    <Section title="Saved Jobs">
      <article>
        {loading ? (
          <>
            <Loader />
            <Loader />
            <Loader />
          </>
        ) : (
          <div className="main__content">
            {jobs?.length > 0 ? (
              <>
                {jobs.map((job) => (
                  <Job
                    key={job.id}
                    job={job}
                    page="saved-jobs"
                    setItems={setJobs}
                  />
                ))}
                {message?.length > 0 ? (
                  <p>{message}</p>
                ) : (
                  <>
                    {loadMore ? (
                      <Spinner bg="light" />
                    ) : (
                      <button className="primary__text" onClick={loadMoreJobs}>
                        Load More
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {errors?.msg ? (
                  <p className={`alerts ${errors.type}`}>{errors.msg}</p>
                ) : (
                  <p>You didn't save any job</p>
                )}
              </>
            )}
          </div>
        )}
      </article>
    </Section>
  )
}

export default SavedJobs
