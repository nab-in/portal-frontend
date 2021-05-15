import React from "react"
import Image from "next/image"
import { useAuthState } from "../../../context/auth"
import styles from "./hero.module.sass"

const Hero = ({ details, page }) => {
  const Profile = () => {
    const { isAuthenticated, user } = useAuthState()
    if (page == "company" || page == "company/jobs") {
      let { logo, name, title, id } = details
      return (
        <div className={styles.container}>
          <div className={styles.dp__container}>
            <div className={styles.dp}>
              <Image
                src={`/assets/companies/${logo}`}
                alt={`${name} logo`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className={styles.heading}>
            <div className={styles.name}>
              <h1>
                <span>{name}</span>
                {isAuthenticated && user?.role !== "company" && (
                  <span className="badge unverified">Follow</span>
                )}
              </h1>
            </div>
            <div className={`${styles.title}`}>
              <span>{title}</span>
            </div>
          </div>
        </div>
      )
    }
    if (page == "user" || page == "auth-user") {
      let { dp, firstname, lastname, username, title, id } = details
      console.log(details)
      let name = username.split("")[0]
      return (
        <div className={styles.container}>
          <div className={styles.dp__container}>
            <div className={styles.dp}>
              {dp ? (
                <Image
                  src={`/assets/companies/${dp}`}
                  alt={`${username} logo`}
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <div className={styles.default}>{name}</div>
              )}
            </div>
          </div>
          <div className={styles.heading}>
            <div className={styles.name}>
              <h1>
                <span>
                  {firstname} {lastname}
                </span>
              </h1>
            </div>
            <div className={`${styles.title}`}>
              <span>{title}</span>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <div className={styles.hero}>
      <Profile />
    </div>
  )
}

export default Hero
