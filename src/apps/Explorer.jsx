import React from 'react';
import { useOSStore } from '../store/osStore';

const folders = [
    { name: 'Projects', icon: '📁', color: 'text-blue-400' },
    { name: 'Skills', icon: '🎯', color: 'text-purple-400' },
    { name: 'Experience', icon: '💼', color: 'text-green-400' },
    { name: 'Certificates', icon: '📜', color: 'text-yellow-400' },
    { name: 'Photos', icon: '📸', color: 'text-pink-400' },
    { name: 'Documents', icon: '📄', color: 'text-gray-400' },
];

export default function ExplorerApp() {
    const { addWindow, addNotification } = useOSStore();

    const openFolder = (folder) => {
        addNotification('Folder Opened', `Opening ${folder}...`, 'info');
    };

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">File Explorer</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {folders.map(folder => (
                    <div
                        key={folder.name}
                        onClick={() => openFolder(folder.name)}
                        className="p-4 bg-black/30 rounded-lg border border-blue-500/20 hover:border-blue-500/50 cursor-pointer transition-all hover:scale-105 text-center group"
                    >
                        <div className="text-4xl mb-2 group-hover:scale-110 transition">{folder.icon}</div>
                        <div className={`font-mono text-sm ${folder.color}`}>{folder.name}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <p className="text-sm text-cyan-400">📂 Quick Access</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                    <span>Recent: Projects</span>
                    <span>•</span>
                    <span>Starred: Skills</span>
                    <span>•</span>
                    <span>Shared: Experience</span>
                </div>
            </div>
        </div>
    );
}