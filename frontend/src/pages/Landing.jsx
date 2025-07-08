import { Link } from 'react-router-dom'
import campus from '../assets/campus.jpg'
export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 flex flex-col items-center justify-center text-center px-6">
      <img 
        src={campus}
        alt="Smart Campus"
        className="w-[400px] md:w-[300px] mb-6 rounded-lg shadow-md"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
        Welcome to <span className="text-blue-600">Smart Campus</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
        Manage students, attendance, results, homework, and timetables all in one platform.
        Built for smart and efficient school administration.
      </p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-white hover:bg-gray-200 text-indigo-700 font-semibold px-6 py-2 rounded-lg border border-indigo-600 shadow">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )
}
