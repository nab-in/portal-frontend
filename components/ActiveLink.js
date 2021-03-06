import { Children, cloneElement } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import styles from "./header/Header.module.sass"

const ActiveLink = withRouter(({ router, children, ...props }) => (
  <Link {...props}>
    {cloneElement(Children.only(children), {
      className:
        `/${router.pathname.split("/")[1]}` === props.href
          ? `${styles.active}`
          : null,
    })}
  </Link>
))

export default withRouter(ActiveLink)
