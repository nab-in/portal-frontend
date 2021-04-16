import React from "react"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"
import styles from "./company.module.sass"

const Company = ({ company }) => {
  let { id, logo, name, jobs, title, bio, about, location, website } = company
  console.log(company)
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.company}>
        <div className={styles.logo}>
          <Image
            src={`/assets/companies/${logo}`}
            alt={`${name} logo`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.name}>
          <Link href={`/companies/${id}`}>{name}</Link>
        </div>
      </div>
      <div className={styles.details}>
        <div className={`verified ${styles.verified}`}>
          Verified <GoVerified className="icon" />
        </div>
        <div className={styles.jobs}>
          <Link href={`/companies/${id}/jobs`}>
            <a>Jobs: {jobs}</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Company
