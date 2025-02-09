import Link from "next/link";
import { useEffect, useState } from "react";
const CustomerHeader = (props) => {
    console.log("props of the card data",props);


const cartStorage=JSON.parse(localStorage.getItem('cart'));

    const [cartNumber,setcardNumber]=useState(cartStorage?.length);;
    const [cardItem,setCardItem]=useState(cartStorage);
    // console.log("Props of the cartData",props.cartData);
    console.log("Props of the carddata",props.cartdata);

useEffect(()=>{
    console.log("props",props);
    if(props.cartdata){
    if(cartNumber){
        if(cardItem[0].resto_id!=props.cartdata.resto_id){
            localStorage.removeItem('cart');
            setcardNumber(1);
            setCardItem([props.cartdata]);
            localStorage.setItem('cart',JSON.stringify([props.cartdata]));
        }else{
            let localCartItem=cardItem;
            localCartItem.push(JSON.parse(JSON.stringify(props.cartdata)))
            setCardItem(localCartItem);
            setcardNumber(cartNumber+1);
            localStorage.setItem('cart',JSON.stringify(localCartItem));
        }
       
    }else{
        setcardNumber(1);
        setCardItem([props.cartdata]);
        localStorage.setItem('cart',JSON.stringify([props.cartdata]));

    }
   
    
}
},[props.cartdata])



useEffect(()=>{

if(props.removeCartData){
        let localCartItem=cardItem.filter((item)=>{
            return item._id!=props.removeCartData
        });
        setCardItem(localCartItem);
        setcardNumber(cartNumber-1);
        localStorage.setItem('cart',JSON.stringify(localCartItem));
        if(localCartItem.length==0){
            localStorage.removeItem('cart')
        }
}

},[props.removeCartData])
  
    
    return (
        <div className="bg-white shadow-md p-4">
            <div className="flex items-center justify-between">
                <img src="https://t4.ftcdn.net/jpg/02/46/27/99/240_F_246279936_R990a3KrrwCijQlLmoMZGK9pYjRpLeTc.jpg" alt="Logo" className="h-10 w-auto" />
                
                <ul className="flex space-x-6 text-lg font-medium">
                    <li>
                        <Link href="/" className="hover:text-blue-500 transition">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link  href="/" className="hover:text-blue-500 transition">
                            SignUp
                        </Link>
                    </li>
                    <li>
                        <Link   href={cartNumber?"/cart":"#"} className="hover:text-blue-500 transition">
                            Cart ({cartNumber?cartNumber:0})
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="hover:text-blue-500 transition">
                            Add Restaurant
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CustomerHeader;
