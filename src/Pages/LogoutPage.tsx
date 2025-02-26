import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser, logout} from "../Features/AuthSlice.ts";

const LogoutPage = () => {
    const [showModal, setShowModal] = useState(true); // Show modal immediately
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(loginUser());
        navigate("/");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md"
                        onClick={() => navigate(-1)} // Go back to the previous page
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutPage;
