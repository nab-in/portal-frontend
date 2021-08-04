import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuthState } from "../../context/auth"
import { useRouter } from "next/router"
import { AiOutlineSearch } from "react-icons/ai"
import UseClickOutside from "../UseClickOutside"
import styles from "./Header.module.sass"
import rippleEffect from "../rippleEffect.js"
import Profile from "./Profile"
// import Notifications from "./Notifications"
import Logo from "../Logo"

const Search = () => {
  let router = useRouter()
  const [keyword, setKeyword] = useState("")

  // takes care of search dropdown
  const [open, setOpen] = useState(false)
  const toggleSearch = () => {
    setOpen(!open)
  }

  // Handling search input change
  const handleChange = (e) => {
    setKeyword(e.target.value)
  }

  // Handling search input submit and redirecting to jobs with keyword
  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim().length > 0) {
      router.push(`/jobs?keyword=${keyword}`)
    } else {
      router.push(`/jobs`)
    }
  }

  // detect outside click hook
  let node = UseClickOutside(() => setOpen(false))

  return (
    <div className={styles.search__container} ref={node}>
      <button className={styles.toggle__search} onClick={toggleSearch}>
        <AiOutlineSearch className={styles.icon} />
      </button>
      <div
        className={
          open ? `${styles.search} ${styles.open}` : `${styles.search}`
        }
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={`search__form ${styles.search__form}`}
        >
          <input
            type="text"
            placeholder="Type to search..."
            onChange={(e) => handleChange(e)}
            name="keyword"
          />
          <button
            className={`btn btn-primary ${styles.btn}`}
            onClick={rippleEffect}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

const Header = () => {
  const { isAuthenticated } = useAuthState()
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  // detect outside click hook
  let node = UseClickOutside(() => setOpen(false))

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo__container}>
          <Link href="/">
            <a className={styles.logo}>
              <Logo height={20} />
            </a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <div className={styles.mobile__search}>
            <Search />
          </div>
          {!isAuthenticated && (
            <ul className={styles.auth__links}>
              <li className={styles.login}>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <a
                    className={`btn btn-primary ${styles.join}`}
                    onClick={rippleEffect}
                  >
                    Join
                  </a>
                </Link>
              </li>
            </ul>
          )}
          {isAuthenticated && (
            <div className={styles.auth}>
              {/* <Notifications /> */}
              <Profile />
            </div>
          )}
          <div
            className={
              open ? `${styles.menu} ${styles.open}` : `${styles.menu}`
            }
            ref={node}
          >
            <div className={styles.burger}>
              <button
                className={
                  open
                    ? `${styles.toggle__button} ${styles.close}`
                    : `${styles.toggle__button}`
                }
                onClick={toggleMenu}
              >
                <span className={styles.before} />
                <span className={styles.middle} />
                <span className={styles.after} />
              </button>
            </div>
            <ul className={styles.menu__list}>
              <li>
                <Link href="/jobs">
                  <a>Jobs</a>
                </Link>
              </li>
              <li>
                <Link href="/companies">
                  <a>Companies</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li className={`${styles.nav_item} ${styles.auth_link}`}>
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li className={`${styles.nav_item} ${styles.auth_link}`}>
                    <Link href="/register">
                      <a>Sign Up</a>
                    </Link>
                  </li>
                </>
              )}
              <Search />
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
