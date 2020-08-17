import React from 'react'

import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
const history = createMemoryHistory()

const TestingRouter = ({ ComponentWithRedirection, RedirectUrl }) => (
  <Router history={history}>
    <Route path="/" exact={true} render={() => <ComponentWithRedirection />} />
    <Route path={RedirectUrl} render={() => <div>{RedirectUrl}</div>} />
  </Router>
)

export default TestingRouter;