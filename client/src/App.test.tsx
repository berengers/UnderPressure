import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = document.getElementsByClassName('App')
  expect(linkElement[0]).toBeInTheDocument()
})
