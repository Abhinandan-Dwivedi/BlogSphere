import React from 'react'
import  Logo  from '../Logo.jsx'
import Logout from './Logout';
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      postid: "/",
      active: true
    }, 
    {
      name: "Login",
      postid: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      postid: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      postid: "/allposts",
      active: authStatus,
  },
  {
      name: "Add Post",
      postid: "/postform",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <div className='w-full max-w-7xl mx-auto px-4'> 
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.postid)}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
       </div>
    </header>
  )
}
export default Header
