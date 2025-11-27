import React from "react";
import AppLayout from "../components/Layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import { Mail, User, Moon, Sun } from "lucide-react";

const Settings = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <AppLayout title="Settings">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column – profile summary */}
                <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-semibold">
                            {user?.username?.charAt(0).toUpperCase() ?? "U"}
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">
                                {user?.username || "Your Name"}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        <p className="flex items-center gap-2">
                            <User size={16} />
                            Role: <span className="font-medium">Member</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <Mail size={16} />
                            Notifications: <span className="font-medium">Enabled</span>
                        </p>
                    </div>
                </div>

                {/* Right column – settings forms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Account section */}
                    <section className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-semibold text-base mb-1">Account</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Manage your basic account information.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Username
                                </label>
                                <input
                                    className="mt-1 w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={user?.username || ""}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    className="mt-1 w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={user?.email || ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </section>

                    {/* Appearance / Theme */}
                    <section className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-semibold text-base mb-1">Appearance</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Choose between light and dark mode.
                        </p>

                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-between w-full md:w-80 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/60 hover:border-indigo-500 hover:bg-indigo-50/60 dark:hover:bg-slate-800 transition"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                    {theme === "light" ? (
                                        <Sun className="text-indigo-600 dark:text-indigo-300" />
                                    ) : (
                                        <Moon className="text-indigo-600 dark:text-indigo-300" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium">
                                        {theme === "light" ? "Light mode" : "Dark mode"}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Click to switch to {theme === "light" ? "dark" : "light"}.
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                                Active
                            </span>
                        </button>
                    </section>

                    {/* Notifications mock section */}
                    <section className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-semibold text-base mb-1">Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Control notification preferences (non-functional demo).
                        </p>

                        <div className="space-y-3 text-sm">
                            <label className="flex items-center justify-between">
                                <span>Email updates</span>
                                <input type="checkbox" defaultChecked className="accent-indigo-600" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Project activity</span>
                                <input type="checkbox" defaultChecked className="accent-indigo-600" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Mentions only</span>
                                <input type="checkbox" className="accent-indigo-600" />
                            </label>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
};

export default Settings;
