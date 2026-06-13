import React, { useState } from 'react';
import { FiGlobe, FiArrowLeft, FiArrowRight, FiRefreshCw, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function BrowserApp() {
    const [url, setUrl] = useState('portfolio-os://under-construction');

    return (
        <div className="h-full w-full bg-gray-900 flex flex-col">
            {/* Browser Chrome */}
            <div className="bg-gray-800 border-b border-blue-500/30 p-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex gap-2 ml-2">
                        <FiArrowLeft className="text-gray-400 cursor-pointer hover:text-white" />
                        <FiArrowRight className="text-gray-400 cursor-pointer hover:text-white" />
                        <FiRefreshCw className="text-gray-400 cursor-pointer hover:text-white" />
                    </div>
                    <div className="flex-1 flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-1">
                        <FiGlobe className="text-blue-400" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-white text-sm"
                        />
                        <FiStar className="text-gray-400 cursor-pointer hover:text-yellow-400" />
                    </div>
                </div>

                {/* Bookmarks Bar */}
                <div className="flex gap-3 text-xs text-gray-400">
                    <span className="hover:text-white cursor-pointer">📘 GitHub</span>
                    <span className="hover:text-white cursor-pointer">💼 LinkedIn</span>
                    <span className="hover:text-white cursor-pointer">📄 Portfolio</span>
                    <span className="hover:text-white cursor-pointer">📝 Resume</span>
                    <span className="hover:text-white cursor-pointer">⚡ LeetCode</span>
                </div>
            </div>

            {/* Browser Content */}
            <div className="flex-1 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center min-h-full p-8"
                >
                    <div className="text-center max-w-2xl">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-8xl mb-6"
                        >
                            🌐
                        </motion.div>

                        <h1 className="text-3xl font-bold text-blue-400 mb-3">Browser Under Construction</h1>
                        <p className="text-gray-400 mb-6">
                            A full-featured web browser is being developed. Coming with tab support, bookmarks, and more!
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {['Tabs Support', 'Bookmarks', 'History', 'Downloads', 'Extensions', 'Dark Mode'].map(feature => (
                                <div key={feature} className="glass-panel p-2 text-sm text-gray-300">
                                    ✓ {feature}
                                </div>
                            ))}
                        </div>

                        <div className="glass-panel p-4 text-left">
                            <p className="text-yellow-400 text-sm mb-2">📡 Developer Console (Preview)</p>
                            <div className="bg-black/50 rounded p-2 font-mono text-xs text-green-400">
                                &gt; Building browser engine...<br />
                                &gt; Implementing WebSocket support...<br />
                                &gt; Adding DevTools...<br />
                                <span className="text-yellow-400">&gt; Estimated completion: Soon</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}