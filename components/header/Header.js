import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiOutlineSearch } from "react-icons/ai"
import UseClickOutside from "../UseClickOutside"
import styles from "./Header.module.sass"

let isAuthenticated = false

const Notifications = () => {
  let [open, setOpen] = useState(false)
  const close = () => setOpen(!open)

  // detect outside click hook
  let node = UseClickOutside(() => setOpen(false))

  return (
    <div className={styles.notifications} ref={node}>
      Notifications component
    </div>
  )
}

const Profile = () => {
  // takes care of profile drop down
  let [open, setOpen] = useState(false)
  const toggleDropdown = () => setOpen(!open)

  // detect outside click hook
  let node = UseClickOutside(() => setOpen(false))

  return (
    <div className={styles.profile} ref={node}>
      Profile component
    </div>
  )
}

const Search = () => {
  let router = useRouter()
  const [keyword, setKeyword] = useState(null)

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
    if (keyword.trim().length > 0) router.push(`/jobs?keyword=${keyword}`)
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
          <button className={`btn btn-primary ${styles.btn}`}>Search</button>
        </form>
      </div>
    </div>
  )
}

const Header = () => {
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
              <Image
                src={`/assets/images/logo.png`}
                alt={`logo`}
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
        <nav>
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
            <ul>
              <li className={`${styles.nav_item} ${styles.active}`}>
                <Link href="/jobs">
                  <a className="nav_link">Jobs</a>
                </Link>
              </li>
              <li className={`${styles.nav_item} ${styles.active}`}>
                <Link href="/companies">
                  <a className="nav_link">Companies</a>
                </Link>
              </li>
              <li className={styles.nav_item}>
                <Link href="/about">
                  <a className="nav_link">About</a>
                </Link>
              </li>
              <li className={styles.nav_item}>
                <Link href="/contact">
                  <a className="nav_link">Contact</a>
                </Link>
              </li>
              <Search />
            </ul>
          </div>
          {!isAuthenticated && (
            <ul className={styles.auth__links}>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <a className={`btn btn-primary ${styles.join}`}>Join Us</a>
                </Link>
              </li>
            </ul>
          )}
        </nav>
        {isAuthenticated && (
          <>
            <Notifications />
            <Profile />
          </>
        )}
      </div>
    </header>
  )
}

export default Header
