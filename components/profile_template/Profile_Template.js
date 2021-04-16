import React from "react"
import Hero from "./Hero"
import Template from "./Template"
import styles from "./template.module.sass"

const Profile_Template = ({ details, page }) => {
  return (
    <div>
      <Hero page={page} details={details} />
      <main>
        <Template page={page} details={details} />
      </main>
    </div>
  )
}

export default Profile_Template
