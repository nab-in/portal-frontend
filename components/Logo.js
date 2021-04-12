import React from "react"
import Image from "next/image"

const Logo = () => {
  return (
    <div className="image">
      <Image
        src="/assets/images/logo.png"
        alt="Image"
        height={40}
        width="auto"
        layout="intrinsic"
      />
    </div>
  )
}

export default Logo
