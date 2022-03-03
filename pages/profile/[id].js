import { useAuthState } from "../../context/auth"
import Profile_Template from "../../components/profile_template/Profile_Template"
import Error from "../../components/error/Error"

const profile = () => {
  let { user, loading } = useAuthState()
  return (
    <div>
      {user && !loading && <Profile_Template page="user" details={user} />}
      {!user && !loading && <Error />}
    </div>
  )
}

export default profile
