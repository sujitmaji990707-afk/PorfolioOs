import React, { useState } from 'react';
import { FiSend, FiCode, FiDatabase, FiClock, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function PostmanApp() {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://api.example.com/users');

    return (
        <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black overflow-y-auto">
            {/* Header */}
            <div className="bg-black/50 border-b border-yellow-500/30 p-4">
                <div className="flex items-center gap-3">
                    <FiSend className="text-3xl text-yellow-400 animate-pulse" />
                    <div>
                        <h1 className="text-2xl font-bold text-yellow-400">Postman API Client</h1>
                        <p className="text-sm text-gray-400">Under Construction • Coming Q1 2025</p>
                    </div>
                </div>
            </div>

            {/* Construction Animation */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl"
                >
                    {/* Animated construction icon */}
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-8xl mb-6"
                    >
                        🚧
                    </motion.div>

                    <h2 className="text-3xl font-bold text-yellow-400 mb-4">Coming Soon</h2>
                    <p className="text-gray-300 mb-6">
                        I'm currently building a powerful API testing environment with features like:
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="glass-panel p-3 text-left">
                            <FiCode className="text-yellow-400 mb-2" />
                            <p className="text-sm">Request Builder</p>
                        </div>
                        <div className="glass-panel p-3 text-left">
                            <FiDatabase className="text-yellow-400 mb-2" />
                            <p className="text-sm">Collection Management</p>
                        </div>
                        <div className="glass-panel p-3 text-left">
                            <FiClock className="text-yellow-400 mb-2" />
                            <p className="text-sm">History Tracking</p>
                        </div>
                        <div className="glass-panel p-3 text-left">
                            <FiArrowRight className="text-yellow-400 mb-2" />
                            <p className="text-sm">Environment Variables</p>
                        </div>
                    </div>

                    {/* Preview of what's coming */}
                    <div className="glass-panel p-4 text-left">
                        <div className="flex gap-2 mb-3">
                            <button className="px-3 py-1 bg-yellow-500/20 rounded text-yellow-400 text-sm">GET</button>
                            <button className="px-3 py-1 bg-gray-700/50 rounded text-gray-400 text-sm">POST</button>
                            <button className="px-3 py-1 bg-gray-700/50 rounded text-gray-400 text-sm">PUT</button>
                        </div>
                        <div className="bg-black/50 rounded p-2 font-mono text-sm text-gray-400">
                            <span className="text-yellow-400">GET</span> {url}
                        </div>
                        <div className="mt-3 h-20 bg-black/30 rounded p-2 text-gray-500 text-sm">
                            Response preview will appear here...
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6">
                        ⚡ Status: 35% complete • Expected release: Soon
                    </p>
                </motion.div>
            </div>
        </div>
    );
}