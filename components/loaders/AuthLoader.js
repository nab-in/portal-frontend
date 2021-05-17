import React from "react"
import styles from "./auth-loader.module.sass"

const Loader = () => {
  return (
    <div className={styles.loader}>
      <header />
      <div className={styles.hero} />
      <main />
    </div>
  )
}

export default Loader
