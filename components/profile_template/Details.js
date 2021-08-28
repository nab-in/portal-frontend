import SavedJobs from "./jobs/SavedJobs"
import Profile from "./profile/Profile"
import AppliedJobs from "./jobs/AppliedJobs"
import EditProfile from "./edit-profile/EditProfile"
import Jobs from "./jobs/Jobs"
import Companies from "./companies/Companies"
import AddCompany from "./companies/AddCompany"

const Details = ({ tab, details, setDetails, page, isUser, isCompany }) => {
  const Content = () => {
    if (tab == undefined || tab == "profile")
      return <Profile details={details} page={page} />
    if (tab == "jobs" && page == "company")
      return <Jobs page={page} details={details} />
    if (tab == "jobs" && page != "company")
      return <Profile page={page} details={details} />
    if (tab == "companies" && page != "company")
      return <Companies page={page} />
    if (tab == "add-company" && page != "company")
      return <AddCompany page={page} />
    if (tab == "edit-profile")
      return (
        <>
          {isUser || isCompany ? (
            <EditProfile
              details={details}
              setDetails={setDetails}
              isUser={isUser}
              isCompany={isCompany}
              page={page}
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
