
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup(){



    return(
        <div className="bg-black h-screen flex w-full items-center justify-center text-white">
            <div className="rounded-lg px-6 w-[90%] border border-white flex flex-col align-center gap-10 px-8 py-12 md:w-[60%] lg:w-[35%]">
                <div className="w-full flex align-center justify-around font-bold text-3xl">Sign-Up</div>
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

                
            </div>
        </div>
    )
}

export default Signup