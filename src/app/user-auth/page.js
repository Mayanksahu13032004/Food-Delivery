'use client'
import { User } from "lucide-react"
import CustomerHeader from "../_components/CustomerHeader";
import UserSignup from "../_components/UserSignUp";

const  UserAuth=()=>{
    return (
        <div>
            <CustomerHeader/>
            <h1>User Sign up</h1>
            <UserSignup/>
        </div>
    )
}
export default UserAuth;