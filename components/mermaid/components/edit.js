import React, { useEffect } from 'react'
import { Row, Col, Input, Affix, Card, Divider } from 'antd'
import { Route } from 'react-router-dom'
import { Base64 } from 'js-base64'

import Error from './error'
import Preview from './preview'
import { base64ToState } from './utils'


const Edit = (props) => {
  const {
    match: {
      params: { base64 }
    },
    location: { search }
  } = props
  const json = base64ToState(base64, search)

  useEffect(() => {
    mermaid.initialize(json.mermaid)
  })

  const onCodeChange =  (event) => {
    const {
      history,
      match: { path }
    } = props

    json.code = event.target.value
    const base64 = Base64.encodeURI(JSON.stringify(json))
    history.push(path.replace(':base64', base64))
  }

  const onKeyDown = (event) => {
    const keyCode = event.keyCode || event.which

    if (keyCode === 9) {
      event.preventDefault()
      const TAB_SIZE = 4
      document.execCommand('insertText', false, ' '.repeat(TAB_SIZE))
    }
  }

  const onMermaidConfigChange = (event) => {
    const str = event.target.value
    const {
      history,
      match: { path, url }
    } = props

    try {
      const config = JSON.parse(str)
      mermaid.initialize(config)
      json.mermaid = config
      const base64 = Base64.encodeURI(JSON.stringify(json))
      history.push(path.replace(':base64', base64))
    } catch (e) {
      const base64 = Base64.encodeURI(e.message)
      history.push(`${url}/error/${base64}`)
    }
  }

  const {
    match: { url }
  } = props
  
  return (
    <div>
      <h1>Mermaid Live Editor</h1>
      <Divider />
      <Row gutter={16}>
        <Col span={8}>
          <Affix>
            <Card title='Code'>
              <Input.TextArea
                autosize={{ minRows: 4, maxRows: 16 }}
                value={json.code}
                onChange={onCodeChange}
                onKeyDown={onKeyDown}
              />
            </Card>
          </Affix>
          <Card title='Mermaid configuration'>
            <Input.TextArea
              autosize={{ minRows: 4, maxRows: 16 }}
              defaultValue={JSON.stringify(json.mermaid, null, 2)}
              onChange={onMermaidConfigChange}
              onKeyDown={onKeyDown}
            />
          </Card>
        </Col>
        <Col span={16}>
          <Route
            exact
            path={url}
            render={props => <Preview {...props} code={json.code} />}
          />
          <Route path={url + '/error/:base64'} component={Error} />
        </Col>
      </Row>
    </div>
  )
}

export default Edit