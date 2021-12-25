import styles from "../../styles/page.module.sass"
import PageTemplate from "../../components/page_template/PageTemplate"

const application = () => {
  return (
    <div className={styles.page}>
      <PageTemplate heading="Application status">
        <p>View application status page</p>
      </PageTemplate>
    </div>
  )
}

export default application
