import React from "react"
import Aside from "./Aside"
import Details from "./Details"
import styles from "./template.module.sass"

const Template = ({ page, details }) => {
  return (
    <section className={styles.template}>
      <Aside page={page} details={details} />
      <div className={styles.main__details}>
        <Details />
      </div>
    </section>
  )
}

export default Template
