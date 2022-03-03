import { useAuthState } from "../../../../context/auth"
import Link from "next/link"
import Section from "../../Section"
import Username from "./Username"
import Email from "./Email"
import Password from "./Password"

const Settings = ({ page }) => {
  let { user } = useAuthState()
  return (
    <Section title="Settings">
      <article>
        <p
          style={{
            textAlign: "right",
            marginBottom: "1rem",
          }}
        >
          <Link href="/forgot_password">Forgot password?</Link>
        </p>
        {page === "user" && (
          <Username username={user.username && user.username} />
        )}
        <Email email={user?.email} />
        <Password />
      </article>
    </Section>
  )
}

export default Settings
