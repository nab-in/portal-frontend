import styles from "./Footer.module.sass"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer_left}>
        <h1 className={styles.logo}>
          <Link href="/">
            <a>
              <span>Job</span>Portal.
            </a>
          </Link>
        </h1>
        <p className={styles.footer_call_to_action}>
          Sign Up today to start applying for different jobs and posting jobs
          for different professions
          <Link href="/register">
            <a className={styles.footer_links}>Register</a>
          </Link>
        </p>
        <p className={styles.footer_call_to_action}>
          Already Registered?
          <Link href="/login">
            <a className={styles.footer_links}>Login</a>
          </Link>
        </p>

        <div>
          <p className={styles.footer_call_to_action}>
            Subscribe to start receiving notifications when new jobs are posted{" "}
          </p>
          <form>
            <input
              className={styles.footer_form}
              type="text"
              placeholder="Name"
              name="name"
            />
            <input
              className={styles.footer_form}
              type="text"
              placeholder="Email"
              name="email"
            />
            <button className={`btn btn-primary ${styles.btn}`}>
              {" "}
              Subscribe{" "}
            </button>
          </form>
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
      </div>
      <div className={styles.footer_right}>
        <div className={styles.f_browse}>
          <h3>Browse</h3>
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

        <div className={styles.f_jobs}>
          <h3>Jobs</h3>
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

        <div className={styles.f_connect}>
          <h3>Connect</h3>
          <h1 className={styles.logo2}>
            <Link href="/">
              <a>
                <span>Job</span>Portal.
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
    </footer>
  )
}

export default Footer
