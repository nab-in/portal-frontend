import React from "react"
import Image from "next/image"

const Logo = ({ height, width }) => {
  return (
    <Image
      src="/assets/images/logo.png"
      alt="logo"
      height={height}
      width={width}
      layout="intrinsic"
    />
  )
}

export default Logo
