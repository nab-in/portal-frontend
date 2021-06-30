import { useState, useEffect } from "react"
import Error from "../../components/error/Error"
import Profile_Template from "../../components/profile_template/Profile_Template"
import { API } from "../../components/api"

const Company = ({ data, error }) => {
  let [details, setDetails] = useState()
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    if (data) {
      setDetails(data)
      setLoading(false)
    }
  }, [data])
  useEffect(() => {
    if (error) {
      console.log(error)
      setLoading(false)
    }
  }, [error])
  return (
    <div>
      {details && (
        <Profile_Template page="company" details={details} loading={loading} />
      )}
      {!details && !loading && <Error />}
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
