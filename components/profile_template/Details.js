import React from "react"
import SavedJobs from "./jobs/SavedJobs"
import Profile from "./profile/Profile"
import AppliedJobs from "./jobs/AppliedJobs"
import EditProfile from "./edit-profile/EditProfile"
import Jobs from "./jobs/Jobs"

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
            <EditProfile
              details={details}
              isUser={isUser}
              isCompany={isCompany}
            />
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
