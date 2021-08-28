import { useState } from "react"
import axios from "axios"
import { config } from "../config"
import { API, DASH } from "../api"
import Link from "next/link"
import { useAlertsDispatch } from "../../context/alerts"
import { useAuthState, useAuthDispatch } from "../../context/auth"
import UseClickOutside from "../UseClickOutside"
import styles from "./profile.module.sass"
import { FaAngleDown } from "react-icons/fa"

const Profile = () => {
  const { user, roles } = useAuthState()
  const dispatch = useAuthDispatch()
  const alertDispatch = useAlertsDispatch()
  let name = user?.username?.split("")[0]
  // takes care of profile drop down
  let [open, setOpen] = useState(false)

  // detect outside click hook
  let node = UseClickOutside(() => setOpen(false))

  const logout = () => {
    axios(`${API}/logout`, config)
      .then((res) => {
        dispatch({
          type: "LOGOUT",
        })
        alertDispatch({
          type: "ADD",
          payload: {
            message: "You have successfully logged out",
            type: "success",
          },
        })
      })
      .catch((err) => {
        if (err?.response) {
          alertDispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: err?.response?.data?.message,
            },
          })
        } else if (err?.message == "Network Error") {
          alertDispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: "Network Error",
            },
          })
        } else {
          alertDispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: "Internal server error, please try again",
            },
          })
        }
      })
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <div className={styles.profile} ref={node}>
      <div onClick={() => setOpen(!open)} className={styles.profile}>
        <div className={styles.name}>
          <span className={styles.name}>{user?.username}</span>
          <FaAngleDown className={styles.icon} />
        </div>
        <div className={styles.dp__container}>
          {user?.dp ? (
            <img src={user.dp} alt={`dp`} height={40} width={40} />
          ) : (
            <>{name && <div className={styles.default}>{name}</div>}</>
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
            {user?.dp ? (
              <img src={user.dp} alt={`dp`} height={40} width={40} />
            ) : (
              <>{name && <div className={styles.default}>{name}</div>}</>
            )}
          </div>
          <div className={styles.name}>
            {user?.firstname} {user?.lastname}
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
            {roles?.length > 0 && (
              <ul
                style={{
                  borderTop: "none",
                }}
              >
                {roles.map(({ id, name }) => (
                  <li key={id}>
                    <a
                      onClick={() => setOpen(false)}
                      href={`${DASH}/select_identity?role=${id}`}
                    >
                      {capitalizeFirstLetter(name)} Dashboard
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <li>
              <a
                href="#!"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Profile
