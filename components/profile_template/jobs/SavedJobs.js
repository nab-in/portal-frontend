import { useState, useEffect } from "react"
import { config } from "../../config"
import axios from "axios"
import { FaSync } from "react-icons/fa"
import { API } from "../../api"
import Section from "../Section"
import Job from "../../job/Job"
import Loader from "../../loaders/CardLoader"
import Spinner from "../../loaders/ButtonLoader"
import infiniteScroll from "../../infiniteScroll"

const SavedJobs = () => {
  const [jobs, setJobs] = useState(null)
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(false)
  let [errors, setErrors] = useState(null)
  let [message, setMessage] = useState(null)
  const [loadMore, setLoadMore] = useState(false)
  const apiUrl = `${API}/users/savedJobs?page=${page}&pageSize=1&fields=id,name,company,location,created,closeDate`

  const pageName = "jobs"

  useEffect(() => {
    refreshJobs()
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

  const refreshJobs = () => {
    setLoading(true)
    axios
      .get(
        `${API}/users/savedJobs?page=${page}&pageSize=6&fields=id,name,company,location,created,closeDate`,
        config
      )
      .then((res) => {
        setJobs(res.data.jobs)
        setPage(2)
        setNumber(res?.data?.pager?.total)
        setPages(
          res.data.pager.page <=
            Math.ceil(res.data.pager.total / res.data.pager.pageSize)
        )
        setErrors(null)
        setLoading(false)
        if (res.data.pager.total <= res.data.pager.pageSize)
          setMessage("You have seen it all")
        if (res?.data?.jobs?.length === 0) setMessage("You didn't save any job")
      })
      .catch((err) => {
        setLoading(false)
        if (err?.response) {
          setErrors({
            type: "normal",
            msg: err?.response?.data?.message,
          })
        } else if (err?.message) {
          if (err?.code === "ECONNREFUSED") {
            setErrors({
              type: "normal",
              msg: "Failed to connect, please refresh",
            })
          } else {
            setErrors({
              type: "normal",
              msg: err?.message,
            })
          }
        } else {
          setErrors({
            type: "normal",
            msg: "Internal server error, please try again",
          })
        }
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
            {errors?.type === "normal" ? (
              <></>
            ) : (
              <>
                {jobs?.length > 0 && (
                  <p
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    Showing {number} results
                  </p>
                )}
                {jobs?.length > 0 &&
                  jobs.map((job) => (
                    <Job
                      key={job.id}
                      job={job}
                      page="saved-jobs"
                      setItems={setJobs}
                    />
                  ))}
                {errors?.type === "infinite" && (
                  <p className={`alerts danger`}>{errors.msg}</p>
                )}
                {message?.length > 0 && !loading ? (
                  <p>{message}</p>
                ) : (
                  <>
                    {jobs?.length > 0 ? (
                      <>
                        {loadMore ? (
                          <Spinner bg="light" />
                        ) : (
                          <button
                            className="primary__text"
                            onClick={loadMoreJobs}
                          >
                            Load More
                          </button>
                        )}
                      </>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={refreshJobs}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <FaSync
                            className={loading ? `spinner` : ``}
                            style={{
                              fontSize: "1.8rem",
                              color: "gray",
                            }}
                          />
                        </button>
                      </div>
                    )}
                  </>
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
