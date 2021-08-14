import React, { useEffect } from "react"
import { useRouter } from "next/router"
import styles from "./hero.module.sass"
import Category from "../categories/Category"

const Hero = ({ setSearch, search, title, categories, url, setUrl }) => {
  let router = useRouter()

  // working on search url
  let urlBreak = url?.split("&")

  let inputArr = urlBreak?.filter((el) => {
    return el.includes("ilike")
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    setSearch({ ...search, [name]: value })
    let input = inputArr.find((el) => el.includes(name))
    if (value.trim().length > 0 && input) {
      setUrl(
        url.replace(
          url?.split("&")?.find((el) => el.includes(name)),
          `&filter=${[name]}:ilike:${value}`
        )
      )
    } else if (value.trim().length > 0 && !input) {
      setUrl(url + `&filter=${[name]}:ilike:${value}`)
    } else if (value.trim().length == 0 && input) {
      setUrl(
        url.replace(
          url?.split("&")?.find((el) => el.includes(name)),
          ``
        )
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    if (router.query) {
      setSearch({
        ...search,
        name: router.query.keyword ? router.query.keyword : "",
        location: router.query.location ? router.query.location : "",
      })
      setUrl(
        `${
          router.query?.keyword
            ? "&filter=name:ilike:" + router.query.keyword
            : ""
        }` +
          `${
            router.query?.location
              ? "&filter=location:ilike:" + router.query.location
              : ""
          }`
      )
    }
  }, [router.query])

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>{title}</h1>
          <div className={styles.search__container}>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`search__form ${styles.search__form}`}
            >
              {categories?.length > 0 && (
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
                  value={search.name}
                  onChange={(e) => handleChange(e)}
                  name="name"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={search.location}
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
