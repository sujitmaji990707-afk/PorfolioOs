import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const bootMessages = [
    "Starting Portfolio OS...",
    "Loading kernel modules...",
    "Initializing file system...",
    "Loading UI components...",
    "Loading wallpaper engine...",
    "Connecting to GitHub API...",
    "Starting terminal services...",
    "Portfolio OS Ready - Welcome Uttam!"
];

export default function BootScreen({ onComplete }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < bootMessages.length) {
            const timer = setTimeout(() => setIndex(index + 1), 350);
            return () => clearTimeout(timer);
        } else {
            setTimeout(onComplete, 800);
        }
    }, [index, onComplete]);

    return (
        <div className="h-screen w-screen bg-black flex flex-col justify-center items-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 font-mono text-xl md:text-2xl space-y-3"
            >
                {bootMessages.slice(0, index).map((msg, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-cyan-400">$</span>
                        <span>{msg}</span>
                        {i === index - 1 && <span className="w-2 h-5 bg-green-400 animate-blink"></span>}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}