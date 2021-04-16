import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineArrowRight } from "react-icons/ai"
import styles from "./template.module.sass"

let isUser = false
let isCompany = false

// detect outside click hook
let useClickOutside = (handler) => {
  let node = useRef()
  useEffect(() => {
    let handle = (e) => {
      if (!node.current.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", handle)
    return () => {
      document.removeEventListener("mousedown", handle)
    }
  })
  return node
}

const Aside = ({ page, details }) => {
  let [isOpen, setIsOpen] = useState(false)
  let router = useRouter()
  let tab
  tab = router.query.tab
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  // check if outside is clicked
  let node = useClickOutside(() => {
    setIsOpen(false)
  })

  let Nav = () => {
    if (page == "company" || page == "company/jobs") {
      let { id } = details
      return (
        <aside className={isOpen ? `${styles.open}` : ""} ref={node}>
          <div className={styles.open__menu} onClick={toggleOpen}>
            <AiOutlineArrowRight className={styles.icon} />
          </div>
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
