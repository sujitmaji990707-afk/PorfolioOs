import React, { useState } from 'react';
import { FiSettings, FiSun, FiMoon, FiMonitor, FiBell, FiLock, FiGlobe, FiSave, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/osStore';

export default function SettingsApp() {
    const { theme, setTheme } = useOSStore();
    const [notifications, setNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(true);

    return (
        <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black overflow-y-auto p-6">
            <div className="flex items-center gap-3 mb-6">
                <FiSettings className="text-3xl text-cyan-400 animate-spin-slow" />
                <div>
                    <h1 className="text-2xl font-bold text-cyan-400">Settings</h1>
                    <p className="text-sm text-gray-400">Customize your experience • Coming Soon</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Theme Settings */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel p-4"
                >
                    <h3 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <FiMonitor /> Appearance
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setTheme('dark')}
                            className={`p-3 rounded-lg flex items-center gap-3 transition ${theme === 'dark' ? 'bg-cyan-500/20 border border-cyan-500' : 'bg-black/30 border border-gray-700'}`}
                        >
                            <FiMoon className="text-blue-400" />
                            <span className="text-white">Dark Mode</span>
                        </button>
                        <button
                            onClick={() => setTheme('light')}
                            className={`p-3 rounded-lg flex items-center gap-3 transition ${theme === 'light' ? 'bg-cyan-500/20 border border-cyan-500' : 'bg-black/30 border border-gray-700'}`}
                        >
                            <FiSun className="text-yellow-400" />
                            <span className="text-white">Light Mode</span>
                        </button>
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel p-4"
                >
                    <h3 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <FiBell /> Notifications
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300">Enable desktop notifications</span>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-6 rounded-full transition ${notifications ? 'bg-cyan-500' : 'bg-gray-700'} relative`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${notifications ? 'right-0.5' : 'left-0.5'}`}></div>
                        </button>
                    </div>
                </motion.div>

                {/* System Preferences */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-4"
                >
                    <h3 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <FiSettings /> System
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">Auto-save windows state</span>
                            <button
                                onClick={() => setAutoSave(!autoSave)}
                                className={`w-12 h-6 rounded-full transition ${autoSave ? 'bg-cyan-500' : 'bg-gray-700'} relative`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${autoSave ? 'right-0.5' : 'left-0.5'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">Language</span>
                            <select className="bg-black/50 border border-gray-700 rounded px-2 py-1 text-sm text-gray-300">
                                <option>English (US)</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* About Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-4 text-center"
                >
                    <p className="text-xs text-gray-500">
                        Portfolio OS v2.0 • Built with React + Vite + TailwindCSS
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <FiRefreshCw className="text-gray-500 text-xs animate-spin" />
                        <span className="text-xs text-gray-500">Settings sync coming soon</span>
                        <FiSave className="text-gray-500 text-xs" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}