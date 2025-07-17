import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const AdminHomework = () => {
  const navigate = useNavigate()
  const [student, setstudent] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    dueDate: "",
    pdfUrl: "",
    studentId: "",
  });

  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/student-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setstudent(res.data);
    } catch (err) {
      console.log("Error in fetching students", err);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.BACKEND_URI}/api/upload/pdf`,
        formData
      );
      setForm((prev) => ({ ...prev, pdfUrl: res.data.fileUrl }));
      alert("File uploaded successfully");
    } catch (err) {
      console.error("Upload error", err);
      alert("PDF upload failed");
    }
  };

  const handleSubmit = async () => {
    try {
      for (const stu of student) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/api/homework/assign`,
          {
            ...form,
            studentId: stu._id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res);
        navigate('/admindashboard')
        setForm({
          subject: "",
          description: "",
          dueDate: "",
          pdfUrl: "",
          studentId: "",
        });
      }
    } catch (err) {
      console.error("Assignment error", err);
      alert("Error assigning homework");
    }
  };

  return (
    <div className=" bg-gradient-to-r from-purple-100 to-pink-100 p-8 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">
        Assign Homework
      </h2>

      <div className="grid gap-4 max-w-xl bg-white shadow p-6 rounded-lg">
        <input
          type="text"
          placeholder="Subject"
          className="border p-2 rounded"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Due date"
          className="border p-2 rounded"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <div className="flex items-center gap-4">
          <label
            htmlFor="pdfUpload"
            className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded shadow-md"
          >
            Upload PDF
          </label>
          <input
            id="pdfUpload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
          />

          {form.pdfUrl && (
            <a
              href={form.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-purple-700 underline hover:text-purple-900"
            >
              View PDF
            </a>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Assign Homework
        </button>
      </div>
    </div>
  );
};

export default AdminHomework;
