import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Header = () => (
  <div>
    <h1>INCITY</h1>
    <IndexLink to='/'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter'>
      Counter
    </Link>
  </div>
)

export default Header
