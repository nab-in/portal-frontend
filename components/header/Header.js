import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiOutlineSearch,AiOutlineMenu } from "react-icons/ai"
import styles from "./Header.module.sass"

let isAuthenticated = false

const Notifications = () => {
  let [open, setOpen] = useState(false)
  const close = () => setOpen(!open)
  return <div className={styles.notifications}>
    Notifications component
  </div>
}

const Profile = () => {
  let [open, setOpen] = useState(false)
  const close = () => setOpen(!open)
  return <div className={styles.profile}>
    Profile component
  </div>
}

const Search = () => {
  let router = useRouter()
  const [keyword, setKeyword] = useState(null)
  const [search, setSearch] = useState(false)
  const toggleSearch = () => {
    setSearch(!search)
  }

  const handleChange = e => {
    setKeyword(e.target.value)
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    if (keyword.trim().length > 0)
      router.push(`/jobs?keyword=${keyword}`)
  }

  return (
    <div className={styles.search__container}>
      <button className={styles.toggle__search} onClick={toggleSearch}>
        <AiOutlineSearch className={styles.icon}/>
      </button>
      <div className={search? `${styles.search} ${styles.open}`: `${styles.search}`}>
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
              <button className={`btn btn-primary ${styles.btn}`}>
                Search
              </button>
            </form>
        </div>
    </div>
  )
}

const Header = () => {
  const [isOpen, setisOpen] = useState(false);

  const toggleMenu = () => {
    setisOpen(!isOpen);
  }

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
          <ul className={isOpen? `${styles.menu} ${styles.open}`: `${styles.menu}`}>
            <li className={`${styles.nav_item} ${styles.active}`}>
              <Link href="/jobs">
                <a className="nav_link">
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
                <a className="nav_link">
                  About
                </a>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link href="/contact">
                <a className="nav_link">
                  Contact
                </a>
              </Link>
            </li>
            <Search />
          </ul>
           <ul className={styles.auth__links}>
            <li>
              <Link href="/login">
                <a className="nav_link">
                  Login
                </a>
              </Link>
            </li>
            <li className={`btn btn-primary ${styles.btn__primary}`}>
              <Link href="/register">
               <a className={styles.join}>
                  Join Us
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        {isAuthenticated && <>
            <Notifications />
            <Profile />
          </>
        }
        <div className={styles.burger}>
          <button className={styles.toggle__button} onClick={toggleMenu}>
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
