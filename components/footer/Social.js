import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"
import Logo from "../BgLogo"
import styles from "./social.module.sass"

const Social = () => {
  return (
    <article className={styles.social}>
      <h3>Connect</h3>
      <div className={styles.logo}>
        <Logo height={20} />
      </div>
      <div className={styles.social__showcase}>
        <ul>
          <li>
            <a href="http://facebook.com" target="_blank">
              <FaFacebookF className={styles.social__icon} />
            </a>
          </li>
          <li>
            <a href="http://twitter.com" target="_blank">
              <FaTwitter className={styles.social__icon} />
            </a>
          </li>
          <li>
            <a href="http://linkedin.com" target="_blank">
              <FaLinkedinIn className={styles.social__icon} />
            </a>
          </li>
          <li>
            <a href="http://instagram.com" target="_blank">
              <FaInstagram className={styles.social__icon} />
            </a>
          </li>
        </ul>
      </div>
    </article>
  )
}

export default Social
