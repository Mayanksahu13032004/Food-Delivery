import { useEffect, useState } from "react";
import { useRouter,usePathname } from "next/navigation";

const FoodItemList = () => {
    const [fooditems, setFoodItems] = useState([]); 
    const router=useRouter();

    useEffect(() => {
        LoadFoodItem();
    }, []);

    const LoadFoodItem = async () => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        const resto_id = restaurantData?._id;  

        if (!resto_id) {
            alert("Restaurant ID not found.");
            return;
        }

        console.log("Restaurant data:", restaurantData);
        console.log("Resto ID:", resto_id);

        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`);
            response = await response.json();

            if (response.success) {
                console.log(response);
                setFoodItems(response.result);
            } else {
                alert("Food item list not loaded");
            }
        } catch (error) {
            console.error("Error fetching food items:", error);
            alert("Failed to load food items.");
        }
    };

    const deleteFoodItem = async (id) => {
        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            response = await response.json();
            console.log("Delete Response:", response);

            if (response.success) {
                setFoodItems(prevItems => prevItems.filter(item => item._id !== id)); // Update state directly
            } else {
                alert("Item not deleted");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item.");
        }
    };

    return (
        <div>
            <h1>Food items</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Sn</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {fooditems.length > 0 ? (
                        fooditems.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <img src={item.image} alt={item.name} width="50" />
                                </td>
                                <td>
                                    <button onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                    <button onClick={()=>router.push('dashboard/'+item._id)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No food items available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FoodItemList;
