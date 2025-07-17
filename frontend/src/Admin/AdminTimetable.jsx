import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const AdminTimetable = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    class: "",
    section: "",
    week: daysOfWeek.map((day) => ({
      day,
      periods: [{ subject: "", teacher: "", time: "" }],
    })),
  });

  const token = localStorage.getItem("token");

  const handlePeriodChange = (dayIndex, periodIndex, field, value) => {
    const updatedWeek = [...form.week];
    updatedWeek[dayIndex].periods[periodIndex][field] = value;
    setForm({ ...form, week: updatedWeek });
  };

  const addPeriod = (dayIndex) => {
    const updatedWeek = [...form.week];
    updatedWeek[dayIndex].periods.push({ subject: "", teacher: "", time: "" });
    setForm({ ...form, week: updatedWeek });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.BACKEND_URI}/api/timetable/update`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate('/admindashboard')
      console.log(res.data);

    } catch (err) {
      console.error("Error updating timetable", err);
      alert("Error updating timetable");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-purple-100 to-pink-100">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">Update Timetable</h2>
      <div className="grid gap-4 max-w-3xl bg-white p-6 rounded shadow">
        <input
          className="border p-2 rounded"
          placeholder="Class"
          value={form.class}
          onChange={(e) => setForm({ ...form, class: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Section"
          value={form.section}
          onChange={(e) => setForm({ ...form, section: e.target.value })}
        />

        {form.week.map((dayObj, dayIndex) => (
          <div key={dayObj.day} className="border p-4 rounded">
            <h3 className="font-semibold mb-2">{dayObj.day}</h3>
            {dayObj.periods.map((period, periodIndex) => (
              <div key={periodIndex} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  className="border p-1 rounded"
                  placeholder="Subject"
                  value={period.subject}
                  onChange={(e) =>
                    handlePeriodChange(dayIndex, periodIndex, "subject", e.target.value)
                  }
                />
                <input
                  className="border p-1 rounded"
                  placeholder="Teacher"
                  value={period.teacher}
                  onChange={(e) =>
                    handlePeriodChange(dayIndex, periodIndex, "teacher", e.target.value)
                  }
                />
                <input
                  className="border p-1 rounded"
                  placeholder="Time"
                  value={period.time}
                  onChange={(e) =>
                    handlePeriodChange(dayIndex, periodIndex, "time", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              className="text-sm text-purple-600 hover:underline"
              onClick={() => addPeriod(dayIndex)}
            >
              + Add Period
            </button>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Save Timetable
        </button>
      </div>
    </div>
  );
};

export default AdminTimetable;
