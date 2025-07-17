import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminAttendance = () => {
  const navigate = useNavigate()
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [date, setDate] = useState("");

  // Fetch students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/student-list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        alert(err,"Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  // Handle status change
  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    if (!date) return alert("Please select a date");

    const token = localStorage.getItem("token");
    try {
      for (const studentId in attendanceData) {
        await axios.post(
          "http://localhost:5000/api/attendance/mark",
          {
            studentId,
            date,
            status: attendanceData[studentId],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      navigate('/admindashboard')
    } catch (err) {
      console.error(err);
      alert("Error marking attendance");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen flex justify-center items-center">
  <div className="w-full max-w-4xl flex flex-col items-center">
    <h2 className="text-3xl font-bold text-purple-700 mb-4">
      Mark Attendance
    </h2>

    <input
      type="date"
      className="bg-white mb-6 px-4 py-2 border rounded-md"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

    <div className="overflow-x-auto w-full mb-4">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-purple-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Roll No.</th>
            <th className="py-2 px-4 border-b">Class</th>
            <th className="py-2 px-4 border-b">Mark</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{stu.name}</td>
              <td className="py-2 px-4 border-b">{stu.rollNumber}</td>
              <td className="py-2 px-4 border-b">
                {stu.class} - {stu.section}
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  className="border px-2 py-1 rounded"
                  onChange={(e) => handleStatusChange(stu._id, e.target.value)}
                  value={attendanceData[stu._id] || ""}
                >
                  <option value="">-- Select --</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <button
      onClick={handleSubmit}
      className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-indigo-700 shadow"
    >
      Submit Attendance
    </button>
  </div>
</div>
  )}
export default AdminAttendance