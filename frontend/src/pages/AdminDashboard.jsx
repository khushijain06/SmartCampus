import DashboardCard from "../components/DashboardCard";

const AdminDashboard = () => {
  const name = localStorage.getItem("name")
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Welcome, {name!="undefined"?name:`Teacher`} !</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          to="/admin/students"
          title="All Students"
          description="View and manage all student details."
          ringColor="ring-purple-300"
          textColor="text-purple-600"
        />
        <DashboardCard
          to="/admin/attendance"
          title="Mark Attendance"
          description="Mark present/absent for students."
          ringColor="ring-purple-300"
          textColor="text-purple-600"
        />
        <DashboardCard
          to="/admin/results"
          title="Assign Marks"
          description="Assign subject-wise marks to students."
          ringColor="ring-purple-300"
          textColor="text-purple-600"
        />
        <DashboardCard
          to="/admin/homework"
          title="Manage Homework"
          description="Add/update homework status and PDFs."
          ringColor="ring-purple-300"
          textColor="text-purple-600"
        />
        <DashboardCard
          to="/admin/timetable"
          title="Edit Timetable"
          description="Manage class-wise schedule and teachers."
          ringColor="ring-purple-300"
          textColor="text-purple-600"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
