import React, { useState, useRef } from "react"
import { BiPlus, BiMinus } from "react-icons/bi"
import styles from "./accordion.module.sass"

const Accordion = ({ title, children }) => {
  const [active, setActive] = useState("")
  const [height, setHeight] = useState("0px")

  const content = useRef(null)

  const toggleAccordion = () => {
    setActive(active === "" ? "active" : "")
    setHeight(active === "active" ? "0px" : `${content.current.scrollHeight}px`)
  }
  return (
    <div onClick={() => toggleAccordion()} className={styles.accordion}>
      <p>
        {title}{" "}
        <span>
          {active ? <BiMinus className="icon" /> : <BiPlus className="icon" />}
        </span>
      </p>
      <div
        ref={content}
        style={{
          maxHeight: `${height}`,
        }}
        className={styles.accordion__content}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
