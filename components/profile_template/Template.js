import React from "react"
import Link from "next/link"
import styles from "./template.module.sass"

let isUser = false
const Template = ({ page, details }) => {
  let Nav = () => {
    if (page == "company" || page == "company/jobs") {
      let { id } = details
      return (
        <aside>
          <nav>
            <ul>
              <li>
                <Link href={`/companies/${id}`}>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href={`/companies/${id}/jobs`}>
                  <a>Jobs</a>
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
        <aside>
          <nav>
            <ul>
              <li>
                <Link href={`/users/${id}`}>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href={`/users/edit-profile/${id}`}>
                  <a>Edit Profile</a>
                </Link>
              </li>
              <li>
                <Link href={`/users/applied_jobs/${id}`}>
                  <a>Applied Jobs</a>
                </Link>
              </li>
              <li>
                <Link href={`/users/saved_jobs/${id}`}>
                  <a>Saved Jobs</a>
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
  return (
    <section className={styles.template}>
      <Nav />
      <div className={styles.main__details}>Main details</div>
    </section>
  )
}

export default Template
