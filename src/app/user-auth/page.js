"use client";

import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import UserSignup from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";

const UserAuth = (props) => {
    const [login, setLogin] = useState(true);
    console.log("order flage",props.searchParams);
    

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <CustomerHeader />

            {/* Centered Auth Card */}
            <div className="flex flex-grow justify-center items-center">
                <div className="w-[400px] h-auto bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-semibold text-center mb-6">
                        {login ? "User Login" : "User Signup"}
                    </h1>

                    {login ? <UserLogin redirect={props.searchParams} /> : <UserSignup redirect={props.searchParams}/>}

                    {/* Toggle Button */}
                    <button
                        onClick={() => setLogin(!login)}
                        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {login ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserAuth;
