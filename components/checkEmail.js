import { useEffect } from "react"

let format = /^\S+@\S+\.\S+$/

export const checkEmailChange = (name, setError) => {
  let check = format.test(name)
  if (check) setError(null)
}

const checkMail = (name, setError) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name) {
        let check = format.test(name)
        if (check) setError(null)
        if (!check)
          setError({
            type: "danger",
            msg: "Invalid email",
          })
      }
    }, [50])
    return () => clearTimeout(timeout)
  }, [name])
  return null
}

export default checkMail
