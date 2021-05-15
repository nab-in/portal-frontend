import React from "react"
import { useAuthState } from "../context/auth"
import Profile_Template from "../components/profile_template/Profile_Template"
import Error from "../components/error/Error"
import companies from "../data/companies"

const Company = () => {
  let { isAuthenticated } = useAuthState()
  let details
  let id = 1
  let company = companies.filter((el) => el.id == id)
  if (company.length > 0) details = company[0]
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
