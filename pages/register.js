import Link from "next/link"
import Logo from "../components/Logo"
import Register from "../components/register/Register"
import styles from "../styles/register.module.sass"

const register = () => {
  return (
    <div className={styles.register}>
      <div className={styles.left__column}>
        <div className={styles.logo}>
          <Link href="/">
            <a className={styles.logo}>
              <Logo height={30} width={174} />
            </a>
          </Link>
        </div>
        <p>
          Create an account today to start receiving notifications on newly
          posted jobs. To post jobs and to save your favourite jobs for later
          and to apply for Jobs.
        </p>
      </div>
      <div className={styles.right__column}>
        <div className={styles.card}>
          <h2>Sign Up Now!</h2>
          <Register />
          <div className={`${styles.extra__stuffs}`}>
            Already have an account?{" "}
            <Link href="/login">
              <a className="dark_bg">Login</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default register
