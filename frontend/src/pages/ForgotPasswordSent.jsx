import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout"; // <-- FIX PATH IF NEEDED
import Button from "../components/UI/Button";

const ForgotPasswordSent = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout
            title="Check your email"
            subtitle="We’ve sent you a link to reset your password."
        >
            <div className="flex flex-col items-center mt-8 space-y-6 text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CheckCircle className="text-green-500 w-20 h-20" />
                </motion.div>

                <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm">
                    If an account exists with that email, you’ll receive a password reset link shortly.
                </p>

                <Button className="w-full" onClick={() => navigate("/login")}>
                    Back to Login
                </Button>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordSent;
