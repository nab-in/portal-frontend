import Link from "next/link"
import { AiOutlineSearch } from "react-icons/ai"
import styles from "./Header.module.sass"

const Header = () => {
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
                <a href="/about" className="nav_link">
                  About
                </a>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link href="/contact">
                <a href="/contact" className="nav_link">
                  Contact
                </a>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <AiOutlineSearch className="icon" />
            </li>
          </ul>

          <ul className={styles.navbar_user}>
            <li>
              <Link href="/login">
                <a href="/login" className="nav_link">
                  Login
                </a>
              </Link>
            </li>
            <li>
              <Link href="/register" className="btn btn-primary">
                <a href="/register" className="nav_link">
                  Join Us
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
