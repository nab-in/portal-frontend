import React from "react"
import { useAuthState } from "../context/auth"
import Profile_Template from "../components/profile_template/Profile_Template"
import Error from "../components/error/Error"
import companies from "../data/companies"

const Company = () => {
  let { isAuthenticated } = useAuthState()
  let details
  return (
    <div>
      {details && isAuthenticated && (
        <Profile_Template page="auth-company" details={details} />
      )}
      {!details && !isAuthenticated && <Error />}
    </div>
  )
}

export default Company
