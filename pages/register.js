import React, { useState } from "react"
import Link from "next/link"
import Logo from "../components/Logo"
import JobSeeker from "../components/register/JobSeeker"
import Company from "../components/register/Company"
import styles from "../styles/register.module.sass"

const register = () => {
  const [selected, setSelected] = useState("job-seeker")
  const selectJobSeeker = () => {
    setSelected("job-seeker")
  }

  const selectCompany = () => [setSelected("company")]
  return (
    <div className={styles.register}>
      <div className={styles.left__column}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <p>
          Sign Up today to start receiving notifications on newly posted jobs.
          To post jobs and to save your favourite jobs for later and to apply
          for Jobs.
        </p>
      </div>
      <div className={styles.right__column}>
        <div className={styles.selector}>
          <button
            onClick={selectJobSeeker}
            className={
              selected === "job-seeker"
                ? `btn btn-primary ${styles.btn__primary}`
                : `btn`
            }
          >
            Job Seeker
          </button>
          <button
            onClick={selectCompany}
            className={
              selected === "company"
                ? `btn btn-primary ${styles.btn__primary}`
                : `btn`
            }
          >
            Company/Organisation
          </button>
        </div>
        {selected === "job-seeker" ? <JobSeeker /> : <Company />}
        <div className="extra-stuffs">
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default register
