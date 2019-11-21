import React, { useEffect, useRef } from 'react'

import { base64ToState } from './utils'

const View = (props) => {
  let container = useRef(null)
  
  const {
    match: {
      params: { base64 }
    },
    location: { search }
  } = props
  const json = base64ToState(base64, search)

  useEffect(() => {
    mermaid.initialize(json.mermaid)
    mermaid.init(undefined, container)
  })

  return (
    <div
      ref={div => {
        container = div
      }}
    >
      {json.code}
    </div>
  )
}

export default View