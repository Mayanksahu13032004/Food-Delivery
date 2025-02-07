"use client";

import AddFoodItem from "@/app/_components/AddfoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantHeader from "@/app/_components/restaurantHeadre";
import { useState } from "react";

const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <RestaurantHeader />

            <div className="flex justify-center gap-4 my-6">
                <button 
                    onClick={() => setAddItem(true)} 
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Add Food
                </button>
                <button 
                    onClick={() => setAddItem(false)} 
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                >
                    Dashboard
                </button>
            </div>

            <div className="flex justify-center">
                {
                addItem ? <AddFoodItem  setAddItem={setAddItem}/> : <FoodItemList/>
                }
            </div>
        </div>
    );
};

export default Dashboard;
