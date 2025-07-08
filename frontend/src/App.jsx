import {Routes,Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/admindashboard' element={<AdminDashboard/>}/>
      <Route path='/studentdashboard' element={<StudentDashboard/>}/>
    </Routes>
  )
}
export default App
