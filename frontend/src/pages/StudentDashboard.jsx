import React from "react";
import DashboardCard from "../components/DashboardCard";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-8">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Welcome, Student!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          to="/student/personal-info"
          title="Personal Info"
          description="View or update your personal details."
        />
        <DashboardCard
          to="/student/attendance"
          title="Attendance"
          description="Check your daily attendance records."
        />
        <DashboardCard
          to="/student/results"
          title="Results"
          description="Subject-wise marks overview."
        />
        <DashboardCard
          to="/student/homework"
          title="Homework"
          description="Upload homework and check pending tasks."
        />
        <DashboardCard
          to="/student/subjects"
          title="Subjects"
          description="Get notes, syllabus progress, and PDFs."
        />
        <DashboardCard
          to="/student/timetable"
          title="Timetable"
          description="View your weekly class schedule."
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
