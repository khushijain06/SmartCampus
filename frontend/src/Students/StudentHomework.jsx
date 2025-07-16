import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentHomework() {
  const [homework, sethomework] = useState([]);
  const [loading, setloading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchHomework = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/homework/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      sethomework(res.data);
    } catch (err) {
      console.error("Error fetching student homework", err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchHomework();
  }, []);

  const handleStatusChange = async (homeworkId, status) => {
    if (status === "completed") {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/homework/${homeworkId}/complete`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Homework marked completed:", res.data);

        // Update UI optimistically
        sethomework((prev) =>
          prev.map((hw) =>
            hw._id === homeworkId ? { ...hw, status: "completed" } : hw
          )
        );
      } catch (err) {
        console.error("Error marking homework complete", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Your Homework</h1>

      {loading ? (
        <p className="text-indigo-600 font-medium">Loading...</p>
      ) : homework.length === 0 ? (
        <p className="text-red-500">No Homework Found...</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Files</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {homework.map((hw, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{hw.subject}</td>
                  <td className="px-4 py-2">{hw.description}</td>
                  <td className="px-4 py-2">
                    {new Date(hw.dueDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-2">
                    {hw.pdfUrl ? (
                      <a
                        href={hw.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 underline hover:text-indigo-800"
                      >
                        View PDF
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <select
                      className="border px-2 py-1 rounded"
                      onChange={(e) =>
                        handleStatusChange(hw._id, e.target.value)
                      }
                      value={hw.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentHomework;
