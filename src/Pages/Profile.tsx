import {useState} from "react";

export default function ProfilePage() {
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleProfileEditMode = () => {
        setIsEditMode((prev) => !prev);
    };

    const updateProfile = () => {
        // Implement profile update logic
        console.log("Profile updated");
    };

    const deleteAccount = () => {
        // Implement account deletion logic
        console.log("Account deleted");
    };

    return (
        <section className="flex justify-center items-center pt-10 md:pl-20 mx-auto">
            <div className="max-w-5xl w-full max-h-[700px] overflow-y-auto p-8 bg-white/10 backdrop-blur-lg shadow-md rounded-lg">
                <div className="mb-6 text-center">
                    <h3 className="text-2xl font-semibold text-emerald-700"><i className="fa-solid fa-user text-2xl text-emerald-700 mr-3.5"></i>
                        John Doe
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                    {/* Staff ID */}
                    <div className="flex flex-col">
                        <label htmlFor="UserId" className=" font-medium text-green-600">
                            Staff ID:
                        </label>
                        <input
                            type="text"
                            id="UserId"
                            value="S12345"
                            readOnly
                            className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* First Name */}
                    <div className="flex flex-col">
                        <label htmlFor="userFirstName" className="text-green-600 font-medium">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="userFirstName"
                            value="John"
                            readOnly={!isEditMode}
                            className={`mt-1 px-4 py-2 ${
                                isEditMode ? "bg-white" : "bg-gray-100"
                            } border border-gray-300 rounded-lg text-gray-700`}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label htmlFor="userLastName" className="text-green-600 font-medium">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="userLastName"
                            value="Doe"
                            readOnly={!isEditMode}
                            className={`mt-1 px-4 py-2 ${
                                isEditMode ? "bg-white" : "bg-gray-100"
                            } border border-gray-300 rounded-lg text-gray-700`}
                        />
                    </div>

                    {/* Designation */}
                    <div className="flex flex-col">
                        <label htmlFor="userDesignation" className="text-green-600 font-medium">
                            Designation:
                        </label>
                        <input
                            type="text"
                            id="userDesignation"
                            value="Manager"
                            readOnly
                            className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col">
                        <label htmlFor="UserDob" className="text-green-600 font-medium">
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            id="UserDob"
                            value="1990-01-01"
                            readOnly={!isEditMode}
                            className={`mt-1 px-4 py-2 ${
                                isEditMode ? "bg-white" : "bg-gray-100"
                            } border border-gray-300 rounded-lg text-gray-700`}
                        />
                    </div>

                    {/* Joined Date */}
                    <div className="flex flex-col">
                        <label htmlFor="joinedDate" className="text-green-600 font-medium">
                            Joined Date:
                        </label>
                        <input
                            type="date"
                            id="joinedDate"
                            value="2020-06-15"
                            readOnly
                            className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="flex flex-col">
                        <label htmlFor="contactNo" className="text-green-600 font-medium">
                            Contact No.:
                        </label>
                        <input
                            type="text"
                            id="contactNo"
                            value="+1 234 567 890"
                            readOnly={!isEditMode}
                            className={`mt-1 px-4 py-2 ${
                                isEditMode ? "bg-white" : "bg-gray-100"
                            } border border-gray-300 rounded-lg text-gray-700`}
                        />
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col">
                        <label htmlFor="profileGender" className="text-green-600 font-medium">
                            Gender:
                        </label>
                        <select
                            id="profileGender"
                            disabled={!isEditMode}
                            className={`mt-1 px-4 py-2 ${
                                isEditMode ? "bg-white" : "bg-gray-100"
                            } border border-gray-300 rounded-lg text-gray-700`}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="userEmail" className="text-green-600 font-medium">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="userEmail"
                            value="john.doe@example.com"
                            readOnly
                            className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                        />
                    </div>

                    {/* Address Fields */}
                    {["Address Line 1", "Address Line 2", "Address Line 3", "Address Line 4"].map(
                        (label, index) => (
                            <div key={index} className="flex flex-col">
                                <label htmlFor={`addressLine${index + 1}`} className="text-green-600 font-medium">
                                    {label}:
                                </label>
                                <input
                                    type="text"
                                    id={`addressLine${index + 1}`}
                                    value={
                                        ["123 Main St", "Apt 101", "Springfield", "IL, 62701"][index]
                                    }
                                    readOnly={!isEditMode}
                                    className={`mt-1 px-4 py-2 ${
                                        isEditMode ? "bg-white" : "bg-gray-100"
                                    } border border-gray-300 rounded-lg text-gray-700`}
                                />
                            </div>
                        )
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    {isEditMode && (
                        <button
                            onClick={updateProfile}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    )}
                    <button
                        onClick={deleteAccount}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Delete Account
                    </button>
                    <button
                        onClick={toggleProfileEditMode}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        {isEditMode ? "Cancel" : "Edit Profile"}
                    </button>
                </div>
            </div>
        </section>


    );
}