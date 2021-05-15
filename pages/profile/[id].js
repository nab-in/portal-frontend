import React from "react"
import { useAuthState } from "../../context/auth"
import Profile_Template from "../../components/profile_template/Profile_Template"
import Error from "../../components/error/Error"

const profile = () => {
  let { user } = useAuthState()
  let details = user
  return (
    <div>
      {details && <Profile_Template page="user" details={details} />}
      {!details && <Error />}
    </div>
  )
}

export default profile
