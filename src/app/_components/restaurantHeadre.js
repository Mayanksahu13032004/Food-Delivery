'use client'
import Link from "next/link";
import { useRouter,usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {

    const [detail,setdetail]=useState();
    const router=useRouter();
    const pathname=usePathname();
useEffect(()=>{
    let data=localStorage.getItem("restaurantUser")
    if(!data && pathname=="/restaurant/dashboard"){
            router.push("/restaurant")
    }
    else if (data  && pathname=="/restaurant"){
        router.push("/restaurant/dashboard")
    }

    
    else{
        setdetail(JSON.parse(data))
    }
},[])

const logout=()=>{
    localStorage.removeItem("restaurantUser")
    router.push("/restaurant")

}

    return (
        <div className="bg-gray-800 text-white w-full">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div>
                    <img
                        src="https://imgs.search.brave.com/fKK6OKSaVT5u6GzkV0rAfEkqfApTB1CzLjTSHyycvOE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQzLzY0/LzIyLzQzNjQyMmVl/YWMzYjNkNzliNjdl/MmQzY2ZhNTNiNDRm/LmpwZw"
                        alt="Restaurant Logo"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-8">
                    <li>
                        <Link
                            href="/"
                            className="text-lg hover:text-blue-400 transition"
                        >
                            Home
                        </Link>
                    </li>
                            {
                                detail && detail.name?
                             <>
                              <li>
                               <button onClick={logout}>Logout</button>
                            </li>
                                <li>
                                <Link
                                    href="/login"
                                    className="text-lg hover:text-blue-400 transition"
                                >
                                  Profile
                                </Link>
                            </li>
                             </>
                                :
                                <li>
                                <Link
                                    href="/profile"
                                    className="text-lg hover:text-blue-400 transition"
                                >
                                    Login/signup
                                </Link>
                            </li>
                            }
                   

                 

                </ul>
            </div>
        </div>
    );
};

export default RestaurantHeader;
