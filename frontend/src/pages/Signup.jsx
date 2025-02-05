
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup(){

   
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    async function sendReq(){
        setLoading(true);
        setError(null);

        try{
            const response=await axios.post<res>('http://localhost:3000/api/user/login',user);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.username);
            navigate('/home');

        }catch(e){
            setError("Error Signing Up");
        }finally{
            setLoading(false);
        }
    }

    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const navigate=useNavigate();

    return(
        <div className="bg-black h-screen flex w-full items-center justify-center text-white">
            <div className="rounded-lg px-6 w-[90%] border border-gray-500 flex flex-col align-center gap-10 px-8 py-12 md:w-[60%] lg:w-[35%]">
                <div className="w-full flex align-center justify-around font-bold text-3xl">Sign-up</div>
                <div className="w-full flex flex-col gap-3">
                    <div>E-Mail</div>
                    <input className="px-3 text-white bg-transparent border border-slate-500 rounded-md h-12" type="text" name="email" onChange={handleChange}/>   
                </div>
                
                <div className="w-full flex flex-col gap-3">
                    <div>Username</div>
                    <input className="text-white bg-transparent border border-slate-500 rounded-md h-12 px-3" type="text" name="username" onChange={handleChange} />                    
                </div>
    
                <div className="w-full flex flex-col gap-3">
                    <div>Password</div>
                    <input className="px-3 text-white bg-transparent border border-slate-500 rounded-md h-12" type="password" name="password" onChange={handleChange}/>                    
                </div>                
                {loading?(<button className="bg-blue-600 h-12 rounded-md" onClick={sendReq}>Loading</button>):(<button className="bg-blue-600 h-12 rounded-md" onClick={sendReq}>Sign-up</button> )}
                <div class="flex items-center justify-center">
                    <button type="button" class="width-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                    <svg class="w-8 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                    </svg>
                    Sign in with Google
                    </button>
                </div>
                {error?<div className="w-full flex align-center justify-center text-red-500">{error}</div>:<div></div>}
            </div>
        </div>
    )
}

export default Signup