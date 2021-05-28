import styles from "./FooterLoggedIn.module.sass";
import Link from "next/link";

const FooterLoggedIn = () => {
  return (
    <footer>
      <div className={styles.flex_container}>
        <div className={`${styles.f_browse} ${styles.flexcol}`}>
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

        <div className={`${styles.f_jobs} ${styles.flexcol}`}>
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

        <div className={`${styles.f_connect} ${styles.flexcol}`}>
          <h3>Connect</h3>
          <h1 className={styles.logo}>
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
  );
};

export default FooterLoggedIn;
