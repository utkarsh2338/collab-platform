import React from 'react';
import { motion } from 'framer-motion';
import DarkModeToggle from "../UI/DarkModeToggle";

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center 
                        bg-gradient-to-br from-gray-50 to-gray-100 
                        dark:from-gray-900 dark:to-gray-950 px-4">

            {/* 🌙 Dark Mode Toggle (TOP of entire page) */}
            <div className="absolute top-6 right-6 z-[9999]">
                <DarkModeToggle />
            </div>

            {/* Auth Card */}
            <div className="flex w-full max-w-6xl bg-white dark:bg-gray-900 
                            rounded-2xl shadow-xl border border-gray-200 
                            dark:border-gray-800 overflow-hidden">

                {/* Left Section */}
                <div className="w-full lg:w-1/2 p-10 lg:p-16 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md space-y-8"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {subtitle}
                            </p>
                        </div>

                        {children}
                    </motion.div>
                </div>

                {/* Right Visual Section */}
                <div className="hidden lg:flex lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></div>

                    <div
                        className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1581092580505-2a8b2d92dcdd?auto=format&fit=crop&w=1950&q=80')] 
                        bg-cover bg-center mix-blend-overlay"
                    ></div>

                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-12 text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-4xl font-extrabold tracking-tight mb-4"
                        >
                            Collaborate. Create. Deliver.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.7 }}
                            className="text-lg text-indigo-100 max-w-md"
                        >
                            A powerful platform to manage projects and work with your team.
                        </motion.p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;
