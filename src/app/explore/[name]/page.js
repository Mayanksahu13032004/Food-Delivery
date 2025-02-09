"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState, use } from "react";

const Page = (props) => {
  // ✅ Unwrap params and searchParams using `use()`
  const params = use(props.params);
  const searchParams = use(props.searchParams);

  const Name = params?.name || "";
  const id = searchParams?.id || "";

  const [restaurantdetail, setRestaurantDetail] = useState(null);
  const [fooditems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartIds, setCartIds] = useState(
    cartStorage ? cartStorage.map((item) => item._id) : []
  );
  const [removeCartData, setRemoveCartData] = useState(null);

  useEffect(() => {
    if (id) {
      LoadRestaurantDetails();
    }
  }, [id]);

  console.log("Cart storage IDs:", cartIds);

  const LoadRestaurantDetails = async () => {
    console.log("Fetching restaurant details for ID:", id);

    try {
      let response = await fetch(`http://localhost:3000/api/customer/${id}`);
      response = await response.json();
      console.log("Food items:", response.foodItems);

      if (response.success) {
        setRestaurantDetail(response.details);
        setFoodItems(response.foodItems);
      }
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      setFoodItems([]);
    }
  };

  const addToCart = (item) => {
    setCartData(item);
    console.log("Item added to cart:", item);

    let updatedCartIds = [...cartIds, item._id];
    setCartIds(updatedCartIds);

    setRemoveCartData(null);
  };

  const removeFromCart = (id) => {
    setRemoveCartData(id);
    let updatedCartIds = cartIds.filter((item) => item !== id);
    setCartIds(updatedCartIds);
    setCartData(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomerHeader cartdata={cartData} removeCartData={removeCartData} />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Food Delivery App: {decodeURIComponent(Name)}
        </h1>

        {/* Restaurant Details */}
        {restaurantdetail ? (
          <div className="bg-white shadow-md p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold">📞 {restaurantdetail.contact}</h3>
            <h3 className="text-lg">📍 {restaurantdetail.city}</h3>
            <h3 className="text-lg">🏠 {restaurantdetail.address}</h3>
            <h3 className="text-lg">✉️ {restaurantdetail.email}</h3>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading restaurant details...</p>
        )}

        {/* Food Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {fooditems?.length > 0 ? (
            fooditems.map((item, index) => (
              <div key={index} className="bg-white shadow-lg p-4 rounded-lg border">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-700 mt-2">{item.description}</p>

                {/* Price Section */}
                <div className="mt-2 text-lg font-bold text-green-600">₹{item.price}</div>

                {/* Add / Remove from Cart Buttons */}
                {cartIds.includes(item._id) ? (
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg col-span-full">
              No food items available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
