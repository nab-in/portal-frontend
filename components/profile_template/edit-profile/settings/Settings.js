import { useAuthState } from "../../../../context/auth"
import Username from "./Username"
import Email from "./Email"
import Password from "./Password"

const Settings = () => {
  let { user } = useAuthState()
  return (
    <section>
      <header>
        <h2>Settings</h2>
      </header>
      <article>
        <Username username={user.username && user.username} />
        <Email email={user?.email} />
        <Password />
      </article>
    </section>
  )
}

export default Settings
