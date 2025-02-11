    'use client'
    import { useState, useEffect } from "react";
    import CustomerHeader from "../_components/CustomerHeader.js";
    import { DeliveryCharges, TAX } from "../lib/constant.js";
import { useRouter } from "next/navigation.js";

    const Page = () => {
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")));
    const [userStorage,setUserStorage]=useState(JSON.parse(localStorage.getItem('user')))
const [removeCartData,setremoveCartData]=useState(false)
const router=useRouter();
    const [total]=useState(()=>cartStorage?.length==1?cartStorage[0].price:cartStorage?.reduce((a,b)=>{
        return a.price+b.price
        
    }))
    console.log("TOtal price",total);
    

useEffect(()=>{
if(!total){
    router.push('/');
}
},[total])


    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        setCartStorage(cartData);
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cartStorage.filter((item) => item._id !== id);
        setCartStorage(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const ordernow = async () => {
        let user_id = JSON.parse(localStorage.getItem("user"))._id;
        let cart = JSON.parse(localStorage.getItem("cart"));
        let foodItems = cart.map((item) => item._id).toString();
        let deliveryBoy_id = 5655645656;
        let status = "confirm";
        let resto_id = cart[0].resto_id;
        let collection = {
          user_id,
          resto_id,
          foodItems,
          deliveryBoy_id,
          status,
          amount: total+DeliveryCharges+(total*TAX/100),
        };
      
        console.log("Sending Order:", collection);
      
        try {
          let response = await fetch("http://localhost:3000/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Ensure JSON format
            body: JSON.stringify(collection), // Don't wrap in another object
          });
      
          const result = await response.json();
          console.log("Server Response:", result);
      
          if (result.success) {
            alert("Order Confirmed");
            setremoveCartData(true)
            router.push('/myprofile')
          } else {
            alert("Order Failed");
          }
        } catch (error) {
          console.error("Error in ordernow:", error);
          alert("Something went wrong!");
        }
      };
      

    return (
        <div className="bg-gray-100 min-h-screen">
        <CustomerHeader removeCartData={removeCartData} />

    

    {/*  total ammount section are */}
    <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
    <div className="flex flex-col space-y-3">
        <div className="flex justify-between text-lg font-semibold border-b pb-2">

    {/* {
        userStorage?
        <>
        
        </>
        :
        null
    } */}
    <h2>User Details</h2>
        <span>Name</span>
        <span>{userStorage.name}</span>

        <span>Address</span>
        <span>{userStorage.address}</span>

        <span>Mobile</span>
        <span>{userStorage.contact}</span>

        </div>
        
        <div className="flex justify-between text-lg font-semibold border-b pb-2">
            <h2>Amount Detail</h2>
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
    <h2>Payement Method</h2>
    <div>
    
    <span>Cash On delivery</span>
    </div>

    <div className="flex justify-center mt-6">
    <button onClick={ordernow} className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
        Place your Order
    </button>
    </div>


    </div>



        </div>
    );
    };

    export default Page;
