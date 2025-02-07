'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignUp = async () => {
        // Clear previous error
        setError("");

        // Validate inputs
        if (!name || !email || !password || !confirmPassword || !city || !address || !contact) {
            setError("Please fill out all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (loading) return; // Prevent multiple submissions

        setLoading(true); // Start loading state

        try {
            let response = await fetch("http://localhost:3000/api/restaurant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name, city, address, contact }),
            });

            response = await response.json();

            if (response.success) {
                alert("Restaurant data was saved.");
                const { result } = response;
                delete result.password;
                localStorage.setItem("restaurantUser", JSON.stringify(result));
                router.push("/restaurant/dashboard");
            } else {
                setError(response.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setError("An error occurred during signup. Please try again.");
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Sign Up for Your Restaurant</h1>
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter Restaurant Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter Full Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter Contact No."
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSignUp}
                        disabled={loading}
                        className={`w-full text-white py-2 px-4 rounded-md transition ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantSignup;
