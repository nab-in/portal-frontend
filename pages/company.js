import React, { useState, useEffect } from "react"
import { useAuthState } from "../context/auth"
import Hero from "../components/filter_hero/Hero"
import Template from "../components/template/Template"
import FilterCriteria from "../components/filter_criteria/FilterCriteria"
import NewsLetter from "../components/newsletter/NewsLetter"
import Company from "../components/company/Company"
import Loader from "../components/loaders/CardLoader"
import Spinner from "../components/loaders/ButtonLoader"
import categories from "../data/company_categories"
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
    `${API}/companies?pageSize=8&page=1${url}`
  )
  const { isAuthenticated } = useAuthState()
  let [filter, setFilter] = useState(false)
  let [search, setSearch] = useState({
    name: "",
    location: "",
  })

  // console.log(data?.pager)

  let pageName = "companies"

  let apiUrl = `${API}/companies?pageSize=8&page=${page}`

  useEffect(() => {
    if (
      search?.name?.trim().length == 0 &&
      search?.location?.trim().length == 0
    )
      setResultsPages(true)
    setResultsPage(1)
    let searchingUrl = `${API}/companies?pageSize=8&page=1&${url}`

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
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setLoading(false)
      console.log(error)
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
    setSearchUrl(`${API}/companies?pageSize=8&page=${resultsPage}&${url}`)
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

  return (
    <div>
      <Hero
        search={search}
        setSearch={setSearch}
        categories={categories}
        title="Search for different Companies."
        url={url}
        setUrl={setUrl}
      />
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
                  <>
                    {results != null ? (
                      <>
                        {results.length > 0 ? (
                          <>
                            {results.map((company) => (
                              <Company company={company} key={company.id} />
                            ))}
                          </>
                        ) : (
                          <p>No company match the your criteria</p>
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
                  {errors?.msg && (
                    <p className={`alerts ${errors?.type}`}>{errors.msg}</p>
                  )}
                </>
              )}
              <div
                className={`${styles.more__link} ${styles.more__link__center}`}
              >
                <>
                  {message ? (
                    <p>{message}</p>
                  ) : (
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
    const res = await fetch(`${API}/companies?pageSize=8`)
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
