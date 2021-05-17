import { RiLoader5Line } from "react-icons/ri"
import styles from "./btn.module.sass"

const ButtonLoader = () => {
  return (
    <span className={styles.spinner}>
      <RiLoader5Line className={styles.icon} />
    </span>
  )
}

export default ButtonLoader
