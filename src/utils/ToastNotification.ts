import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 2000, // Closes after 2 seconds
        hideProgressBar: true, // Hide progress bar
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
    });
};

export const notifyError = (message: string) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
    });
};
