import React from "react"
import { useRouter } from "next/router"
import { useAuthState } from "../../../context/auth"
import Aside from "../aside/Aside"
import Details from "../Details"
import styles from "./template.module.sass"

let isUser = false
let isCompany = false
const Template = ({ page, details }) => {
  let router = useRouter()
  let tab
  tab = router.query.tab
  const { user } = useAuthState()
  if (user?.role === "company" && page == "company" && user?.id == details.id) {
    isCompany = true
  } else if (page == "auth-user") {
    isUser = true
  } else if (user?.id == details.id) {
    isUser = true
  }
  return (
    <section className={styles.template}>
      <Aside
        page={page}
        details={details}
        tab={tab}
        isCompany={isCompany}
        isUser={isUser}
      />
      <div className={styles.main__details}>
        <Details
          page={page}
          details={details}
          tab={tab}
          isCompany={isCompany}
          isUser={isUser}
        />
      </div>
    </section>
  )
}

export default Template
