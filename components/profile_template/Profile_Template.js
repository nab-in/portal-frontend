import React from "react"
import Hero from "./Hero"
import styles from "./template.module.sass"

const Profile_Template = ({ details, page }) => {
  return (
    <div className={styles.template}>
      <Hero page={page} details={details} />
      <main>Main template</main>
    </div>
  )
}

export default Profile_Template
