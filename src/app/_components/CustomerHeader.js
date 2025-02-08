import Link from "next/link";

const CustomerHeader = () => {
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
                        <Link href="/" className="hover:text-blue-500 transition">
                            SignUp
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="hover:text-blue-500 transition">
                            Cart (0)
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
