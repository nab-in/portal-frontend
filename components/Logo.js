import React from "react"

const Logo = ({ height, width }) => {
  return (
    <img
      src="/assets/images/logo.png"
      alt="logo"
      height={height}
      style={{
        width: "auto",
      }}
    />
  )
}

export default Logo
