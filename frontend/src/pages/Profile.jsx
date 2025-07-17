import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    class: "",
    section: "",
    gender: "",
    dob: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    contact: "",
    email: "",
    address: {
      current: "",
      permanent: ""
    }
  });

  const [isNew, setIsNew] = useState(false); // true if student has no profile yet

  // Fetch student profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data && res.data.name) {
          setFormData(res.data);  // ✅ Load data into form
        } else {
          setIsNew(true);         // ❌ No profile data
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setIsNew(true);           // ❌ Assume profile not found
      }
    };

    fetchData();
  }, []); // Only run on initial mount

  // Handle input changes (flat & nested fields)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:5000/api/student/";
      const headers = { Authorization: `Bearer ${token}` };

      if (isNew) {
        await axios.post(url, formData, { headers });
        alert("Profile created successfully!");
      } else {
        await axios.put(url, formData, { headers });
        alert("Profile updated successfully!");
      }
      setIsNew(false); // switch to update mode
      navigate('/studentdashboard')
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">
          {isNew ? "Complete Your Profile" : "Update Profile"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["name", "Name"],
            ["rollNumber", "Roll Number"],
            ["class", "Class"],
            ["section", "Section"],
            ["gender", "Gender"],
            ["dob", "Date of Birth"],
            ["fatherName", "Father's Name"],
            ["motherName", "Mother's Name"],
            ["guardianName", "Guardian's Name"],
            ["contact", "Contact Number"],
            ["email", "Email"]
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block font-semibold">{label}</label>
              <input
                type={key === "dob" ? "date" : "text"}
                name={key}
              //  disabled={!isNew}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}

          {/* Address Fields */}
          <div>
            <label className="block font-semibold">Current Address</label>
            <input
              type="text"
              name="address.current"
              value={formData.address?.current || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Permanent Address</label>
            <input
              type="text"
              name="address.permanent"
              value={formData.address?.permanent || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          >
            {isNew ? "Save Profile" : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
