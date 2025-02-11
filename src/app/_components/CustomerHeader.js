import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
    console.log("Props of the card data", props);

    const router = useRouter(); // ✅ Fixed missing parentheses

    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const userStorage = JSON.parse(localStorage.getItem("user")) || null;

    const [user, setUser] = useState(userStorage);
    const [cartNumber, setCartNumber] = useState(cartStorage.length);
    const [cardItem, setCardItem] = useState(cartStorage);

    console.log("Props of the card data", props.cartdata);

    useEffect(() => {
        console.log("Props of the customer header", props);

        if (props.cartdata) {
            if (cartNumber > 0 && cardItem.length > 0) {
                if (cardItem[0]?.resto_id !== props.cartdata.resto_id) {
                    localStorage.removeItem("cart");
                    setCartNumber(1);
                    setCardItem([props.cartdata]);
                    localStorage.setItem("cart", JSON.stringify([props.cartdata]));
                } else {
                    let updatedCart = [...cardItem, props.cartdata];
                    setCardItem(updatedCart);
                    setCartNumber(updatedCart.length);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
            } else {
                setCartNumber(1);
                setCardItem([props.cartdata]);
                localStorage.setItem("cart", JSON.stringify([props.cartdata]));
            }
        }
    }, [props.cartdata]);

    useEffect(() => {
        if (props.removeCartData) {
            let updatedCart = cardItem.filter((item) => item._id !== props.removeCartData);
            setCardItem([...updatedCart]); // ✅ Avoid mutating state directly
            setCartNumber(updatedCart.length);
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            if (updatedCart.length === 0) {
                localStorage.removeItem("cart");
            }
        }
    }, [props.removeCartData]);

useEffect(()=>{
if(props.removeCartData){
    setCardItem([]);
    setCartNumber(0)
    localStorage.removeItem("cart");
}
},[props.removeCartData])

    const logout = () => {
        console.log("The logout function is called");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/user-auth");
    };

    return (
        <div className="bg-white shadow-md p-4">
            <div className="flex items-center justify-between">
                <img
                    src="https://t4.ftcdn.net/jpg/02/46/27/99/240_F_246279936_R990a3KrrwCijQlLmoMZGK9pYjRpLeTc.jpg"
                    alt="Logo"
                    className="h-10 w-auto"
                />

                <ul className="flex space-x-6 text-lg font-medium">
                    <li>
                        <Link href="/" className="hover:text-blue-500 transition">
                            Home
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <span className="font-semibold">{user?.name}</span>
                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/login" className="hover:text-blue-500 transition">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="hover:text-blue-500 transition">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link
                            href={cartNumber ? "/cart" : "#"}
                            className={`hover:text-blue-500 transition ${
                                cartNumber ? "text-blue-600" : "text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Cart ({cartNumber})
                        </Link>
                    </li>
                    <li>
                        <Link href="/add-restaurant" className="hover:text-blue-500 transition">
                            Add Restaurant
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CustomerHeader;
