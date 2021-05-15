import Username from "./Username"
import Email from "./Email"
import Password from "./Password"

const Settings = () => {
  return (
    <section>
      <header>
        <h2>Settings</h2>
      </header>
      <article>
        <Username />
        <Email />
        <Password />
      </article>
    </section>
  )
}

export default Settings
