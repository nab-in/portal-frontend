import React from "react"
import { useAuthState } from "../../context/auth"
import Profile_Template from "../../components/profile_template/Profile_Template"
import Error from "../../components/error/Error"

const profile = () => {
  let { user } = useAuthState()
  return (
    <div>
      {user && <Profile_Template page="user" details={user} />}
      {!user && <Error />}
    </div>
  )
}

export default profile
