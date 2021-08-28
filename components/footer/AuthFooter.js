import styles from "./authfooter.module.sass"
import Link from "next/link"
import { useAuthState } from "../../context/auth"
import { DASH } from "../api"

const AuthFooter = () => {
  const { roles } = useAuthState()
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  return (
    <footer className={styles.footer_container}>
      <div className={styles.flex_container}>
        <div className={styles.f_browse}>
          <h3>Company</h3>
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

        <div className={styles.f_jobs}>
          <h3>Browse</h3>
          <ul>
            {roles?.length > 0 &&
              roles.map(({ id, name }) => (
                <li>
                  <a href={`${DASH}/select_identity?role=${id}`}>
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
              <Link href="/">
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Applied Jobs</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Saved Jobs</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.f_connect}>
          <h3>Connect</h3>
          <h1 className={styles.logo}>
            <Link href="/">
              <a>
                {/* <span>Job</span>Portal. */}
                {/* <img /> */}
              </a>
            </Link>
          </h1>
          <ul>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">LinkedIn</a>
            </li>
            <li>
              <a href="/">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footer_copyright}>
        <p>
          {" "}
          &#169; 2021 -{" "}
          <b>
            <span>Job</span>Portal.
          </b>{" "}
        </p>
      </div>
    </footer>
  )
}

export default AuthFooter
