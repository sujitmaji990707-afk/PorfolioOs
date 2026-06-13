
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/osStore';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiCode, FiCloud } from 'react-icons/fi';

// High-quality background images (multiple fallbacks)
const WALLPAPERS = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop"
];

export default function Wallpaper() {
    const { mousePosition } = useOSStore();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isMobile, setIsMobile] = useState(false);
    const [currentWallpaper, setCurrentWallpaper] = useState(0);

    useEffect(() => {
        // Load wallpaper
        const img = new Image();
        img.src = WALLPAPERS[currentWallpaper];
        img.onload = () => setImageLoaded(true);
        img.onerror = () => {
            // Try next wallpaper if fails
            if (currentWallpaper < WALLPAPERS.length - 1) {
                setCurrentWallpaper(currentWallpaper + 1);
            } else {
                setImageLoaded(true); // Fallback to gradient
            }
        };

        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', checkMobile);
        };
    }, [currentWallpaper]);

    const parallaxX = !isMobile && mousePosition ? (mousePosition.x / window.innerWidth - 0.5) * 10 : 0;
    const parallaxY = !isMobile && mousePosition ? (mousePosition.y / window.innerHeight - 0.5) * 10 : 0;

    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <>
            {/* Background Container */}
            <div className="fixed inset-0 -z-20">
                {/* Wallpaper Image */}
                <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                        backgroundImage: imageLoaded ? `url(${WALLPAPERS[currentWallpaper]})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        transform: `scale(1.05) translate(${parallaxX}px, ${parallaxY}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                />

                {/* Gradient Overlay - Lighter for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50" />

                {/* Grid Pattern Overlay - Lighter */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
                        backgroundSize: isMobile ? '30px 30px' : '50px 50px',
                    }}
                />

                {/* Radial Gradient Vignette - Subtle */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
                    }}
                />
            </div>

            {/* Profile Section - Top Right */}
            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="fixed top-4 right-4 z-10"
                >
                    <div className="glass-panel p-2 backdrop-blur-xl bg-black/30 border border-cyan-500/30">
                        <div className="relative">
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-1">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-3xl md:text-5xl overflow-hidden">
                                    <img
                                        src="src/assets/Pasted image.png"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute bottom-1 right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                        </div>
                        <div className="text-center mt-2">
                            <h3 className="text-white text-xs md:text-sm font-semibold">Uttam Maji</h3>
                            <p className="text-cyan-400 text-xs">Backend Developer</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Welcome Section - Top Left */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`fixed ${isMobile ? 'top-4 left-4 right-4' : 'top-8 left-8'} z-10 max-w-md`}
            >
                <div className="glass-panel p-4 md:p-6 backdrop-blur-xl bg-black/30 border border-cyan-500/30">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.8 }}
                        className="text-3xl md:text-5xl mb-2 md:mb-3"
                    >
                        👋
                    </motion.div>
                    <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
                        Hi, I'm <span className="text-cyan-400">Uttam Maji</span>
                    </h1>
                    <div className="space-y-1 md:space-y-2">
                        <p className="text-cyan-400 font-semibold flex items-center gap-2 text-sm md:text-base">
                            <FiCode className="text-base md:text-lg" /> Backend Developer
                        </p>
                        <p className="text-purple-400 font-semibold flex items-center gap-2 text-sm md:text-base">
                            <FiCloud className="text-base md:text-lg" /> Cloud & DevOps Learner
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-2 md:gap-3 mt-3 md:mt-4">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-1.5 md:p-2 bg-white/10 rounded-lg hover:bg-cyan-500/20 transition">
                            <FiGithub className="text-gray-300 text-sm md:text-base" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 md:p-2 bg-white/10 rounded-lg hover:bg-cyan-500/20 transition">
                            <FiLinkedin className="text-gray-300 text-sm md:text-base" />
                        </a>
                        <a href="mailto:uttam@example.com" className="p-1.5 md:p-2 bg-white/10 rounded-lg hover:bg-cyan-500/20 transition">
                            <FiMail className="text-gray-300 text-sm md:text-base" />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Welcome Message - Bottom Center */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`fixed ${isMobile ? 'bottom-23 left-3 right-3' : 'bottom-26 left-1/2 transform -translate-x-1/2'} z-10`}
                style={!isMobile ? { left: '50%', transform: 'translateX(-50%)' } : {}}
            >
                <div className="glass-panel p-4 md:p-6 backdrop-blur-xl bg-black/30 border border-cyan-500/30 text-center max-w-2xl">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="text-2xl md:text-4xl mb-2 md:mb-3"
                    >
                        🚀
                    </motion.div>
                    <h2 className="text-lg md:text-2xl font-bold text-white mb-2">
                        Welcome to My <span className="text-cyan-400">Portfolio </span>
                    </h2>
                    {!isMobile && (
                        <p className="text-gray-200 text-xs md:text-sm">
                            Explore my work, skills, and projects through this interactive operating system experience.
                            Click on any app in the dock to get started!
                        </p>
                    )}

                    {/* Stats */}
                    <div className="flex justify-center gap-3 md:gap-6 mt-3 md:mt-4">
                        <div className="text-center">
                            <div className="text-cyan-400 text-sm md:text-xl font-bold">4+</div>
                            <div className="text-gray-300 text-xs">Years</div>
                        </div>
                        <div className="text-center">
                            <div className="text-cyan-400 text-sm md:text-xl font-bold">20+</div>
                            <div className="text-gray-300 text-xs">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-cyan-400 text-sm md:text-xl font-bold">10+</div>
                            <div className="text-gray-300 text-xs">Tech</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Time and Date - Bottom Right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8'} z-10`}
            >
                <div className="glass-panel px-2 md:px-4 py-1 md:py-2 backdrop-blur-xl bg-black/30 border border-cyan-500/30">
                    <div className="text-sm md:text-2xl font-bold text-cyan-400 font-mono">{formattedTime}</div>
                    <div className="text-xs text-gray-300 hidden md:block">{formattedDate}</div>
                </div>
            </motion.div>

            {/* Location - Bottom Left */}
            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="fixed bottom-8 left-8 z-10"
                >
                    <div className="glass-panel px-4 py-2 backdrop-blur-xl bg-black/30 border border-cyan-500/30 flex items-center gap-2">
                        <FiMapPin className="text-red-400 text-sm" />
                        <span className="text-gray-200 text-sm">Bangalore, India</span>
                    </div>
                </motion.div>
            )}
        </>
    );
}
