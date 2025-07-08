import { Link } from "react-router-dom";

const DashboardCard = ({ to, title, description, ringColor = "ring-indigo-300", textColor = "text-indigo-600" }) => {
  return (
    <Link
      to={to}
      className={`bg-white shadow-md p-6 rounded-lg hover:ring-2 ${ringColor}`}
    >
      <h2 className={`text-xl font-semibold ${textColor} mb-2`}>{title}</h2>
      <p>{description}</p>
    </Link>
  );
};

export default DashboardCard;
