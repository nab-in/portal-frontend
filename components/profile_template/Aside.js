import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./template.module.sass"

let isUser = false
let isCompany = false

const Aside = ({ page, details }) => {
  let router = useRouter()
  let tab
  tab = router.query.tab

  let Nav = () => {
    if (page == "company" || page == "company/jobs") {
      let { id } = details
      return (
        <aside>
          <nav>
            <ul>
              {isCompany && (
                <li>
                  <Link href={`/dashboard/`}>
                    <a>Dashboard</a>
                  </Link>
                </li>
              )}
              <li>
                <Link href={`/companies/${id}?tab=profile`}>
                  <a
                    className={
                      tab == undefined || tab == "profile" || tab == ""
                        ? `${styles.active}`
                        : ""
                    }
                  >
                    Profile
                  </a>
                </Link>
              </li>
              {isCompany && (
                <li>
                  <Link href={`/companies/${id}?tab=edit-profile`}>
                    <a
                      className={
                        tab == "edit-profile" ? `${styles.active}` : ""
                      }
                    >
                      Edit Profile
                    </a>
                  </Link>
                </li>
              )}
              <li>
                <Link href={`/companies/${id}?tab=jobs`}>
                  <a className={tab == "jobs" ? `${styles.active}` : ""}>
                    Jobs
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      )
    }
    if (page == "user" && isUser) {
      let { id } = details
      return (
        <aside ref={node}>
          <nav>
            <ul>
              <li>
                <Link href={`/users/${id}?tab=profile`}>
                  <a
                    className={
                      tab == "profile" || tab == undefined || tab == ""
                        ? `${styles.active}`
                        : ""
                    }
                  >
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/users/${id}?tab=edit-profile`}>
                  <a
                    className={tab == "edit-profile" ? `${styles.active}` : ""}
                  >
                    Edit Profile
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/users/${id}?tab=applied-jobs`}>
                  <a
                    className={tab == "applied-jobs" ? `${styles.active}` : ""}
                  >
                    Applied Jobs
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/users/${id}?tab=saved-jobs`}>
                  <a className={tab == "saved-jobs" ? `${styles.active}` : ""}>
                    Saved Jobs
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      )
    }
    if (page == "user" && !isUser) {
      return null
    }
  }
  return <Nav />
}

export default Aside
