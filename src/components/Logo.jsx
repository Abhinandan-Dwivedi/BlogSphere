import React from 'react'

export default function Logo({width = '100px'}) {
  return (
      <div className="w-10 h-10 rounded-full overflow-hidden">
  <img
    src="../../src/logo/logo.png"
    alt="logo"
    className="w-full h-full object-cover"
  />
</div>
  )
}
