import styles from "./template.module.sass"

const Template = ({ heading, filters, children }) => {
  return (
    <section className={styles.template}>
      <div className={styles.container}>
        {filters && filters}
        {heading && <h1 className="primary__header">{heading}</h1>}
        {children}
      </div>
    </section>
  )
}

export default Template
