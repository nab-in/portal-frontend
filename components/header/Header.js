import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiOutlineSearch } from "react-icons/ai"
import { FaBell } from "react-icons/fa"
import UseClickOutside from "../UseClickOutside"
import styles from "./Header.module.sass"
import rippleEffect from "../rippleEffect.js"

let isAuthenticated = true

const Notifications = () => {
  let [open, setOpen] = useState(false)
  let number = 5
  const toggleNotification = () => setOpen(!open)

  // detect outside click hook
  let node = UseClickOutside(() => setOpen(false))

  return (
    <div className={styles.notifications} ref={node}>
      <div className={styles.toggle}>
        <button onClick={toggleNotification}>
          <FaBell className={styles.icon} />
          {0 < number && number <= 99 && <span>{number}</span>}
          {number > 99 && <span>99+</span>}
        </button>
      </div>
      <div
        className={
          open ? `${styles.dropdown} ${styles.open}` : `${styles.dropdown}`
        }
      >
        <h3>Notifications</h3>
        <div className={styles.showcase}>
          <article className={styles.unread}>Notification one</article>
          <article className={styles.unread}>Notification one</article>
          <article>Notification one</article>
          <article>Notification one</article>
        </div>
        <Link href="/notifications">
          <a>View All</a>
        </Link>
      </div>
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
      <div onClick={() => setOpen(!open)} className={styles.profile}>
        <div className={styles.name}>
          <span>Username</span>
        </div>
        <div className={styles.dp__container}>
          <Image
            src={`/assets/images/dp.jpeg`}
            alt={`dp`}
            height={40}
            width={40}
            objectFit="cover"
          />
        </div>
      </div>
      <div
        className={
          open ? `${styles.dropdown} ${styles.open}` : `${styles.dropdown}`
        }
      >
        <div className={styles.profile}>
          <div className={styles.dp__container}>
            <Image
              src={`/assets/images/dp.jpeg`}
              alt={`dp`}
              height={40}
              width={40}
              objectFit="cover"
            />
          </div>
          <div className={styles.name}>John Doe</div>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/profile">
                <a onClick={() => setOpen(false)}>Profile</a>
              </Link>
            </li>
            <ul>
              <li>
                <Link href="/profile?tab=saved-jobs">
                  <a onClick={() => setOpen(false)}>Saved Jobs</a>
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=applied-jobs">
                  <a onClick={() => setOpen(false)}>Applied Jobs</a>
                </Link>
              </li>
            </ul>
            <li>
              <a href="#!">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

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
                    Join Us
                  </a>
                </Link>
              </li>
            </ul>
          )}
          {isAuthenticated && (
            <div className={styles.auth}>
              <Notifications />
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
        </nav>
      </div>
    </header>
  )
}

export default Header
