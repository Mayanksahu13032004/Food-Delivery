'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditFoodItem = ({ params }) => {
    console.log("Params in edit",params);
    
    const router = useRouter();
    const { id } = params; // Get ID from params

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            handleLoadFoodItem();
        }
    }, [id]); // ✅ Run only when `id` changes

    const handleLoadFoodItem = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`);
            const data = await response.json();
            
            if (data.success) {
                console.log("Response:", data.result);
                setName(data.result.name);
                setPrice(data.result.price);
                setPath(data.result.path);
                setDescription(data.result.description);
            } else {
                console.error("Error fetching food item:", data.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error in handleLoadFoodItem:", error);
        }
    };

    const handleEditFoodItem = async () => {
        if (!name || !price || !path || !description) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, price, path, description }),
            });
            
            const text = await response.text(); // Read response as text first
            try {
                const data = JSON.parse(text); // Try parsing JSON
                if (data.success) {
                    // alert("Data updated successfully!");
                    router.push("../dashboard");
                } else {
                    alert("Failed to update food item.");
                }
            } catch (error) {
                console.error("Error parsing JSON response:", text); // Debug output
            }
            

            const data = await response.json();
            if (data.success) {
                // alert("Data updated successfully!");
                router.push("../dashboard"); // ✅ Redirect after success
            } else {
                alert("Failed to update food item.");
            }
        } catch (error) {
            console.error("Error in handleEditFoodItem:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Food Item</h1>

                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Enter food name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && !name && <span className="text-red-500">Please enter a valid name</span>}

                    <input 
                        type="text" 
                        placeholder="Enter food price"
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && !price && <span className="text-red-500">Please enter a valid price</span>}

                    <input 
                        type="text" 
                        placeholder="Enter image path"
                        value={path} 
                        onChange={(e) => setPath(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && !path && <span className="text-red-500">Please enter a valid path</span>}

                    <textarea 
                        placeholder="Enter food description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    ></textarea>
                    {error && !description && <span className="text-red-500">Please enter a valid description</span>}

                    <button 
                        onClick={handleEditFoodItem}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Update Food Item
                    </button>

                    <button 
                        onClick={() => router.push("../dashboard")}
                        className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFoodItem;
