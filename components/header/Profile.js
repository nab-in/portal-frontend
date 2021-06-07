import React, { useState } from "react"
import Link from "next/link"
import { useAuthState } from "../../context/auth"
import UseClickOutside from "../UseClickOutside"
import styles from "./profile.module.sass"

const Profile = () => {
  const { user } = useAuthState()
  const { username, dp, firstname, lastname } = user
  let name = username?.split("")[0]
  // takes care of profile drop down
  let [open, setOpen] = useState(false)
  //   const toggleDropdown = () => setOpen(!open)

  // detect outside click hook
  let node = UseClickOutside(() => setOpen(false))

  return (
    <div className={styles.profile} ref={node}>
      <div onClick={() => setOpen(!open)} className={styles.profile}>
        <div className={styles.name}>
          <span>{username}</span>
        </div>
        <div className={styles.dp__container}>
          {dp ? (
            <img
              src={`/assets/images/dp.jpeg`}
              alt={`dp`}
              height={40}
              width={40}
              objectFit="cover"
            />
          ) : (
            <div className={styles.default}>{name}</div>
          )}
        </div>
      </div>
      <div
        className={
          open ? `${styles.dropdown} ${styles.open}` : `${styles.dropdown}`
        }
      >
        <div className={styles.profile}>
          <div className={styles.dp__container}>
            {dp ? (
              <img
                src={`/assets/images/dp.jpeg`}
                alt={`dp`}
                height={40}
                width={40}
                objectFit="cover"
              />
            ) : (
              <div className={styles.default}>{name}</div>
            )}
          </div>
          <div className={styles.name}>
            {firstname} {lastname}
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/profile">
                <a onClick={() => setOpen(false)}>Profile</a>
              </Link>
            </li>
            <ul>
              <li>
                <Link href="/profile?tab=saved-jobs">
                  <a onClick={() => setOpen(false)}>Saved Jobs</a>
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=applied-jobs">
                  <a onClick={() => setOpen(false)}>Applied Jobs</a>
                </Link>
              </li>
            </ul>
            <li>
              <a href="#!">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Profile