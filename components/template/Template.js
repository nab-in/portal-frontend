import React from "react"
import styles from "./template.module.sass"

const Template = ({ heading, children }) => {
  return (
    <section className={styles.template}>
      <div className={styles.container}>
        {heading && <h1 className="primary__header">{heading}</h1>}
        {children}
      </div>
    </section>
  )
}

export default Template
