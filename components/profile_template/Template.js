import React from "react"
import { useRouter } from "next/router"
import Aside from "./Aside"
import Details from "./Details"
import styles from "./template.module.sass"

const Template = ({ page, details }) => {
  let router = useRouter()
  let tab
  tab = router.query.tab
  return (
    <section className={styles.template}>
      <Aside page={page} details={details} tab={tab} />
      <div className={styles.main__details}>
        <Details page={page} details={details} tab={tab} />
      </div>
    </section>
  )
}

export default Template
