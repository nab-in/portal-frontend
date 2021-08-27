import EditUser from "./user/EditUser"
import EditCompany from "./company/EditCompany"
import styles from "./edit_profile.module.sass"

const EditProfile = ({
  details,
  setDetails,
  isUser,
  isCompany,
  page = { page },
}) => {
  return (
    <div className={styles.profile}>
      {isUser && <EditUser details={details} page={page} />}
      {isCompany && (
        <EditCompany details={details} page={page} setDetails={setDetails} />
      )}
    </div>
  )
}

export default EditProfile
