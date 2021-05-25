import React, { useState } from "react"
import { useRouter } from "next/router"
import styles from "./hero.module.sass"

const Hero = () => {
  const router = useRouter()
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
  })
  const { keyword, location } = search
  const handleChange = (e) => {
    let { name, value } = e.target
    setSearch({ ...search, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim().length > 0 && location.trim().length > 0)
      router.push(`/jobs?keyword=${keyword}&location=${location}`)
    if (keyword.trim().length > 0 && location.trim().length == 0)
      router.push(`/jobs?keyword=${keyword}`)
    if (keyword.trim().length == 0 && location.trim().length > 0)
      router.push(`/jobs?location=${location}`)
    if (keyword.trim().length == 0 && location.trim().length == 0)
      router.push(`/jobs`)
    setSearch({
      keyword: "",
      location: "",
    })
  }
  return (
    <div
      className={styles.hero}
      style={{
        background:
          "linear-gradient(89.98deg, rgba(0, 124, 169, 0.9) 0.01%, rgba(0, 80, 122, 0.7) 99.99%), url(/assets/images/bghero.jpg) bottom right",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className="text-primary-400">Land to your destiny job today.</h1>
          <p>
            I have no idea what to add in these texts. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Potenti pretium adipiscing tortor
            convallis aliquet cursus. Sed consequat sed id in nullam lectus
            parturient. Ullamcorper
          </p>
          <div className={styles.search__container}>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`search__form ${styles.search__form}`}
            >
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
                Explore
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
