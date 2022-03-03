import Hero from "./hero/Hero"
import Template from "./template/Template"

const Profile_Template = ({ details, setDetails, page, loading }) => {
  return (
    <div>
      <Hero page={page} details={details} loading={loading} />
      <main>
        <Template
          page={page}
          details={details}
          loading={loading}
          setDetails={setDetails}
        />
      </main>
    </div>
  )
}

export default Profile_Template
