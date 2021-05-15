import React from "react"
import { useAuthState } from "../context/auth"
import Profile_Template from "../components/profile_template/Profile_Template"
import Error from "../components/error/Error"

const profile = () => {
  let { user, isAuthenticated } = useAuthState()
  let details = user
  return (
    <div>
      {details && isAuthenticated && (
        <Profile_Template page="auth-user" details={details} />
      )}
      {(!details || !isAuthenticated) && <Error />}
    </div>
  )
}

export default profile
