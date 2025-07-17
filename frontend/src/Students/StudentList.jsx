import axios from 'axios'
import {useEffect,useState} from 'react';
function StudentList() {
    const token = localStorage.getItem('token')
    const [students, setstudents] = useState([]);
    useEffect(()=>{
        const fetchStudents = async()=> {
         try{
      const  res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/student-list`,{
       headers:{Authorization:`Bearer ${token}`} })
       console.log(res.data)
       setstudents(res.data)
        }
        catch(err){
            console.log(err);
            alert('No students found!')
        }
    }; fetchStudents();
},[]
);
   
  return( 
 <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">All Students</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-purple-200">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Roll No.</th>
              <th className="py-2 px-4 border-b">Class</th>
              <th className="py-2 px-4 border-b">Section</th>
              <th className="py-2 px-4 border-b">Gender</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-100">
                <td className="py-2 px-4  border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.rollNumber}</td>
                <td className="py-2 px-4 border-b">{student.class}</td>
                <td className="py-2 px-4 border-b">{student.section}</td>
                <td className="py-2 px-4 border-b">{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StudentList;
