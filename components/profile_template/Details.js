import React from "react"
import SavedJobs from "./details/SavedJobs"
import Profile from "./details/Profile"
import AppliedJobs from "./details/AppliedJobs"
import EditProfile from "./details/EditProfile"
import Jobs from "./details/Jobs"

const Details = ({ tab, details, page }) => {
  const Content = () => {
    if (tab == undefined || tab == "profile")
      return <Profile details={details} page={page} />
    if (tab == "jobs") return <Jobs page={page} details={details} />
    if (tab == "edit-profile")
      return <EditProfile details={details} page={page} />
    if (tab == "saved-jobs") return <SavedJobs page={page} details={details} />
    if (tab == "applied-jobs")
      return <AppliedJobs page={page} details={details} />
  }
  return (
    <div>
      <Content />
    </div>
  )
}

export default Details
