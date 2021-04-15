import React, { useEffect } from "react"
import { useRouter } from "next/router"
import styles from "./hero.module.sass"
import Category from "../category/Category"
import categories from "../../../data/categories"

const Hero = ({ setSearch, search }) => {
  let router = useRouter()
  const handleChange = (e) => {
    let { name, value } = e.target
    setSearch({ ...search, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    if (router.query)
      setSearch({
        ...search,
        keyword: router.query.keyword,
        location: router.query.location,
      })
  }, [])

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Search for different Jobs.</h1>
          <div className={styles.search__container}>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`search__form ${styles.search__form}`}
            >
              {categories.length > 0 && (
                <div className={styles.categories}>
                  {categories.map((category) => (
                    <Category
                      key={category.id}
                      category={category}
                      search={search}
                      setSearch={setSearch}
                    />
                  ))}
                </div>
              )}
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Type to search..."
                  onChange={(e) => handleChange(e)}
                  name="keyword"
                />
                <input
                  type="text"
                  placeholder="Location"
                  onChange={(e) => handleChange(e)}
                  name="location"
                />
                <button className={`btn btn-primary ${styles.btn}`}>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
