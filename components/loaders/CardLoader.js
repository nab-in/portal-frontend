import styles from "./card.module.sass"
const CardLoader = () => {
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.logo}></div>
      <div className={styles.details}>
        <h2></h2>
        <div className={`stars ${styles.stars}`}></div>
        <p></p>
        <p></p>
      </div>
    </article>
  )
}

export default CardLoader
