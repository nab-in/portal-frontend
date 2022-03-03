import styles from "./companies.module.sass"

const CompaniesLoader = () => {
  return (
    <div className={styles.companies}>
      <div />
      <p>
        <span className="loader" />
      </p>
    </div>
  )
}

export default CompaniesLoader
