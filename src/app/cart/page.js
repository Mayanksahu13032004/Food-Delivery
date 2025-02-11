'use client'
import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader.js";
import { DeliveryCharges, TAX } from "../lib/constant.js";
import { useRouter } from "next/navigation.js";

const Page = () => {
  const router =useRouter();
  const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")));
  const [total]=useState(()=>cartStorage.length==1?cartStorage[0].price:cartStorage.reduce((a,b)=>{
    return a.price+b.price
    
  }))
  console.log("TOtal price",total);
  

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(cartData);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const ordernow=()=>{
    if(JSON.parse(localStorage.getItem('user'))){
      router.push('/order');
    }else{
      router.push('/user-auth?order=true');
    }

  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomerHeader />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

        {cartStorage.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {cartStorage.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <div className="text-gray-700 mt-2">{item.description}</div>
                
                {/* Price Section */}



                <div className="mt-2 text-lg font-bold text-green-600">
                Food Charges  ₹{item.price}
                </div>




                

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>

          
        ) : (
          <p className="text-center text-gray-600 text-lg">No food items available.</p>
        )}
      </div>

{/*  total ammount section are */}
<div className="bg-white shadow-lg p-6 rounded-lg mt-6">
  <div className="flex flex-col space-y-3">
    <div className="flex justify-between text-lg font-semibold border-b pb-2">
      <span>Food Charges</span>
      <span>₹{total}</span>
    </div>
    <div className="flex justify-between text-lg font-semibold border-b pb-2">
      <span>Tax</span>
      <span>₹{total*TAX/100}</span>
    </div>
    <div className="flex justify-between text-lg font-semibold border-b pb-2">
      <span>Delivery Charges</span>
      <span>₹{DeliveryCharges}</span>
    </div>
    <div className="flex justify-between text-lg font-bold text-green-600">
      <span>Total Amount</span>
      <span>₹{total+DeliveryCharges+(total*TAX/100)}</span>
    </div>
  </div>

  <div className="flex justify-center mt-6">
  <button onClick={ordernow} className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
    Order Now
  </button>
</div>


</div>



    </div>
  );
};

export default Page;
