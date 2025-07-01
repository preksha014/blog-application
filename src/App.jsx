import { useEffect,useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { logout, login } from './store/authSlice'
import {Header,Footer} from './components/'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        }
        else {
          dispatch(logout())
        }
      })
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error)
        dispatch(logout())
        setLoading(false)
      })
  }, [])

  


  return !loading ? (
    <div className='min-h-screen flex-wrap bg-gray-100 flex items-center justify-center'>
        <div className='w-full max-w-4xl mx-auto p-4'>
          <Header />
          <main className='mt-4'>
            <Outlet />
          </main>
          <Footer />
          </div>
    </div>): null
  
}

export default App
