import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import HomeWrapper from './components/HomeWrapper/HomeWrapper.jsx'
import Authentication from './components/Authentication/Authentication.jsx'
import GroupWrapper from './components/GroupWrapper/GroupWrapper.jsx'
import Payment from './components/Payment/Payment.jsx'
import PaymentWrapper from './components/PaymentWrapper.jsx/PaymentWrapper.jsx'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([{
  path:'/',
  element:<Layout/>,
  children:[{
   
    path:"",
    element: <Authentication/>
  },{
   
    path:"/home",
    element: <HomeWrapper/>
  },{
    path:"/group",
    element: <GroupWrapper/>
  },{
    path:"/payment",
    element: <PaymentWrapper/>
  }]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-left" />
  </StrictMode>,
)
