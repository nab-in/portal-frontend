import { useAuthState } from "../../../../context/auth"
import Section from "../../Section"
import Username from "./Username"
import Email from "./Email"
import Password from "./Password"

const Settings = () => {
  let { user } = useAuthState()
  return (
    <Section title="Settings">
      <article>
        <Username username={user.username && user.username} />
        <Email email={user?.email} />
        <Password />
      </article>
    </Section>
  )
}

export default Settings
