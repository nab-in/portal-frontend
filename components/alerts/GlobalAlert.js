import React from "react"
import { useAlertsState, useAlertsDispatch } from "../../context/alerts"
import { AiOutlineClose } from "react-icons/ai"

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
        <div className={`alerts removable ${type}`}>
          {message && message}
          <AiOutlineClose className="icon" onClick={close} />
        </div>
      )}
    </>
  )
}

export default GlobalAlert
