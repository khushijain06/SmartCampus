import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminPostResult = () => {
  const navigate = useNavigate()
  const [students, setStudents] = useState([]);
  const [resultData, setResultData] = useState({});
  const [subject, setSubject] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/student-list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const handleChange = (studentId, field, value) => {
    setResultData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      for (const studentId in resultData) {
        const { marks, maxMarks, grade } = resultData[studentId];
        if (!marks || !maxMarks || !grade || !subject) continue;

      const res =   await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/api/results`,
          {
            studentId,
            subject,
            marks,
            maxMarks,
            grade,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("op",res)
      }
      navigate('/admindashboard')
    } catch (err) {
      console.error("Error submitting results:", err);
      alert("Failed to submit some results");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Post Student Results</h2>

      <input
        type="text"
        placeholder="Enter Subject"
        className="mb-4 p-2 border rounded"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-purple-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Roll No.</th>
            <th className="py-2 px-4 border-b">Marks</th>
            <th className="py-2 px-4 border-b">Max Marks</th>
            <th className="py-2 px-4 border-b">Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{stu.name}</td>
              <td className="py-2 px-4 border-b">{stu.rollNumber}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  onChange={(e) =>
                    handleChange(stu._id, "marks", e.target.value)
                  }
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  onChange={(e) =>
                    handleChange(stu._id, "maxMarks", e.target.value)
                  }
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full"
                  onChange={(e) =>
                    handleChange(stu._id, "grade", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Submit Results
      </button>
    </div>
  );
};

export default AdminPostResult;
