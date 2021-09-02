import Link from "next/link"
import { GoVerified } from "react-icons/go"
import styles from "./company.module.sass"
import { DASH } from "../api"

const Company = ({ company, page }) => {
  let { id, logo, name, verification } = company
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.company}>
        <div className={styles.logo}>
          <img src={logo} alt={`${name} logo`} loading="lazy" />
        </div>
        <div className={styles.name}>
          <Link href={`/companies/${id}`}>{name}</Link>
        </div>
      </div>
      <div className={styles.details}>
        {page == "auth" ? (
          <>
            <a href={`${DASH}/select_identity?company=${id}`} target="_blank">
              Visit Dashboard
            </a>
          </>
        ) : (
          <>
            {verification && (
              <div className={`badge verified ${styles.verified}`}>
                Verified <GoVerified className="icon" />
              </div>
            )}
            <div className={styles.jobs}>
              <Link href={`/companies/${id}?tab=jobs`}>
                <a>Jobs</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Company
