import styles from "./Footer.module.sass"
import Link from "next/link"

const Footer = () => {
  return (<div className={styles.footer_container}>
    <div className={styles.footer_left}>
    <h1 className={styles.logo}>
    <Link href="/">
      <a  href="/"><span>Job</span>Portal.</a>
      </Link>
  </h1>
      <p className={styles.footer_call_to_action}>Sign Up today to start applying for different jobs and posting jobs for different professions 
      <a className={styles.footer_links}>Register</a></p>
      <p className={styles.footer_call_to_action}>Already Registered? 
      <a className={styles.footer_links}>Login</a></p>

      <div>
      <p className={styles.footer_call_to_action} >Subscribe to start receiving notifications when new jobs are posted </p>
      <form>
        <input className={styles.footer_form} type="text" placeholder="Name" name="name"/>
        <input className={styles.footer_form} type="text" placeholder="Email" name="email"/>
        <button className={`btn btn-primary ${styles.btn}`}> Subscribe </button>
      </form>
      </div>

      <div className={styles.footer_copyright}>
        <p> &#169; 2021 - <b><span>Job</span>Portal.</b> </p>
      </div>

    </div>
    <div className={styles.footer_right}>
      <div className={styles.f_browse}>
      <h3>Browse</h3>
      <ul>
        <li><Link href="/"><a>Jobs</a></Link></li>
        <li><Link href="/"><a>Companies</a></Link></li>
      </ul>
      </div>

      <div className={styles.f_jobs}>
      <h3>Jobs</h3>
      <ul>
        <li><Link href="/">About us</Link></li>
        <li><Link href="/">Contact us</Link></li>
        <li><Link href="/">Help</Link></li>
        <li><Link href="/"><a href="/">Terms of Use</a></Link></li>
      </ul>
      </div>

      <div className={styles.f_connect}>
      <h3>Connect</h3>
      <h1 className={styles.logo2}>
    <Link href="/">
      <a  href="/"><span>Job</span>Portal.</a>
      </Link>
  </h1>
      <ul>
        <li><Link href="/">Facebook</Link></li>
        <li><Link href="/">Twitter</Link></li>
        <li><Link href="/">LinkedIn</Link></li>
        <li><Link href="/"><a href="/">Instagram</a></Link></li>
      </ul>
      </div>
    </div>
  </div>)
}

export default Footer
