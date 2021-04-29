import React, { useState } from "react"
import Link from "next/link"
import { AiOutlineSearch,AiOutlineMenu } from "react-icons/ai"
import styles from "./Header.module.sass"
import { IconContext } from "react-icons/lib"

const Header = () => {

  const [isOpen, setisOpen] = useState(false);

  const handleClick = () => {
    
    setisOpen(!isOpen);
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.main_nav} ${styles.container}`}>
        <h1 className={styles.logo}>
          <Link href="/">
            <a href="/">
              <span>Job</span>Portal.
            </a>
          </Link>
        </h1>

        <nav className={styles.navbar_menu}>
          <ul>
            <li className={`${styles.nav_item} ${styles.active}`}>
              <Link href="/jobs">
                <a href="/jobs" className="nav_link">
                  Jobs
                </a>
              </Link>
            </li>
            <li className={`${styles.nav_item} ${styles.active}`}>
              <Link href="/companies">
                <a className="nav_link">Companies</a>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link href="/about">
                <a  className="nav_link">
                  About
                </a>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link href="/contact">
                <a  className="nav_link">
                  Contact
                </a>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <AiOutlineSearch className={styles.icon}/>
            </li>
          </ul>
          </nav>

          <nav className={styles.navbar_user}>
          <ul >
            <li>
              <Link href="/login">
                <a href="/login" className="nav_link">
                  Login
                </a>
              </Link>
            </li>
            <li className={`btn btn-primary ${styles.btn__primary}`}>
              <Link href="/register">
               <a href="/register" className={styles.join}>
                  Join Us
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        <button className={styles.toggle__button} onClick={handleClick}> <AiOutlineMenu />  </button>
  
      </div>
    </header>
  )
}

export default Header
