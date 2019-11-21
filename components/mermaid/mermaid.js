import React, { useEffect } from 'react'
import Head from 'next/head'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Base64 } from 'js-base64'

import Edit from './components/edit'
import View from './components/view'
import { defaultState } from './components/utils'

const Mermaid = () => {
  return (
    <div id="map">
      <Head>
        <title>Mermaid Basic</title>
        
      </Head>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to={`/edit/${Base64.encodeURI(JSON.stringify(defaultState))}`} />} />
          <Route path='/edit/:base64' component={Edit} />
          <Route path='/view/:base64' component={View} />
        </Switch>
      </Router>
    </div>
  )
}

export default Mermaid
