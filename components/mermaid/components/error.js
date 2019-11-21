import React, { useEffect } from 'react'
import { Base64 } from 'js-base64'

const Error = (props) => {
  const { match: { params: { base64 } } } = props
  const error = Base64.decode(base64)

  return <pre>{error}</pre>
}

export default Error