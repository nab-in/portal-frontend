import { useEffect } from "react"

let format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/

export const checkChange = (name, setError) => {
  let check = format.test(name)
  if (check) setError(null)
  if (!check)
    setError({
      type: "danger",
      msg: "Invalid email",
    })
}

const checkMail = (name, setError) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name) {
        let check = format.test(name)
        console.log(check)
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
