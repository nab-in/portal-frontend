import React from "react"
import styles from "./footer.module.sass"
import Link from "next/link"
import Social from "./Social"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import Logo from "../BgLogo"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer__right}>
        <div className={styles.footer__left__container}></div>
      </section>
      <section className={styles.footer__left}>
        <div className={styles.footer__left__container}>
          <Social />
        </div>
      </section>
    </footer>
  )
}

export default Footer
