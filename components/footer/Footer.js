import styles from "./Footer.module.sass"
import Link from "next/link"
import Social from "./Social"
import Logo from "../BgLogo"
import Subscribe from "./Subscribe"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer__left}>
        <div className={styles.footer__left__container}>
          <div className={styles.logo}>
            <Logo height={25} />
          </div>
          <div className={styles.footer__texts}>
            <p>
              Sign Up today to start applying for different jobs and posting
              jobs for different professions &nbsp;
              <Link href="/register">
                <a>Register</a>
              </Link>
            </p>
            <p>
              Already Registered? &nbsp;
              <Link href="/login">
                <a>Login</a>
              </Link>
            </p>
          </div>
          <div className={styles.form}>
            <p>
              <b>OR</b> Subscribe to our newsletter to receive updates on jobs
              of your preference
            </p>
            <Subscribe />
          </div>
          <div className={styles.footer_copyright}>
            <p>
              &#169; 2021 -&nbsp;
              <span>Job</span>Portal. Designed and Developed by&nbsp;
              <a href="http://github.com/nab-in" target="_blank">
                We Code Together
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className={styles.footer__right}>
        <div className={styles.footer__right__container}>
          <article className={styles.footer__links}>
            <h3>Browse</h3>
            <div className={styles.showcase}>
              <ul>
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
              </ul>
            </div>
          </article>
          <article className={styles.footer__links}>
            <h3>About</h3>
            <div className={styles.showcase}>
              <ul>
                <li>
                  <Link href="/about">About us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact us</Link>
                </li>
                <li>
                  <Link href="/help">Help</Link>
                </li>
                <li>
                  <Link href="/terms">
                    <a>Terms of Use</a>
                  </Link>
                </li>
              </ul>
            </div>
          </article>
          <article className={styles.social}>
            <Social />
          </article>
          <div className={`${styles.footer_copyright} ${styles.mobile}`}>
            <p>
              &#169; 2021 -&nbsp;
              <span>Job</span>Portal. Designed and Developed by&nbsp;
              <a href="http://github.com/nab-in" target="_blank">
                We Code Together
              </a>
            </p>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
