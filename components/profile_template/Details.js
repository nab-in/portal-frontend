import React from "react"
import SavedJobs from "./details/SavedJobs"
import Profile from "./details/Profile"
import AppliedJobs from "./details/AppliedJobs"
import EditProfile from "./details/EditProfile"
import Jobs from "./details/Jobs"

let isUser = false
let isCompany = false
const Details = ({ tab, details, page }) => {
  const Content = () => {
    if (tab == undefined || tab == "profile")
      return <Profile details={details} page={page} />
    if (tab == "jobs") return <Jobs page={page} details={details} />
    if (tab == "edit-profile")
      return (
        <>
          {isUser || isCompany ? (
            <EditProfile details={details} page={page} />
          ) : (
            <Profile details={details} page={page} />
          )}
        </>
      )
    if (tab == "saved-jobs")
      return (
        <>
          {isUser ? (
            <SavedJobs page={page} details={details} />
          ) : (
            <Profile details={details} page={page} />
          )}
        </>
      )
    if (tab == "applied-jobs")
      return (
        <>
          {isUser ? (
            <AppliedJobs page={page} details={details} />
          ) : (
            <Profile details={details} page={page} />
          )}
        </>
      )
  }
  return (
    <div>
      <Content />
    </div>
  )
}

export default Details
