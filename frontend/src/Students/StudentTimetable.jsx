import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentTimetable = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchTimetable = async () => {
    try {
      const res = await axios.get(`${import.meta.env.BACKEND_URI}/api/timetable`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimetable(res.data);
    } catch (err) {
      console.error("Error fetching timetable", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Your Timetable</h2>

      {loading ? (
        <p className="text-indigo-600">Loading...</p>
      ) : !timetable ? (
        <p className="text-red-500">No timetable available for your class/section.</p>
      ) : (
        <div className="bg-white p-6 rounded shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-indigo-200">
                <th className="px-4 py-2 text-left">Day</th>
                <th className="px-4 py-2 text-left">Periods</th>
              </tr>
            </thead>
            <tbody>
              {timetable.week.map((dayObj, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 font-medium">{dayObj.day}</td>
                  <td className="px-4 py-2">
                    <ul className="space-y-1">
                      {dayObj.periods.map((period, pIndex) => (
                        <li key={pIndex}>
                          <span className="font-semibold">{period.time}</span>:{" "}
                          {period.subject} ({period.teacher})
                        </li>
                      ))}
                    </ul>
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

export default StudentTimetable;
