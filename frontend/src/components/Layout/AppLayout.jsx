import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    LayoutDashboard,
    FolderKanban,
    Settings as SettingsIcon,
    LogOut,
    Menu,
    Bell,
    Search,
    ChevronDown,
    Sun,
    Moon,
    User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link
        to={to}
        className={`
            relative flex items-center px-4 py-3 rounded-lg mb-1 transition
            ${active
                ? "bg-indigo-50 text-indigo-600 font-semibold dark:bg-indigo-900/40 dark:text-indigo-300"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-100"}
        `}
    >
        <Icon
            size={20}
            className={`mr-3 ${active ? "text-indigo-600 dark:text-indigo-300" : "text-gray-400"
                }`}
        />
        {label}
        {active && (
            <motion.div
                layoutId="active-pill"
                className="absolute left-0 w-1 h-8 bg-indigo-600 rounded-r-full dark:bg-indigo-400"
            />
        )}
    </Link>
);

const AppLayout = ({ children, title, actions }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 flex">
            {/* Sidebar */}
            <motion.aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 w-64
                    bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800
                    transform transition-transform duration-300
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-slate-800">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="ml-3 text-xl font-bold tracking-tight">
                            Collab
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2">
                            Workspace
                        </p>

                        <SidebarItem
                            icon={LayoutDashboard}
                            label="Dashboard"
                            to="/dashboard"
                            active={location.pathname === "/dashboard"}
                        />

                        <SidebarItem
                            icon={FolderKanban}
                            label="Projects"
                            to="/projects"
                            active={
                                location.pathname === "/projects" ||
                                location.pathname.startsWith("/project")
                            }
                        />

                        <p className="px-4 mt-6 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2">
                            Account
                        </p>

                        <SidebarItem
                            icon={SettingsIcon}
                            label="Settings"
                            to="/settings"
                            active={location.pathname === "/settings"}
                        />
                    </nav>

                    {/* User + profile dropdown */}
                    <div className="p-4 border-t border-gray-100 dark:border-slate-800 relative">
                        <button
                            onClick={() => setIsProfileOpen((p) => !p)}
                            className="w-full flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                        >
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold">
                                {user?.username?.charAt(0).toUpperCase() ?? "U"}
                            </div>
                            <div className="ml-3 flex-1 text-left min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {user?.username || "User"}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user?.email}
                                </p>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`text-gray-400 transition-transform ${isProfileOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className="absolute bottom-20 left-4 right-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden"
                                >
                                    <button
                                        className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-800"
                                        onClick={() => {
                                            navigate("/settings");
                                            setIsProfileOpen(false);
                                        }}
                                    >
                                        <User size={16} className="mr-2" />
                                        Profile & Settings
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Sign out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none mr-2"
                        >
                            <Menu size={22} />
                        </button>
                        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                            title={
                                theme === "light" ? "Switch to dark mode" : "Switch to light mode"
                            }
                        >
                            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        {/* Notifications */}
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition relative">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                        </button>

                        {/* Page actions */}
                        {actions && <div className="ml-1">{actions}</div>}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
