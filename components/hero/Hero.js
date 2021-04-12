import React from "react"
import styles from "./hero.module.sass"

const Hero = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Main Headline that convinces customer.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Potenti
            pretium adipiscing tortor convallis aliquet cursus. Sed consequat
            sed id in nullam lectus parturient. Ullamcorper arcu gravida et
            aliquam ornare quam.
          </p>
          <div className={styles.search__container}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" placeholder="Type to search..." />
              <input type="text" placeholder="Location" />
              <button className={`btn btn-primary ${styles.btn}`}>
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
