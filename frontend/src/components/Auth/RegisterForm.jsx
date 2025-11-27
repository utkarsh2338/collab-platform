import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import AuthLayout from './AuthLayout';
import Input from '../UI/Input';
import Button from '../UI/Button';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await registerUser(data.username, data.email, data.password);
            toast.success('Account created! Welcome aboard 🎉');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start managing your projects and working with your team."
        >
            <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <div className="space-y-5">

                    {/* Username */}
                    <div className="relative">
                        <label
                            htmlFor="username"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Username
                        </label>

                        <Input
                            {...register('username')}
                            type="text"
                            placeholder="johndoe"
                            icon={User}
                            className={`transition-all duration-200 ${errors.username
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-indigo-500"
                                }`}
                        />

                        {errors.username && (
                            <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
                        )}
                    </div>

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
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-indigo-500"
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
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-indigo-500"
                                }`}
                        />

                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                </div>

                {/* Submit Button */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        type="submit"
                        className="w-full flex justify-center py-3 font-semibold rounded-lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader className="h-5 w-5 animate-spin text-white" />
                        ) : (
                            <>
                                Create account
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                </motion.div>

                {/* Login Redirect */}
                <div className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        Sign in
                    </Link>
                </div>

            </form>
        </AuthLayout>
    );
};

export default RegisterForm;
