import styles from "./Footer.module.sass"
import Link from "next/link"
import Input from "../inputs/Input"
import FormButton from "../buttons/FormButton"
import Logo from "../BgLogo"

const Footer = () => {
  const handleChange = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer_left}>
        <Link href="/">
          <a className={styles.logo}>
            <Logo height={25} />
          </a>
        </Link>
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

          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              type="text"
              name="username"
              handleChange={handleChange}
              id="name"
              title="Name:"
              inputClass="bg_input"
              placeholder="Enter your full name"
            />
            <Input
              type="email"
              name="email"
              handleChange={handleChange}
              id="email"
              title="Email address:"
              inputClass="bg_input"
              placeholder="Enter your email address"
            />
            <FormButton
              text="Subscribe"
              btnClass="btn-primary"
              btnGroupClass="btns"
            />
          </form>
        </div>

        <div className={styles.footer_copyright}>
          <p>
            &#169; 2021 -{" "}
            <b>
              <span>Job</span>Portal.
            </b>
          </p>
        </div>
      </div>

      <div className={`${styles.footer_right} ${styles.flexgrid}`}>
        <div className={`${styles.f_browse} ${styles.flexcol}`}>
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

        <div className={`${styles.f_jobs} ${styles.flexcol}`}>
          <h3>About</h3>
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

        <div className={`${styles.f_connect} ${styles.flexcol}`}>
          <h3>Connect</h3>
          <Link href="/">
            <a className={styles.logo}>
              <Logo height={20} />
            </a>
          </Link>
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
      <div className={`${styles.footer_copyright} ${styles.mobile}`}>
        <p>
          &#169; 2021 -{" "}
          <b>
            <span>Job</span>Portal.
          </b>
        </p>
      </div>
    </footer>
  )
}

export default Footer