"use client";

import Image from "next/image";
import CustomerHeader from "./_components/CustomerHeader";
import ResturantFooter from "./_components/restaurantFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [location, setLocation] = useState([]); // Store location list
  const [selectedLocation, setSelectedLocation] = useState(""); // Selected location
  const [showLocation, setShowLocation] = useState(false); // Show/hide dropdown
  const [restaurants, setRestaurants] = useState([]); // Store restaurant data

  const router = useRouter();

  useEffect(() => {
    loadLocation();
    loadRestaurants();
  }, []);

  const loadLocation = async () => {
    try {
      let response = await fetch("/api/customer/locations");
      response = await response.json();

      if (response.success) {
        setLocation(response.result);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const loadRestaurants = async (params = {}) => {
    let url = "http://localhost:3000/api/customer";

    if (params.location) {
      url += `?location=${params.location}`;
    } else if (params.restaurant) {
      url += `?restaurant=${params.restaurant}`;
    }

    console.log("Fetching restaurants from:", url);

    try {
      let response = await fetch(url);
      response = await response.json();

      if (response.success) {
        setRestaurants(response.result);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <CustomerHeader />

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800">Restaurant App</h1>

        {/* Input & Location Dropdown */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          {/* Location Input */}
          <div className="relative w-full">
            <input
              type="text"
              onClick={() => setShowLocation(true)}
              placeholder="Select location"
              value={selectedLocation}
              readOnly
              className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {/* Location Dropdown */}
            {showLocation && location.length > 0 && (
              <ul className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                {location.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleListItem(item)}
                    className="p-3 hover:bg-blue-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
            placeholder="Search Food or Restaurant"
            className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Restaurant List */}
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Restaurants</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.length > 0 ? (
            restaurants.map((item, index) => (
              <div
                key={index}
                onClick={() => router.push(`explore/${item.name}?id=${item._id}`)}
                className="border border-gray-300 rounded-lg p-5 shadow-md bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm font-semibold text-gray-600">📞 {item.contact}</p>
                <p className="text-sm font-semibold text-gray-600">📍 City: {item.city}</p>
                <p className="text-sm font-semibold text-gray-600">🍽 Cuisine: {item.email}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">No restaurants found.</p>
          )}
        </div>
      </div>

      <ResturantFooter />
    </main>
  );
}
