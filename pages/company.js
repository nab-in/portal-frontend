import { useState, useEffect } from "react"
import { FaSync } from "react-icons/fa"
import axios from "axios"
import { useAuthState } from "../context/auth"
import Hero from "../components/filter_hero/Hero"
import Template from "../components/template/Template"
import FilterCriteria from "../components/filter_criteria/FilterCriteria"
import NewsLetter from "../components/newsletter/NewsLetter"
import Company from "../components/company/Company"
import Loader from "../components/loaders/CardLoader"
import Spinner from "../components/loaders/ButtonLoader"
import styles from "../styles/template.module.sass"
import { API } from "../components/api"
import infiniteScroll, { searching } from "../components/infiniteScroll"

const Companies = ({ data, error }) => {
  const [loadMore, setLoadMore] = useState(false)
  let [loading, setLoading] = useState(true)
  let [companies, setCompanies] = useState([])
  let [page, setPage] = useState(data?.pager.page + 1)
  let [pages, setPages] = useState(
    data?.pager.page <= Math.ceil(data?.pager.total / data?.pager.pageSize)
  )
  let [resultsPage, setResultsPage] = useState(1)
  let [resultsPages, setResultsPages] = useState(true)
  let [errors, setErrors] = useState(null)
  let [results, setResults] = useState(null)
  let [message, setMessage] = useState(null)
  let [number, setNumber] = useState(0)
  let [url, setUrl] = useState("")
  let [searchUrl, setSearchUrl] = useState(
    `${API}/companies?pageSize=8&page=1&${url}&fields=id,name,logo,verified`
  )
  const { isAuthenticated } = useAuthState()
  let [filter, setFilter] = useState(false)
  let [search, setSearch] = useState({
    name: "",
    location: "",
  })

  let pageName = "companies"

  let apiUrl = `${API}/companies?pageSize=8&page=${page}&fields=id,name,logo,verified`

  useEffect(() => {
    if (
      search?.name?.trim().length == 0 &&
      search?.location?.trim().length == 0
    ) {
      setResultsPages(true)
      setMessage("")
      if (companies?.length === 0) setMessage("Oops not a single company found")
    }
    setResultsPage(1)
    setSearchUrl(
      `${API}/companies?pageSize=8&page=1&${url}&fields=id,name,logo,verified`
    )
    let searchingUrl = `${API}/companies?pageSize=8&page=1&${url}&fields=id,name,logo,verified`

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
      setCompanies(data.companies)
      setNumber(data?.pager?.total)
      if (
        data?.pager?.total <= data?.pager?.pageSize &&
        data?.companies?.length > 0
      )
        setMessage("You have seen it all")
      if (data?.companies?.length === 0)
        setMessage("Opps not a single company found")
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

  let checkSearch = (obj) => {
    for (let key in obj) {
      if (obj[key] !== null && obj[key].length > 0) {
        setFilter(true)
        return
      }
      setFilter(false)
      return
    }
  }

  // updating UI
  useEffect(() => {
    checkSearch(search)
  }, [search])

  // infinite scroll
  const handleScroll = () => {
    setSearchUrl(
      `${API}/companies?pageSize=8&page=${resultsPage}&${url}&fields=id,name,logo,verified`
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
      setItems: setCompanies,
      setResults,
      items: companies,
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

  const loadMoreCompanies = () => {
    setLoadMore(true)
    handleScroll()
  }

  const refreshCompanies = () => {
    setLoading(true)
    axios
      .get(searchUrl)
      .then((res) => {
        setErrors(null)
        setNumber(res?.data?.pager.total)
        if (
          res?.data?.pager?.total <= res?.data?.pager?.pageSize &&
          res?.data?.companies?.length > 0
        )
          setMessage("You have seen it all")
        if (!url) {
          setCompanies(res.data.companies)
          setResults(null)

          if (res?.data?.companies?.length === 0)
            setMessage("Opps not a single company found")
        } else {
          setResults(res.data.companies)
          if (res?.data?.companies?.length === 0)
            setMessage("No results matching your criteria")
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

  useEffect(() => {
    refreshCompanies()
  }, [])

  return (
    <div>
      <Hero search={search} setSearch={setSearch} url={url} setUrl={setUrl} />
      <main>
        <Template heading={filter ? "Filter Criteria" : "Companies"}>
          <div
            className={
              isAuthenticated
                ? `${styles.template__layout} template__layout full__width`
                : `${styles.template__layout} template__layout`
            }
          >
            <div className={`${styles.main__content} main__content`}>
              <FilterCriteria
                search={search}
                setSearch={setSearch}
                url={url}
                setUrl={setUrl}
              />
              {filter && <h3 className={styles.results__header}>Results</h3>}
              {loading ? (
                <>
                  <Loader />
                  <Loader />
                  <Loader />
                </>
              ) : (
                <>
                  {errors?.type === "normal" ? (
                    <p className="alerts danger">{errors?.msg}</p>
                  ) : (
                    <>
                      {(companies?.length > 0 || results?.length > 0) && (
                        <p
                          style={{
                            marginBottom: "1rem",
                          }}
                        >
                          Showing {number} result(s)
                        </p>
                      )}
                      {results != null ? (
                        <>
                          {results.length > 0 && (
                            <>
                              {results.map((company) => (
                                <Company company={company} key={company.id} />
                              ))}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {companies.length > 0 &&
                            companies.map((company) => (
                              <Company company={company} key={company.id} />
                            ))}
                        </>
                      )}
                    </>
                  )}
                  {errors?.type === "infinite" && (
                    <p className={`alerts danger`}>{errors.msg}</p>
                  )}
                </>
              )}
              <div
                className={`${styles.more__link} ${styles.more__link__center}`}
              >
                <>
                  {message && !loading && !errors ? (
                    <>
                      <p>{message}</p>
                      {(companies?.length === 0 || results?.length === 0) && (
                        <div
                          style={{
                            width: "100%",
                            textAlign: "center",
                            marginTop: "1rem",
                          }}
                        >
                          <button
                            onClick={refreshCompanies}
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
                  ) : (
                    <>
                      {(companies?.length > 0 || results?.length > 0) && (
                        <>
                          {loadMore ? (
                            <Spinner bg="light" />
                          ) : (
                            <button
                              className="primary__text"
                              onClick={loadMoreCompanies}
                            >
                              Load More
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {companies?.length === 0 &&
                    (results?.length === 0 || results === null) && (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <button
                          onClick={refreshCompanies}
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
              </div>
            </div>
            {!isAuthenticated && (
              <div className={`${styles.sub__content} sub__content newslatter`}>
                <NewsLetter />
              </div>
            )}
          </div>
        </Template>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  let data = null
  let error = null
  try {
    const res = await fetch(
      `${API}/companies?pageSize=8&fields=id,name,logo,verified`
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

export default Companies
