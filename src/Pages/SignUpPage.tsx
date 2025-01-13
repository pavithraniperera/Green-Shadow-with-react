import LogoSection from "../Components/LogoSection.tsx";
import SignInButtonGroup from "../Components/SignInButtonGroup.tsx";
import SignInInputFields from "../Components/SignInInputFields.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SignUpPage(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[role, setRole] = useState("");
    const navigate = useNavigate();

    const handleSignUp = () => {
        console.log("signing up");
        console.log(email, password,role);
        if (email && password && role ) {
            localStorage.setItem("email", email);
            localStorage.setItem("role", role);
            navigate("/");
        }
    }
    const navigateLogin = () => {
        console.log("logged in");
         navigate("/");
    }


    return (
        <>
            <section className="flex justify-center items-center bg-gray-50 rounded-lg">
                <div
                    className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold text-center  text-gray-700 mb-10">Create an Account!</h3>
                        <form >
                            <SignInInputFields id="signUp-email" type="email" placeholder="Email" icon="fas fa-envelope" options='' onChange={(e) => setEmail(e.target.value)} />
                            <SignInInputFields id="signUp-password" type="password" placeholder="Password" icon="fas fa-lock" options='' onChange={(e) => setPassword(e.target.value)} />
                            <SignInInputFields
                                id="SelectRole"
                                type="select"
                                options={[
                                    {value: '', label: 'Choose Your Role...'},
                                    {value: 'ADMINISTRATOR', label: 'Admin'},
                                    {value: 'MANAGER', label: 'Manager'},
                                    {value: 'SCIENTIST', label: 'Scientist'},
                                    {value: 'OTHER', label: 'Other'},
                                ]}
                                icon="fas fa-lock"
                                placeholder="Select Role"
                                onChange={(e) => setRole(e.target.value)}

                            />
                            <SignInButtonGroup
                                buttons={[
                                    {label: 'Sign In', className: 'bg-yellow-600 text-white shadow-lg', onClick: navigateLogin },
                                    {label: 'Sign Up', className: 'bg-emerald-600 text-white shadow-lg' ,onClick: handleSignUp},
                                ]}
                            />
                        </form>
                    </div>
                    <LogoSection/>
                </div>
            </section>
        </>
    )
}