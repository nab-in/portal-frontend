import React, { useState, useEffect } from "react"
import { useAuthState } from "../context/auth"
import Hero from "../components/filter_hero/Hero"
import Template from "../components/template/Template"
import FilterCriteria from "../components/filter_criteria/FilterCriteria"
import NewsLetter from "../components/newsletter/NewsLetter"
import Company from "../components/company/Company"
import Loader from "../components/loaders/CardLoader"
import companies from "../data/companies"
import categories from "../data/company_categories"
import styles from "../styles/template.module.sass"

let loading = false
const Companies = () => {
  const { isAuthenticated } = useAuthState()
  let [filter, setFilter] = useState(false)
  let [search, setSearch] = useState({
    keyword: "",
    location: "",
    categories: [],
  })
  let checkSearch = (obj) => {
    for (let key in obj) {
      if (obj[key] !== null && obj[key].length > 0) {
        setFilter(true)
        return
      }
      if (obj[key] == [] && obj.categories.length > 0) {
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
  return (
    <div>
      <Hero
        search={search}
        setSearch={setSearch}
        categories={categories}
        title="Search for different Companies."
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
              <FilterCriteria search={search} setSearch={setSearch} />
              {filter && <h3 className={styles.results__header}>Results</h3>}
              {loading ? (
                <>
                  <Loader />
                  <Loader />
                  <Loader />
                </>
              ) : (
                <>
                  {companies.length > 0 &&
                    companies
                      .slice(1, 6)
                      .map((company) => (
                        <Company company={company} key={company.id} />
                      ))}
                </>
              )}
              <div
                className={`${styles.more__link} ${styles.more__link__center}`}
              >
                <button className="primary__text">Load More</button>
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

export default Companies
