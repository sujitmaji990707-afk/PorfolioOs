
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FiTerminal, FiFolder, FiImage, FiFileText, FiGithub,
    FiSettings, FiCode, FiSend, FiGlobe, FiActivity,
    FiMusic, FiInfo, FiMail
} from 'react-icons/fi';
import { useOSStore } from '../store/osStore';

const dockItems = [
    { id: 'terminal', icon: FiTerminal, label: 'Terminal', componentName: 'Terminal', title: 'Terminal', description: 'Command line interface' },
    { id: 'explorer', icon: FiFolder, label: 'Explorer', componentName: 'Explorer', title: 'Explorer', description: 'File manager' },
    { id: 'notepad', icon: FiFileText, label: 'Notepad', componentName: 'Notepad', title: 'Notepad', description: 'Write notes' },
    { id: 'vscode', icon: FiCode, label: 'VS Code', componentName: 'VSCode', title: 'VS Code', description: 'Code editor' },
    { id: 'github', icon: FiGithub, label: 'GitHub', componentName: 'GitHub', title: 'GitHub', description: 'Repository manager' },
    { id: 'postman', icon: FiSend, label: 'Postman', componentName: 'Postman', title: 'Postman', description: 'API client' },
    { id: 'browser', icon: FiGlobe, label: 'Browser', componentName: 'Browser', title: 'Browser', description: 'Web browser' },
    { id: 'monitor', icon: FiActivity, label: 'Monitor', componentName: 'Monitor', title: 'Monitor', description: 'System resources' },
    { id: 'photos', icon: FiImage, label: 'Photos', componentName: 'Photos', title: 'Photos', description: 'Image gallery' },
    { id: 'music', icon: FiMusic, label: 'Music', componentName: 'Music', title: 'Music', description: 'Audio player' },
    { id: 'contact', icon: FiMail, label: 'Contact', componentName: 'Contact', title: 'Contact', description: 'Get in touch' },
    { id: 'about', icon: FiInfo, label: 'About', componentName: 'About', title: 'About', description: 'Information' },
    { id: 'settings', icon: FiSettings, label: 'Settings', componentName: 'Settings', title: 'Settings', description: 'Preferences' },
];

export default function Dock() {
    const { addWindow, addNotification } = useOSStore();
    const [isMobile, setIsMobile] = useState(false);
    const [visibleItems, setVisibleItems] = useState(dockItems);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // Show fewer items on mobile
            if (mobile) {
                setVisibleItems(dockItems.slice(0, 6));
            } else {
                setVisibleItems(dockItems);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const openApp = (item) => {
        const xPos = isMobile ? 20 : 80 + Math.random() * 200;
        const yPos = isMobile ? 40 : 60 + Math.random() * 100;
        const width = isMobile ? window.innerWidth - 40 : 950;
        const height = isMobile ? window.innerHeight - 100 : 650;

        addWindow({
            title: item.title,
            componentName: item.componentName,
            x: xPos,
            y: yPos,
            width: width,
            height: height,
        });

        addNotification('🚀 App Launched', `${item.title} - ${item.description}`, 'info');
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${isMobile ? 'bottom-2 left-2 right-2' : 'bottom-5 left-1/2 transform -translate-x-1/2'} z-50`}
            style={!isMobile ? { left: '50%', transform: 'translateX(-50%)' } : {}}
        >
            <div className={`glass-panel ${isMobile ? 'px-2 py-1' : 'px-4 py-2'} backdrop-blur-xl border border-blue-500/30 shadow-2xl ${isMobile ? 'overflow-x-auto flex' : ''}`}>
                <div className={`flex ${isMobile ? 'gap-1' : 'gap-1'} ${!isMobile ? 'justify-center' : ''}`}>
                    {visibleItems.map((item, index) => (
                        <motion.button
                            key={item.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.02, type: "spring", stiffness: 400 }}
                            whileHover={!isMobile ? { scale: 1.15, y: -12 } : {}}
                            whileTap={{ scale: 0.95 }}
                            className={`dock-icon flex flex-col items-center ${isMobile ? 'p-1 min-w-[50px]' : 'p-2 min-w-[70px]'} rounded-xl hover:bg-blue-500/20 transition-all group relative`}
                            onClick={() => openApp(item)}
                        >
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>

                            <div className="relative">
                                <item.icon className={`${isMobile ? 'text-base' : 'text-2xl'} text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 group-hover:scale-110`} />
                                {(item.id === 'terminal' || item.id === 'notepad') && (
                                    <span className={`absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse`}></span>
                                )}
                            </div>

                            <span className={`${isMobile ? 'text-[8px] mt-1' : 'text-[10px] mt-1.5'} text-gray-300 font-mono group-hover:text-white transition-colors duration-300 ${isMobile ? 'hidden' : 'block'}`}>
                                {item.label}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {!isMobile && (
                    <>
                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent mx-1 self-center"></div>
                        <div className="flex items-center px-2 text-xs text-gray-400 font-mono">
                            <div className="relative">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                            </div>
                            <span className="hidden lg:inline text-[10px] tracking-wider">ONLINE</span>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile swipe hint */}
            {isMobile && visibleItems.length < dockItems.length && (
                <div className="text-center text-[8px] text-gray-500 mt-1">
                    ← swipe for more apps →
                </div>
            )}
        </motion.div>
    );
}