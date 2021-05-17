import styles from "./card.module.sass"
const CardLoader = () => {
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.logo}></div>
      <div className={styles.details}>
        <h2>
          <span className="loader"></span>
        </h2>
        <div className={`stars ${styles.stars}`}></div>
        <p>
          <span className="loader"></span>
        </p>
        <p>
          <span className="loader"></span>
        </p>
      </div>
    </article>
  )
}

export default CardLoader
