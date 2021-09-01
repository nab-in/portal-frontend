import styles from "./authfooter.module.sass"
import Link from "next/link"
import { useAuthState } from "../../context/auth"
import { DASH } from "../api"
import Social from "./Social"

const AuthFooter = () => {
  const { roles } = useAuthState()
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  return (
    <footer className={styles.footer}>
      <section className={styles.footer__container}>
        <article className={styles.footer__links}>
          <h3>Browse</h3>
          <div className={styles.showcase}>
            <ul>
              {roles?.length > 0 &&
                roles.map(({ id, name }) => (
                  <li key={id}>
                    <a href={`${DASH}/?role=${id}`} target="_blank">
                      {capitalizeFirstLetter(name)} Dashboard
                    </a>
                  </li>
                ))}
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
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=applied-jobs">
                  <a>Applied Jobs</a>
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=saved-jobs">
                  <a>Saved Jobs</a>
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
      </section>
    </footer>
  )
}

export default AuthFooter
