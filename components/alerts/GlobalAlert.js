import React from "react"
import { useAlertsState, useAlertsDispatch } from "../../context/alerts"
import { AiOutlineClose } from "react-icons/ai"
import styles from "./alerts.module.sass"

const GlobalAlert = () => {
  let { alert } = useAlertsState()
  let dispatch = useAlertsDispatch()
  let { message, type } = alert

  const close = () => {
    dispatch({
      type: "REMOVE",
    })
  }
  return (
    <>
      {alert.message && (
        <div className={`${styles.alerts} ${styles[type]}`}>
          {message && message}
          <AiOutlineClose className={styles.icon} onClick={close} />
        </div>
      )}
    </>
  )
}

export default GlobalAlert
