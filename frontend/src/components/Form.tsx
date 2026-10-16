import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface props{
    route: string;
    method: string;
}

function Form({route,method}: props){
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [mail,setMail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "SignUp";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try{
            const request = await api.post(route, {
                first_name: firstname,
                last_name: lastname,
                email: mail,
                username,
                password,
            });
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN,request.data.access)
                localStorage.setItem(REFRESH_TOKEN,request.data.refresh)
                navigate("/")
            } else{
                navigate("/login")
            }
        } catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    if(method === "signup"){
        return (
            <div className="flex min-h-screen items-center justify-center px-4 py-8">
                <form onSubmit={handleSubmit}  autoComplete="off" className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">{name}</h1>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Firstname" disabled={loading} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-100"/>
                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Lastname" disabled={loading} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-100"/>
                    </div>
                    <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Email" disabled={loading} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-100"/>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" disabled={loading} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-100"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" disabled={loading} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-100"/>
                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Please wait…" : name}</button>
                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        );
    }else if (method === "login"){
        return(
            <div className="flex min-h-screen items-center justify-center px-4 py-8">
                <form onSubmit={handleSubmit}  autoComplete="off" className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">{name}</h1>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" disabled={loading} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-100"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" disabled={loading} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-100"/>
                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Please wait…" : name}</button>
                    <p className="text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline">Sign up</Link>
                    </p>
                </form>
            </div>
        )
    }else {
        return(
            <>
                <h1 className="p-8 text-center text-xl font-semibold text-red-600">Method Not Found</h1>
            </>
        )
    }
}

export default Form