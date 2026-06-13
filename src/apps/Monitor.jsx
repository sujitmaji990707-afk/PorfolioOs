import React, { useState, useEffect } from 'react';
import { FiActivity, FiCpu, FiHardDrive, FiWifi, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MonitorApp() {
    const [stats, setStats] = useState({
        cpu: 45,
        memory: 62,
        disk: 38,
        network: 24
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                cpu: Math.floor(Math.random() * 60) + 20,
                memory: Math.floor(Math.random() * 70) + 20,
                disk: Math.floor(Math.random() * 50) + 30,
                network: Math.floor(Math.random() * 40) + 10
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full bg-gradient-to-br from-black to-gray-900 overflow-y-auto p-6">
            <div className="flex items-center gap-3 mb-6">
                <FiActivity className="text-3xl text-green-400 animate-pulse" />
                <div>
                    <h1 className="text-2xl font-bold text-green-400">Activity Monitor</h1>
                    <p className="text-sm text-gray-400">System Resources • Preview Mode</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* CPU Usage */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel p-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FiCpu className="text-blue-400" />
                            <span className="font-semibold">CPU Usage</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-400">{stats.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${stats.cpu}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>System: {Math.floor(stats.cpu * 0.6)}%</span>
                        <span>User: {Math.floor(stats.cpu * 0.4)}%</span>
                        <span>Idle: {100 - stats.cpu}%</span>
                    </div>
                </motion.div>

                {/* Memory Usage */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel p-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FiHardDrive className="text-purple-400" />
                            <span className="font-semibold">Memory Usage</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-400">{stats.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${stats.memory}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                        Used: {(stats.memory * 0.16).toFixed(1)} GB / 16 GB
                    </div>
                </motion.div>

                {/* Disk Usage */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FiHardDrive className="text-yellow-400" />
                            <span className="font-semibold">Disk Usage</span>
                        </div>
                        <span className="text-2xl font-bold text-yellow-400">{stats.disk}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${stats.disk}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                        Used: {(stats.disk * 2.56).toFixed(0)} GB / 256 GB
                    </div>
                </motion.div>

                {/* Network */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FiWifi className="text-green-400" />
                            <span className="font-semibold">Network</span>
                        </div>
                        <span className="text-2xl font-bold text-green-400">{stats.network} Mbps</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${stats.network}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>↓ Download: {Math.floor(stats.network * 0.7)} Mbps</span>
                        <span>↑ Upload: {Math.floor(stats.network * 0.3)} Mbps</span>
                    </div>
                </motion.div>
            </div>

            {/* Processes */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-panel p-4"
            >
                <h3 className="font-semibold text-cyan-400 mb-3">Top Processes</h3>
                <div className="space-y-2">
                    {[
                        { name: 'Portfolio OS (Electron)', cpu: 12, memory: 245 },
                        { name: 'Terminal Service', cpu: 8, memory: 89 },
                        { name: 'GitHub Integration', cpu: 5, memory: 156 },
                        { name: 'Node.js Backend', cpu: 15, memory: 312 }
                    ].map(proc => (
                        <div key={proc.name} className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{proc.name}</span>
                            <div className="flex gap-4">
                                <span className="text-blue-400">{proc.cpu}% CPU</span>
                                <span className="text-purple-400">{proc.memory} MB</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="mt-4 text-center text-xs text-gray-500">
                <FiClock className="inline mr-1" /> Real-time monitoring coming in next update
            </div>
        </div>
    );
}