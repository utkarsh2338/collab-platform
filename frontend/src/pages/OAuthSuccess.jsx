import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const OAuthSuccess = () => {
    const { loginWithToken } = useAuth(); // you'll add this helper
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
            toast.error("Missing token");
            navigate("/login");
            return;
        }

        loginWithToken(token); // store token & fetch user or decode
        toast.success("Logged in successfully!");
        navigate("/dashboard");
    }, []);

    return <div>Signing you in...</div>;
};

export default OAuthSuccess;
