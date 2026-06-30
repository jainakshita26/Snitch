import './App.css'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes.jsx'
import { useSelector } from 'react-redux'

function App() {
  const user=useSelector(state=>state.auth.user)
  console.log(user)

  return (
    <>
    <RouterProvider router={routes}/> 
    </>
  )
}

export default App
