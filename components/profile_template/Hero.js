import React from "react"
import Image from "next/image"
import styles from "./hero.module.sass"

let isAuthenticated = false
const Hero = ({ details, page }) => {
  const Profile = () => {
    if (page == "company" || "company/jobs") {
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
                {isAuthenticated && (
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
    if (page == "user") {
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
                {isAuthenticated && (
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
  }
  return (
    <div className={styles.hero}>
      <Profile />
    </div>
  )
}

export default Hero
