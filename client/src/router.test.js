import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import TestingRouter from './setupTestRouter'
import App from './App'

afterEach(cleanup)

describe('Check that redirection works', () => {
  
  it('has to redirect', () => {

    const redirectUrl = '/'
    const currentUser = { status: true }

    const { container } = render(
      <TestingRouter
        ComponentWithRedirection={() => <App currentUser={currentUser} />}
        RedirectUrl={redirectUrl}
      />
    )

    expect(window.location.pathname).toEqual(
      expect.stringContaining(redirectUrl)
    )
  })

  
})