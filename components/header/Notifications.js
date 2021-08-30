import { useState } from "react"
import Link from "next/link"
import { FaBell } from "react-icons/fa"
import UseClickOutside from "../UseClickOutside"
import styles from "./notifications.module.sass"

const Notifications = () => {
  let [open, setOpen] = useState(false)
  let number = 5
  const toggleNotification = () => setOpen(!open)

  // detect outside click hook
  let node = UseClickOutside(() => setOpen(false))

  return (
    <div className={styles.notifications} ref={node}>
      <div className={styles.toggle}>
        <button onClick={toggleNotification}>
          <FaBell className={styles.icon} />
          {0 < number && number <= 99 && <span>{number}</span>}
          {number > 99 && <span>99+</span>}
        </button>
      </div>
      <div
        className={
          open ? `${styles.dropdown} ${styles.open}` : `${styles.dropdown}`
        }
      >
        <h3>Notifications</h3>
        <div className={styles.showcase}>
          <article className={styles.unread}>Notification one</article>
          <article className={styles.unread}>Notification one</article>
          <article>Notification one</article>
          <article>Notification one</article>
        </div>
        <Link href="/notifications">
          <a>View All</a>
        </Link>
      </div>
    </div>
  )
}

export default Notifications
