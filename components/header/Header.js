import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiOutlineSearch,AiOutlineMenu } from "react-icons/ai"
import styles from "./Header.module.sass"

const Header = () => {
  let router = useRouter()
  const [keyword, setKeyword] = useState(null)
  const [isOpen, setisOpen] = useState(false);
  const [search, setSearch] = useState(false)

  const handleChange = e => {
    setKeyword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (keyword.trim().length > 0)
      router.push(`/jobs?keyword=${keyword}`)
  }

  const toggleMenu = () => {
    setisOpen(!isOpen);
  }

  const toggleSearch = () => {
    setSearch(!search)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
       <div className={styles.logo__container}>
          <div className={styles.logo}>
            <Image
              src={`/assets/images/logo.png`}
              alt={`logo`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <nav>
          <ul className={isOpen? `${styles.menu} ${styles.open}`: `${styles.menu}`}>
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
          </ul>
          <button className={styles.toggle__search} onClick={toggleSearch}>
              <AiOutlineSearch className={styles.icon}/>
            </button>
           <ul className={styles.auth__links}>
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
        <div className={styles.burger}>
          <button className={styles.toggle__button} onClick={toggleMenu}> <AiOutlineMenu /></button>
        </div>
        <div className={search? `${styles.search__container} ${styles.open}`: `${styles.search__container}`}>
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
    </header>
  )
}

export default Header
