import React from 'react'
import { Link } from 'react-router'
export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <Link to='/create'>上传</Link>
  </div>
)

export default HomeView
