import { useRouter } from "next/navigation";
import { useState } from "react";
// import "@/styles/globals.css"; // ✅ Ensure Tailwind CSS is imported in your global styles

const UserLogin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
const router =useRouter();

const LoginHandle=async()=>{
    let response=await fetch("http://localhost:3000/api/user/login",{
        method:"POST",
        body:JSON.stringify({email,password})
    })
    response=await response.json();
    if(response.success){
        alert("USer login successfully");
        const {result}=response;
        delete result.password;
        localStorage.setItem("user",JSON.stringify(result));
        if(props.redirect?.order){
            router.push('/order');    
        }else{
        router.push('/');
        }
    }
    else{
        alert("User failed to login")
    }
    
}

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="text-center">
                        <button onClick={LoginHandle} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
