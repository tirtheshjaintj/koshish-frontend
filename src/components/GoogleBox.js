import { jsx as _jsx } from "react/jsx-runtime";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Adjusted import for correct TS usage
import Cookie from "universal-cookie";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
const GoogleBox = ({ setIsLoading }) => {
    const cookie = new Cookie();
    const navigate = useNavigate();
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            if (!credentialResponse.credential) {
                throw new Error("No credential provided.");
            }
            // Decode the token
            const decodedToken = jwtDecode(credentialResponse.credential);
            // Destructure the necessary fields with a default for the name
            const { name = "Anonymous", email, sub: google_id } = decodedToken;
            // Remove all special characters and numbers from the name
            const sanitized_name = name.replace(/[^a-zA-Z\s]/g, "").trim();
            setIsLoading(true); // Set loading state
            // Send POST request to the backend
            const response = await axiosInstance.post(`/user/google_login`, {
                email,
                name: sanitized_name,
                google_id
            });
            if (response.data.status) {
                toast.success('Logged In Successfully');
                const token = response.data.token;
                if (token) {
                    // Save token in cookies
                    cookie.set(`user_token`, token, {
                        path: '/',
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year expiry
                    });
                    // Navigate to user dashboard
                    navigate(`/user/dashboard`);
                }
            }
            else {
                toast.error(response.data.message || "Login failed");
            }
        }
        catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || "Google Login failed.";
            toast.error(errorMsg);
        }
        finally {
            setIsLoading(false); // Reset loading state
        }
    };
    const handleGoogleLoginError = () => {
        toast.error("Login failed");
    };
    return (_jsx("div", { className: "flex justify-center items-center", children: _jsx(GoogleLogin, { onSuccess: handleGoogleLogin, onError: handleGoogleLoginError }) }));
};
export default GoogleBox;
