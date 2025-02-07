'use client';
import { useState } from "react";
import RestuarnrtLogin from "../_components/restaurantLogin";
import RestuarnrtSignup from "../_components/restaurantSignup";
import RestaurantHeader from "../_components/restaurantHeadre";
import ResturantFooter from "../_components/restaurantFooter";
const Resturant = () => {
    const [login, setlogin] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center  bg-gray-100">
            <RestaurantHeader/>
            <h1 className="text-4xl font-extrabold text-pink-800 mb-10">Restaurant Portal</h1>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                {login ? <RestuarnrtLogin /> : <RestuarnrtSignup />}
                <button
                    onClick={() => setlogin(!login)}
                    className="mt-6 w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition"
                >
                    {login
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Log In"}
                </button>
            </div>
            <ResturantFooter/>
        </div>
    );
};

export default Resturant;
