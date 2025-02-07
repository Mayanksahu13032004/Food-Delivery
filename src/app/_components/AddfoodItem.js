import { useState } from "react";
import { useRouter,usePathname } from "next/navigation";
const AddFoodItem = (props) => {
    // const router=useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
   const [error,seterror]=useState();
   const handleAddFoodItem = async () => {
    seterror(false);
    
    if (!name || !path || !price || !description) {
        seterror(true);
        return;
    }

    // Get restaurant ID from localStorage
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (!restaurantData || !restaurantData._id) {
        alert("Restaurant ID not found. Please log in again.");
        return;
    }

    const resto_id = restaurantData._id; // Assign restaurant ID
    console.log("resto_id:", resto_id);

    // Send API request
    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, path, description, resto_id }) // Include resto_id
    });

    response = await response.json();
    if (response.success) {
        alert("Food item added successfully!");
        // router.push("http://localhost:3000/restaurant/dashboard");
        props.setAddItem(false);
    } else {
        alert("Failed to add food item.");
    }
};


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add New Food Item</h1>

                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Enter food name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                        error && !name && <span>Please enter valid name</span>
                    }

                    <input 
                        type="text" 
                        placeholder="Enter food price"
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                        error && !price && <span>Please enter valid price</span>
                    }

                    <input 
                        type="text" 
                        placeholder="Enter image path"
                        value={path} 
                        onChange={(e) => setPath(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                        error && !path && <span>Please enter valid path</span>
                    }

                    <textarea 
                        placeholder="Enter food description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    ></textarea>
                    {
                        error && !description && <span>Please enter valid description</span>
                    }

                    <button 
                        onClick={handleAddFoodItem}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Add Food Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFoodItem;
