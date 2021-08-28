import React from "react"
import { useAuthState } from "../context/auth"
import Profile_Template from "../components/profile_template/Profile_Template"
import Error from "../components/error/Error"

const profile = () => {
  let { user, isAuthenticated, loading } = useAuthState()
  return (
    <div>
      {user && isAuthenticated && !loading && (
        <Profile_Template page="auth-user" details={user} />
      )}
      {(!user || !isAuthenticated) && !loading && <Error />}
    </div>
  )
}

export default profile
