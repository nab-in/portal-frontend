import React from "react"
import Link from "next/link"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import Details from "./Details"
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
                <Link href={`/companies/${id}?tab=profile`}>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href={`/companies/${id}?tab=jobs`}>
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
                <Link href={`/users/${id}?tab=profile`}>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href={`/users/${id}?tab=edit-profile`}>
                  <a>Edit Profile</a>
                </Link>
              </li>
              <li>
                <Link href={`/users/${id}?tab=applied-jobs`}>
                  <a>Applied Jobs</a>
                </Link>
              </li>
              <li>
                <Link href={`/users/${id}?tab=saved-jobs`}>
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
      <div className={styles.main__details}>
        <Details />
      </div>
    </section>
  )
}

export default Template
