import {Routes,Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/admindashboard' element={<AdminDashboard/>}/>
      <Route path='/studentdashboard' element={<StudentDashboard/>}/>
      <Route path='/student/profile' element={<Profile/>}/>
    </Routes>
  )
}
export default App
