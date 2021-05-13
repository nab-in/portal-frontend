import styles from "../styles/page.module.sass"
import PageTemplate from "../components/page_template/PageTemplate"

const Contact = () => {
  return (
    <div className={styles.contact_header}>
      <PageTemplate heading="Contact Us">
        {/* any other contents goes here */}
      </PageTemplate>
    </div>
  )
}

export default Contact
