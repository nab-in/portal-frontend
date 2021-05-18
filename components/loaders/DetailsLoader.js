import styles from "./details.module.sass"

const DetailsLoader = () => {
  return (
    <div className={styles.details}>
      <div className={styles.title}>
        <span className="loader" />
      </div>
      <div className={styles.title}>
        <span className="loader" />
      </div>
      <div className={styles.title}>
        <span className="loader" />
      </div>
      <div className={styles.title}>
        <span className="loader" />
      </div>
      <div className={styles.title}>
        <span className="loader" />
      </div>
      <div className={styles.descriptions}>
        <span className="loader" />
      </div>
    </div>
  )
}

export default DetailsLoader
