import React from "react"
import Hero from "./hero/Hero"
import Template from "./template/Template"

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
