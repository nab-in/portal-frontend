import { useEffect } from "react"
import { useAlertsState, useAlertsDispatch } from "../../context/alerts"
import { AiOutlineClose } from "react-icons/ai"
import UseClickOutside from "../UseClickOutside"

const GlobalAlert = () => {
  let { alert } = useAlertsState()
  let dispatch = useAlertsDispatch()
  let { message, type } = alert

  const close = () => {
    dispatch({
      type: "REMOVE",
    })
  }

  let node = UseClickOutside(() => close())

  useEffect(() => {
    let timeout = setTimeout(() => {
      close()
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [alert])

  return (
    <>
      {alert.message && (
        <div
          ref={node}
          className={
            alert.message
              ? `alerts removable ${type} open`
              : `alerts removable ${type}`
          }
        >
          <p>{message && message}</p>
          <AiOutlineClose className="icon" onClick={close} />
        </div>
      )}
    </>
  )
}

export default GlobalAlert
