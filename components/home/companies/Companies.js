import React from "react"
import Link from "next/link"
import styles from "./companies.module.sass"
import companies from "../../../data/companies"

const Companies = () => {
  return (
    <section className={styles.companies}>
      <div className={`${styles.container} container`}>
        <h2 className="primary__header">Trusted By</h2>
        <div className={`${styles.showcase}`}>
          {companies.slice(1, 7).map(({ logo, name, id, jobs }) => (
            <article key={id}>
              <Link href={`/companies/${id}`}>
                <div className={`${styles.logo__container}`}>
                  <img
                    src={`/assets/companies/${logo}`}
                    alt={`${name} logo`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Link>
              <Link href={`/companies/${id}/jobs/`}>
                <a>View {jobs} Jobs</a>
              </Link>
            </article>
          ))}
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
