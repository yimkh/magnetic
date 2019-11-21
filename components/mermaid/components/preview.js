import React, { useEffect, useRef } from 'react'
import { Divider, Card } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Base64 } from 'js-base64'

const Preview = (props) => {
  let container = useRef(null);

  const {
    code,
    match: { url }
  } = props

  const onDownloadSVG = (event) => {
    event.target.href = `data:image/svg+xml;base64,${Base64.encode(
      container.innerHTML
    )}`
    event.target.download = `mermaid-diagram-${moment().format(
      'YYYYMMDDHHmmss'
    )}.svg`
  }

  const initMermaid = () => {
    const {
      code,
      history,
      match: { url }
    } = props
    try {
      mermaid.parse(code)
      let _code = code
      _code = _code.replace(/</g, '&lt;')
      _code = _code.replace(/>/g, '&gt;')
      container.innerHTML = _code
      mermaid.init(undefined, container)
    } catch (e) {
      const base64 = Base64.encodeURI(e.str || e.message)
      history.push(`${url}/error/${base64}`)
    }
  }

  useEffect(() => {
    container.removeAttribute('data-processed')
    container.innerHTML = props.code.replace(
      'onerror=',
      'onerror&equals;'
    )
    
    initMermaid()
  })
  
  return (
    <div>
      <Card title='Preview'>
        <div
          ref={div => {
            container = div
          }}
        >
          {code}
        </div>
      </Card>
      <Card title='Actions'>
        <div className='links'>
          <Link to={url.replace('/edit/', '/view/')}>Link to View</Link>
          <Divider type='vertical' />
          <a href='' download='' onClick={onDownloadSVG}>
            Download SVG
          </a>
        </div>
      </Card>
    </div>
  )
}

export default Preview