import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import AuthLayout from './AuthLayout';
import Input from '../UI/Input';
import Button from '../UI/Button';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginForm = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            toast.success('Logged in successfully!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        
        <AuthLayout
            title="Welcome back 👋"
            
            subtitle="Enter your credentials to access your workspace."
        >
            <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                {/* Inputs */}
                <div className="space-y-5">

                    {/* Email */}
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email address
                        </label>

                        <Input
                            {...register('email')}
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            className={`transition-all duration-200 ${errors.email
                                    ? 'border-red-300 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-indigo-500'
                                }`}
                        />

                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    
                    {/* Password */}
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>

                        <Input
                            {...register('password')}
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            className={`transition-all duration-200 ${errors.password
                                    ? 'border-red-300 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-indigo-500'
                                }`}
                        />

                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                </div>

                {/* Remember / Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                            Remember me
                        </span>
                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-indigo-600 hover:underline"
                    >
                        Forgot password?
                    </Link>

                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="submit"
                        className="w-full flex justify-center py-3 font-semibold rounded-lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader className="h-5 w-5 animate-spin text-white" />
                        ) : (
                            <>
                                Sign in
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                </motion.div>

                {/* Signup Link */}
                <div className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
                    Don’t have an account?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        Create one
                    </Link>
                </div>

            </form>
            

        </AuthLayout>
    );
};

export default LoginForm;
