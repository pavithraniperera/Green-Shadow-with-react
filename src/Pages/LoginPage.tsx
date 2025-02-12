
import LogoSection from "../Components/LogoSection.tsx";
import SignInButtonGroup from "../Components/SignInButtonGroup.tsx";
import SignInInputFields from "../Components/SignInInputFields.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login, loginUser} from "../Features/AuthSlice.ts";
import {toast} from "react-toastify";
import {fetchFields} from "../Features/FieldSlice.ts";
import {fetchCrops} from "../Features/CropSlice.ts";

export default  function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const successMessage = useSelector((state) => state.auth.successMessage);
    const handleLogin = () => {
        console.log(password);
        if (email && password) {
            const UserData = {
                email: email,
                password: password

            }
            dispatch(loginUser(UserData));


        }
    }
    useEffect(() => {
        if (successMessage!='null') {
            toast.success(successMessage);
             dispatch(fetchFields())
             dispatch(fetchCrops())
            setTimeout(() => navigate("dashboard"), 1000);
        }else {
            toast.error('failed to login');
        }
    }, [successMessage, navigate]);
    const handleSignUpNavigation = () => {
        console.log(" go to signing up");
        navigate("signup");
    };
  return (
      <>
          <section className=" flex justify-center items-center bg-gray-50 rounded-lg" >
              <div
                  className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                  <LogoSection/>
                  <div className="p-6 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-center mb-6 text-gray-700">Welcome Back!</h3>
                      <form>
                          <SignInInputFields id="login-email" type="text" placeholder="User Name" icon="fas fa-user" options='' onChange={(e) => setEmail(e.target.value)} />
                          <SignInInputFields id="login-password" type="password" placeholder="Password" icon="fas fa-lock" options='' onChange={(e) => setPassword(e.target.value)} />
                          <div className="text-right text-sm mt-2">
                              <a href="#" className="text-green-500 hover:underline">Forgot password?</a>
                          </div>
                          <SignInButtonGroup
                              buttons={[
                                  {label: 'Sign In', className: 'bg-emerald-600 text-white shadow-lg', onClick: handleLogin},
                                  {label: 'Sign Up', className: 'bg-yellow-600 text-white shadow-lg' ,onClick: handleSignUpNavigation},
                              ]}
                          />
                      </form>
                  </div>
              </div>
          </section>
      </>
  )
}