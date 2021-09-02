import { useState, useEffect } from "react"
import Error from "../../components/error/Error"
import Profile_Template from "../../components/profile_template/Profile_Template"
import { API } from "../../components/api"

const Company = ({ data, error }) => {
  let [details, setDetails] = useState(null)
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    if (isMounted)
      if (data && data?.id) {
        setDetails(data)
        setLoading(false)
      } else {
        setLoading(false)
      }
    return () => {
      isMounted = false
    }
  }, [data])

  useEffect(() => {
    let isMounted = true
    if (isMounted)
      if (error) {
        setLoading(false)
      }
    return () => {
      isMounted = false
    }
  }, [error])

  return (
    <div>
      {details && !loading && (
        <Profile_Template
          page="company"
          details={details}
          loading={loading}
          setDetails={setDetails}
        />
      )}
      {!loading && (!details || details == undefined) && <Error />}
    </div>
  )
}

export async function getServerSideProps(context) {
  let data = null
  let error = null
  try {
    const res = await fetch(`${API}/companies/${context.params.id}`)
    data = await res.json()
  } catch (err) {
    error = JSON.stringify(err)
  }

  return {
    props: {
      error,
      data,
    },
  }
}

export default Company
