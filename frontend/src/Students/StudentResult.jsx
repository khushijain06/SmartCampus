import { useEffect, useState } from "react"
import axios from 'axios'
const StudentResult = () =>{
    const [result,setresult] = useState([]);
    const [loading,setLoading]=useState(true)
    const fetchResult = async()=>{
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/results/me`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(res)
            setresult(res.data)
        }
        catch(err){
            console.log("Error fetching results: ",err)
        }
        finally{
            setLoading(false)
        }
    };
    useEffect(()=>{
        fetchResult();
    },[])
 return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Your Result </h1>

      {loading ? (
        <p className="text-indigo-600 font-medium">Loading...</p>
      ) : result.length === 0 ? (
        <p className="text-red-500">No Result Updates found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Marks</th>
                <th className="px-4 py-2 text-left">Max Marks</th>
                <th className="px-4 py-2 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {result.map((record, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    {record.subject}
                  </td>
                  <td className={'px-4 py-2 font-semibold'}>
                    {record.marks}
                  </td>
                   <td className={'px-4 py-2 font-semibold'}>
                    {record.maxMarks}
                  </td>
                   <td className={'px-4 py-2 font-semibold'}>
                    {record.grade}
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
export default StudentResult;
