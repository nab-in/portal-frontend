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
          <Link href="/">
            <a className={styles.logo}>
              <Logo height={30} width={174} />
            </a>
          </Link>
        </div>
        <p>
          {selected === "job-seeker"
            ? "Sign Up today to start receiving notifications on newly posted jobs. To post jobs and to save your favourite jobs for later and to apply for Jobs."
            : "Register a company to start posting jobs and acquire employers"}
        </p>
      </div>
      <div className={styles.right__column}>
        <div className={styles.card}>
          <div className={styles.selector}>
            <button
              onClick={selectJobSeeker}
              className={
                selected === "job-seeker"
                  ? `btn btn-primary ${styles.btn__primary} ${styles.btn}`
                  : `btn ${styles.btn}`
              }
            >
              Job Seeker
            </button>
            <button
              onClick={selectCompany}
              className={
                selected === "company"
                  ? `btn btn-primary ${styles.btn__primary} ${styles.btn}`
                  : `btn ${styles.btn}`
              }
            >
              Company/<span>Organisation</span>
            </button>
          </div>
          {selected === "job-seeker" ? <JobSeeker /> : <Company />}
          <div className={`${styles.extra__stuffs}`}>
            Already have an account?{" "}
            <Link href="/login">
              <a className="dark_bg">Login</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default register
