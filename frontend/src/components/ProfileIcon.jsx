import { UserRound } from "lucide-react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
function ProfileIcon() {
    const navigate = useNavigate()
  return (
         <Link to="/student/profile">
    <div className="bg-white p-2 rounded-full shadow ring-2 ring-indigo-300 hover:bg-indigo-100">
      <UserRound className="text-indigo-600 w-6 h-6" onClick={()=>navigate('/profile')} />
    </div>
</Link>
  )
}

export default ProfileIcon
