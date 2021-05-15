import React from "react"
import Link from "next/link"
import styles from "../template/template.module.sass"

const Aside = ({ page, details, tab, isUser, isCompany }) => {
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
    if (page == "auth-company") {
      return (
        <>
          {isCompany && (
            <aside>
              <nav>
                <ul>
                  <li>
                    <Link href={`/dashboard/`}>
                      <a>Dashboard</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/company?tab=profile`}>
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
                  <li>
                    <Link href={`/company?tab=edit-profile`}>
                      <a
                        className={
                          tab == "edit-profile" ? `${styles.active}` : ""
                        }
                      >
                        Edit Profile
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/company?tab=jobs`}>
                      <a className={tab == "jobs" ? `${styles.active}` : ""}>
                        Jobs
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>
          )}
        </>
      )
    }
    if (page == "user" && isUser) {
      let { id } = details
      return (
        <aside>
          <nav>
            <ul>
              <li>
                <Link href={`/profile/${id}?tab=profile`}>
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
                <Link href={`/profile/${id}?tab=edit-profile`}>
                  <a
                    className={tab == "edit-profile" ? `${styles.active}` : ""}
                  >
                    Edit Profile
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/profile/${id}?tab=applied-jobs`}>
                  <a
                    className={tab == "applied-jobs" ? `${styles.active}` : ""}
                  >
                    Applied Jobs
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/profile/${id}?tab=saved-jobs`}>
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
    if (page == "auth-user" && isUser) {
      return (
        <aside>
          <nav>
            <ul>
              <li>
                <Link href={`/profile?tab=profile`}>
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
                <Link href={`/profile?tab=edit-profile`}>
                  <a
                    className={tab == "edit-profile" ? `${styles.active}` : ""}
                  >
                    Edit Profile
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/profile?tab=applied-jobs`}>
                  <a
                    className={tab == "applied-jobs" ? `${styles.active}` : ""}
                  >
                    Applied Jobs
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/profile?tab=saved-jobs`}>
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
    if ((page == "user" || page == "auth-user") && !isUser) {
      return null
    }
  }
  return <Nav />
}

export default Aside
