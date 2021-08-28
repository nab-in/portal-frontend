import React from "react"
import { useAuthState } from "../../../context/auth"
import Loader from "../../loaders/HeroLoader"
import styles from "./hero.module.sass"

const Hero = ({ details, page, loading }) => {
  const Profile = () => {
    const { isAuthenticated, user } = useAuthState()
    if (page == "company" || page == "company/jobs") {
      let { logo, name, title, id } = details
      let defaultdp = name?.split("")[0]
      return (
        <div className={styles.container}>
          <div className={styles.dp__container}>
            <div className={styles.dp}>
              {logo ? (
                <img src={logo} alt={`${name} logo`} />
              ) : (
                <div className={styles.default}>{defaultdp}</div>
              )}
            </div>
          </div>
          <div className={styles.heading}>
            <div className={styles.name}>
              <h1>
                <span>{name}</span>
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
      let name = username?.split("")[0]
      return (
        <div className={styles.container}>
          <div className={styles.dp__container}>
            <div className={styles.dp}>
              {dp ? (
                <img
                  src={dp}
                  alt={`${username}`}
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
            {title && (
              <div className={`${styles.title}`}>
                <span>{title}</span>
              </div>
            )}
          </div>
        </div>
      )
    }
  }
  return <div className={styles.hero}>{loading ? <Loader /> : <Profile />}</div>
}

export default Hero
