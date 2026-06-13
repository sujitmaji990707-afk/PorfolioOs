// src/apps/Music.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiMusic, FiPlay, FiPause, FiSkipForward, FiSkipBack, FiHeart, FiVolume2, FiVolumeX, FiList, FiRepeat, FiShuffle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Demo tracks - no actual audio files, just UI demo
const demoPlaylist = [
    { id: 1, title: 'Midnight Coding', artist: 'Synthwave Dreams', duration: '3:24', cover: '🎹', color: 'from-purple-500 to-pink-500' },
    { id: 2, title: 'Terminal Beats', artist: 'Lo-fi Studio', duration: '4:12', cover: '🎧', color: 'from-blue-500 to-cyan-500' },
    { id: 3, title: 'Debug Session', artist: 'Code Rhythms', duration: '3:45', cover: '💻', color: 'from-green-500 to-emerald-500' },
    { id: 4, title: 'Release Day', artist: 'The Developers', duration: '5:03', cover: '🚀', color: 'from-orange-500 to-red-500' },
    { id: 5, title: '404 Groove', artist: 'API Beats', duration: '3:30', cover: '🎸', color: 'from-yellow-500 to-amber-500' },
];

export default function MusicApp() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [likedSongs, setLikedSongs] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const showTemporaryMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
    };

    const handlePlayPause = () => {
        if (!currentSong) {
            setCurrentSong(demoPlaylist[0]);
            showTemporaryMessage('🎵 Demo Mode: Playing preview track');
        }
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            showTemporaryMessage(`▶️ Playing: ${currentSong?.title || demoPlaylist[0].title}`);
        } else {
            showTemporaryMessage('⏸️ Paused');
        }
    };

    const handleLike = (songId) => {
        if (likedSongs.includes(songId)) {
            setLikedSongs(likedSongs.filter(id => id !== songId));
            showTemporaryMessage('💔 Removed from favorites');
        } else {
            setLikedSongs([...likedSongs, songId]);
            showTemporaryMessage('❤️ Added to favorites');
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        showTemporaryMessage(`🔊 Volume: ${newVolume}%`);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        showTemporaryMessage(isMuted ? '🔊 Unmuted' : '🔇 Muted');
    };

    const selectSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
        showTemporaryMessage(`🎵 Now playing: ${song.title}`);
    };

    return (
        <div className="h-full w-full bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-y-auto">
            {/* Toast Message */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-full text-sm z-50 border border-purple-500/50"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 border-b border-purple-500/30">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl shadow-lg animate-pulse">
                        🎵
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-purple-400">Music Player</h1>
                        <p className="text-sm text-gray-400">Demo Mode • ${demoPlaylist.length} demo tracks available</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Now Playing Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 mb-6"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Album Art */}
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-5xl shadow-xl"
                        >
                            {currentSong?.cover || '🎵'}
                        </motion.div>

                        {/* Song Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white mb-1">{currentSong?.title || 'No song selected'}</h2>
                            <p className="text-gray-400 mb-4">{currentSong?.artist || 'Select a track from playlist'}</p>

                            {/* Progress Bar */}
                            <div className="max-w-md">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>0:00</span>
                                    <span>{currentSong?.duration || '3:30'}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1 cursor-pointer">
                                    <div className="w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Music Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-4 mb-6"
                >
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <button className="text-gray-400 hover:text-purple-400 transition">
                            <FiShuffle size={20} />
                        </button>
                        <button className="text-gray-400 hover:text-purple-400 transition">
                            <FiSkipBack size={24} />
                        </button>
                        <button
                            onClick={handlePlayPause}
                            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg"
                        >
                            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                        </button>
                        <button className="text-gray-400 hover:text-purple-400 transition">
                            <FiSkipForward size={24} />
                        </button>
                        <button className="text-gray-400 hover:text-purple-400 transition">
                            <FiRepeat size={20} />
                        </button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center justify-center gap-3">
                        <button onClick={toggleMute} className="text-gray-400 hover:text-purple-400">
                            {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <span className="text-xs text-gray-500">{isMuted ? 0 : volume}%</span>
                    </div>
                </motion.div>

                {/* Playlist */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-purple-400 flex items-center gap-2">
                            <FiList /> Playlist • Demo Mode
                        </h3>
                        <span className="text-xs text-gray-500">{demoPlaylist.length} tracks</span>
                    </div>

                    <div className="space-y-2">
                        {demoPlaylist.map(song => (
                            <div
                                key={song.id}
                                onClick={() => selectSong(song)}
                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${currentSong?.id === song.id
                                        ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 shadow-lg'
                                        : 'hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className={`text-2xl ${currentSong?.id === song.id ? 'animate-bounce' : ''}`}>
                                        {song.cover}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-medium">{song.title}</p>
                                        <p className="text-gray-500 text-xs">{song.artist}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-xs">{song.duration}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLike(song.id);
                                        }}
                                        className={`transition ${likedSongs.includes(song.id) ? 'text-pink-500' : 'text-gray-500 hover:text-pink-400'}`}
                                    >
                                        <FiHeart size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Info Note */}
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-xs text-yellow-400 text-center">
                        🎧 Demo Mode • No actual audio files • This is a UI demo of the music player interface
                    </p>
                </div>
            </div>
        </div>
    );
}