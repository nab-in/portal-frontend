import React from "react"
import { useRouter } from "next/router"
import Error from "../../components/error/Error"
import Profile_Template from "../../components/profile_template/Profile_Template"
import companies from "../../data/companies"

const Company = () => {
  let router = useRouter()
  let details
  let id = router.query.id
  let company = companies.filter((el) => el.id == id)
  if (company.length > 0) details = company[0]
  return (
    <div>
      {details && <Profile_Template page="company" details={details} />}
      {!details && <Error />}
    </div>
  )
}

export default Company
