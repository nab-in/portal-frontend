import React from "react"
import SavedJobs from "./details/SavedJobs"
import Profile from "./details/Profile"
import AppliedJobs from "./details/AppliedJobs"
import EditProfile from "./details/EditProfile"
import Jobs from "./details/Jobs"

const Details = ({ tab, details, page, isUser, isCompany }) => {
  const Content = () => {
    if (tab == undefined || tab == "profile")
      return <Profile details={details} page={page} />
    if (tab == "jobs" && page == "company")
      return <Jobs page={page} details={details} />
    if (tab == "jobs" && page != "company")
      return <Profile page={page} details={details} />
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
