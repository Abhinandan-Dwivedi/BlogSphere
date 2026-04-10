import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'

import Authstatus from './components/Authstatus.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Editpost from './Pages/Editpost.jsx'
import PostDetail from './Pages/PostDetail.jsx'
import Postform from './components/Postform.jsx'
import Allposts from './Pages/Allposts.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <Authstatus authentication={false}>
            <Login />
          </Authstatus>
        )
      },
      {
        path: "/signup",
        element: (
          <Authstatus authentication={false}>
            <SignUp />
          </Authstatus>
        )
      },
      {
        path: "/allposts",
        element: (
          <Authstatus authentication={true}>
            <Allposts />
          </Authstatus>
        )
      },
      {
        path: "/postform",
        element: (
          <Authstatus authentication={true}>
            <Postform />
          </Authstatus>
        )
      },
      {
        path: "/edit-post/:postid",
        element: (
          <Authstatus authentication={true}>
            <Editpost />
          </Authstatus>
        )
      },
      {
        path: "/post/:postid",
        element: <PostDetail />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)