import {useState} from 'react'

function InforBar ({content}){
    const [show, setshow] = useState(true);
    if(!show) return null
return(
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-6 py-3 rounded-md shadow-md flex justify-between items-center max-w-3xl mx-auto mt-4 mb-8">
        {content}
        <button className="ml-4 text-yellow-700 hover:text-red-500 font-bold text-lg" onClick={()=>
            setshow(false)}>
            ×
        </button>
    </div>
        

)
}
export default InforBar