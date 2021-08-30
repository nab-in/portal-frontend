import { FaSync } from "react-icons/fa"
import Section from "../Section"
import Job from "../../job/Job"
import Loader from "../../loaders/CardLoader"
import Spinner from "../../loaders/ButtonLoader"

const JobsTemplate = ({
  errors,
  loading,
  jobs,
  page,
  setJobs,
  number,
  title,
  message,
  loadMore,
  loadMoreJobs,
  refreshJobs,
}) => {
  return (
    <Section title={title}>
      <article>
        {loading ? (
          <>
            <Loader />
            <Loader />
            <Loader />
          </>
        ) : (
          <div className="main__content">
            {errors?.type === "normal" ? (
              <p className="alerts danger">{errors?.msg}</p>
            ) : (
              <>
                {jobs?.length > 0 && (
                  <p
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    Showing {number} result(s)
                  </p>
                )}
                {jobs?.length > 0 &&
                  jobs.map((job) => (
                    <Job
                      key={job.id}
                      job={job}
                      page={page}
                      setItems={setJobs}
                    />
                  ))}
                {errors?.type === "infinite" && (
                  <p className={`alerts danger`}>{errors.msg}</p>
                )}
              </>
            )}
            {message && !loading && <p>{message}</p>}
            {jobs?.length > 0 ? (
              <>
                {loadMore ? (
                  <Spinner bg="light" />
                ) : (
                  <>
                    {!message && (
                      <button className="primary__text" onClick={loadMoreJobs}>
                        Load More
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <button
                  onClick={refreshJobs}
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
          </div>
        )}
      </article>
    </Section>
  )
}

export default JobsTemplate
