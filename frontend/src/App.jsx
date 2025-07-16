import {Routes,Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './Admin/AdminDashboard'
import StudentDashboard from './Students/StudentDashboard'
import Profile from './pages/Profile'
import StudentList from './Students/StudentList'
import AdminAttendance from './Admin/AdminAttendance'
import StudentAttendance from './Students/StudentAttendance'
import AdminPostResult from './Admin/AdminResult'
import StudentResult from './Students/StudentResult'
import AdminHomework from './Admin/AdminHomework'
import StudentHomework from './Students/StudentHomework'
import AdminTimetable from './Admin/AdminTimetable'
import StudentTimetable from './Students/StudentTimetable'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/admindashboard' element={<AdminDashboard/>}/>
      <Route path='/studentdashboard' element={<StudentDashboard/>}/>
      <Route path='/student/profile' element={<Profile/>}/>
      <Route path='/admin/students' element={<StudentList/>}/>
      <Route path='/admin/attendance' element={<AdminAttendance/>}/>
       <Route path='/student/attendance' element={<StudentAttendance/>}/>
       <Route path='/admin/results' element={<AdminPostResult/>}/>
       <Route path="/student/results" element={<StudentResult/>}/>
       <Route path="admin/homework" element={<AdminHomework/>}/>
       <Route path='/student/homework' element={<StudentHomework/>}/>
       <Route path='/admin/timetable' element={<AdminTimetable/>}/>
       <Route path='/student/timetable' element={<StudentTimetable/>}/>
    </Routes>
  )
}
export default App
