'use client';

import { useRouter } from 'next/navigation';
import {useState} from'react'



const RestaurantLogin = () => {
    const router=useRouter();

    const [email, setEmail] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        console.log(email, passwordLogin);

        // Validate form fields
        if (!email || !passwordLogin) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        // Make API call
        try {
            let response = await fetch("http://localhost:3000/api/restaurant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password: passwordLogin, login: true })
            });
            response = await response.json();

            if (response.success) {
                const {result}=response;
                delete result.password;
                localStorage.setItem("restaurantUser",JSON.stringify(result))
                router.push("/restaurant/dashboard");
                alert("Login successful");
            } else {
                alert("Invalid email or password");
            }
        } catch (err) {
            console.error("Error logging in:", err);
            alert("An error occurred while logging in. Please try again later.");
        }
    };

    return (
        <div className="flex  flex-col items-center justify-center bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Login to Your Account</h1>
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                <div className="space-y-6">
                    {/* Email Input */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email ID"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && !email && <span className="text-red-500 text-sm">Please enter a valid email</span>}

                    {/* Password Input */}
                    <input
                        type="password"
                        value={passwordLogin}
                        onChange={(e) => setPasswordLogin(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && !passwordLogin && <span className="text-red-500 text-sm">Please enter a valid password</span>}

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantLogin;
