import Link from "next/link"
import { FaSync } from "react-icons/fa"
import Loader from "../../loaders/CompaniesLoader"
import styles from "./companies.module.sass"

// let loading = false
const Companies = ({ companies, loading, message, refresh, error }) => {
  return (
    <section className={styles.companies}>
      <div className={`${styles.container} container`}>
        <h2 className="primary__header">Trusted By</h2>
        <div className={`${styles.showcase}`}>
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            <>
              {companies?.length > 0 && (
                <>
                  {companies.map(({ logo, name, id, jobs }) => (
                    <article key={id}>
                      <Link href={`/companies/${id}`}>
                        <div className={`${styles.logo__container}`}>
                          <img src={logo} alt={`${name} logo`} />
                        </div>
                      </Link>
                      <Link href={`/companies/${id}?tab=jobs`}>
                        <a>View {jobs} Jobs</a>
                      </Link>
                    </article>
                  ))}
                </>
              )}
              {message && <p>{message}</p>}
              {(message || error) && (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    onClick={refresh}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <FaSync
                      className={loading ? `spinner` : ``}
                      style={{
                        fontSize: "1.8rem",
                        color: "gray",
                      }}
                    />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className={styles.link__container}>
          <Link href={`/companies`}>
            <a>More Companies</a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Companies
