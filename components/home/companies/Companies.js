import React, { useState, useEffect } from "react"
import Link from "next/link"
import Loader from "../../loaders/CompaniesLoader"
import styles from "./companies.module.sass"
import { API } from "../../api"

// let loading = false
const Companies = ({ companies, loading }) => {
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
              {companies?.companies.length > 0 ? (
                <>
                  {companies.companies.map(({ logo, name, id, jobs }) => (
                    <article key={id}>
                      <Link href={`/companies/${id}`}>
                        <div className={`${styles.logo__container}`}>
                          <img
                            src={logo}
                            alt={`${name} logo`}
                          />
                        </div>
                      </Link>
                      <Link href={`/companies/${id}?tab=jobs`}>
                        <a>View {jobs} Jobs</a>
                      </Link>
                    </article>
                  ))}
                </>
              ) : (
                <>No company found</>
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
