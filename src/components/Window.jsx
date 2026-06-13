
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiMinus, FiMaximize } from 'react-icons/fi';
import { useOSStore } from '../store/osStore';

export default function Window({ id, title, children, initialX, initialY, width, height, onClose }) {
    const { focusWindow, minimizeWindow, windows } = useOSStore();
    const [maximized, setMaximized] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width, height });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const windowRef = useRef(null);
    const win = windows.find(w => w.id === id);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    if (win?.minimized) return null;

    const handleMouseDown = (e) => {
        if (e.target.closest('.window-header') && !isMobile) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    const handleMaximize = () => {
        if (!maximized) {
            setPosition({ x: 0, y: 0 });
            setSize({ width: window.innerWidth, height: window.innerHeight - (isMobile ? 30 : 50) });
        } else {
            setPosition({ x: initialX, y: initialY });
            setSize({ width, height });
        }
        setMaximized(!maximized);
    };

    const windowStyle = maximized
        ? { width: size.width, height: size.height, zIndex: win?.zIndex || 10 }
        : {
            width: size.width,
            height: size.height,
            zIndex: win?.zIndex || 10,
            transform: `translate(${position.x}px, ${position.y}px)`,
            maxWidth: isMobile ? window.innerWidth - 20 : '95vw',
            maxHeight: isMobile ? window.innerHeight - 80 : '90vh'
        };

    return (
        <motion.div
            ref={windowRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={windowStyle}
            className="fixed glass-panel overflow-hidden flex flex-col shadow-2xl border border-blue-500/40"
            onClick={() => focusWindow(id)}
            onMouseDown={handleMouseDown}
        >
            <div className="window-header flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 bg-black/60 backdrop-blur border-b border-blue-500/30">
                <span className="text-xs md:text-sm text-cyan-300 font-mono truncate">{title}</span>
                <div className="flex gap-1 md:gap-2" onMouseDown={(e) => e.stopPropagation()}>
                    <button onClick={() => minimizeWindow(id)} className="text-gray-400 hover:text-yellow-400 transition p-1">
                        <FiMinus size={isMobile ? 12 : 14} />
                    </button>
                    <button onClick={handleMaximize} className="text-gray-400 hover:text-green-400 transition p-1">
                        <FiMaximize size={isMobile ? 12 : 14} />
                    </button>
                    <button onClick={() => onClose(id)} className="text-gray-400 hover:text-red-400 transition p-1">
                        <FiX size={isMobile ? 12 : 14} />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto bg-black/40 backdrop-blur-sm">
                {children}
            </div>
        </motion.div>
    );
}
