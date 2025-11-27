import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Lock, Loader } from "lucide-react";
import api from "../../api/axios";
import AuthLayout from "./AuthLayout";
import Input from "../UI/Input";
import Button from "../UI/Button";

// Validation schema
const schema = yup.object().shape({
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm your password"),
});

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await api.post(`/auth/reset-password/${token}`, {
                password: data.password,
            });

            toast.success("Password reset successfully!");
            navigate("/login");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to reset password"
            );
        }
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Enter a new password below."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">

                {/* New Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                        New Password
                    </label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        {...register("password")}
                        className={
                            errors.password
                                ? "border-red-300 focus:ring-red-500"
                                : ""
                        }
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Confirm Password
                    </label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        {...register("confirmPassword")}
                        className={
                            errors.confirmPassword
                                ? "border-red-300 focus:ring-red-500"
                                : ""
                        }
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="submit"
                        className="w-full py-3 font-bold flex justify-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader className="animate-spin h-5 w-5" />
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </motion.div>
            </form>
        </AuthLayout>
    );
};

export default ResetPassword;
