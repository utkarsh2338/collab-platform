import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import AuthLayout from "../components/Auth/AuthLayout";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import api from "../api/axios";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            await api.post("/auth/forgot-password", { email: data.email });

            // ⭐ Redirect user to the success page
            navigate("/forgot-password/sent");

        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to send reset link"
            );
        }
    };

    return (
        <AuthLayout
            title="Forgot your password?"
            subtitle="Enter your email address and we'll send you a reset link."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">

                {/* Email */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Email address
                    </label>
                    <Input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="you@example.com"
                        icon={Mail}
                    />
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 font-semibold"
                >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>

                {/* Back to login */}
                <div className="text-center">
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 text-sm text-indigo-600 hover:underline"
                    >
                        <ArrowLeft size={16} />
                        Back to login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
