import { useEffect, useState } from "react";
import axios from "axios";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/attendance/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data)
      setAttendance(res.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Your Attendance Record</h1>

      {loading ? (
        <p className="text-indigo-600 font-medium">Loading...</p>
      ) : attendance.length === 0 ? (
        <p className="text-red-500">No attendance records found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    {new Date(record.date).toLocaleDateString("en-IN")}
                  </td>
                  <td className={`px-4 py-2 font-semibold ${
                    record.status === "present" ? "text-green-600" : "text-red-600"
                  }`}>
                    {record.status.toUpperCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
