// src/apps/Photos.jsx
import React, { useState } from 'react';
import { FiImage, FiGrid, FiList, FiHeart, FiShare2, FiTrash2, FiUpload, FiFolder } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Demo photo data - no actual images, just placeholders
const demoPhotos = [
    { id: 1, title: 'Project Screenshot', date: '2024-01-15', size: '2.4 MB', icon: '🖼️', color: 'from-blue-500/20 to-blue-600/20' },
    { id: 2, title: 'Portfolio Preview', date: '2024-01-20', size: '1.8 MB', icon: '📸', color: 'from-purple-500/20 to-purple-600/20' },
    { id: 3, title: 'Dashboard UI Mockup', date: '2024-02-01', size: '3.1 MB', icon: '🎨', color: 'from-green-500/20 to-green-600/20' },
    { id: 4, title: 'Mobile App Design', date: '2024-02-10', size: '2.2 MB', icon: '📱', color: 'from-yellow-500/20 to-yellow-600/20' },
    { id: 5, title: 'Terminal Interface', date: '2024-02-15', size: '1.5 MB', icon: '💻', color: 'from-red-500/20 to-red-600/20' },
    { id: 6, title: 'Graph Visualization', date: '2024-02-20', size: '4.2 MB', icon: '📊', color: 'from-pink-500/20 to-pink-600/20' },
    { id: 7, title: 'Code Editor Screenshot', date: '2024-02-25', size: '2.9 MB', icon: '⌨️', color: 'from-indigo-500/20 to-indigo-600/20' },
    { id: 8, title: 'API Testing Interface', date: '2024-03-01', size: '3.4 MB', icon: '🔧', color: 'from-orange-500/20 to-orange-600/20' },
];

export default function PhotosApp() {
    const [view, setView] = useState('grid');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [likedPhotos, setLikedPhotos] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const showTemporaryMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
    };

    const handleLike = (photoId, e) => {
        e.stopPropagation();
        if (likedPhotos.includes(photoId)) {
            setLikedPhotos(likedPhotos.filter(id => id !== photoId));
            showTemporaryMessage('💔 Removed from favorites');
        } else {
            setLikedPhotos([...likedPhotos, photoId]);
            showTemporaryMessage('❤️ Added to favorites');
        }
    };

    const handleDelete = (photoId, e) => {
        e.stopPropagation();
        showTemporaryMessage('🗑️ Demo mode: Delete disabled');
    };

    const handleUpload = () => {
        showTemporaryMessage('📤 Upload feature coming soon!');
    };

    const openPhotoViewer = (photo) => {
        setSelectedPhoto(photo);
        showTemporaryMessage(`🔍 Viewing: ${photo.title}`);
    };

    const closePhotoViewer = () => {
        setSelectedPhoto(null);
    };

    return (
        <div className="h-full w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-y-auto">
            {/* Toast Message */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-full text-sm z-50 border border-pink-500/50"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-6 border-b border-pink-500/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                            📸
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-pink-400">Photos Gallery</h1>
                            <p className="text-sm text-gray-400">{demoPhotos.length} demo photos • No actual images</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleUpload}
                            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white text-sm flex items-center gap-2 hover:shadow-lg transition"
                        >
                            <FiUpload /> Upload
                        </button>
                        <div className="flex gap-2 bg-black/30 rounded-lg p-1">
                            <button
                                onClick={() => setView('grid')}
                                className={`p-2 rounded transition ${view === 'grid' ? 'bg-pink-500/20 text-pink-400' : 'text-gray-500'}`}
                            >
                                <FiGrid />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`p-2 rounded transition ${view === 'list' ? 'bg-pink-500/20 text-pink-400' : 'text-gray-500'}`}
                            >
                                <FiList />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo Grid/List */}
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-cyan-400 font-semibold flex items-center gap-2">
                        <FiFolder /> All Photos
                    </h3>
                    <span className="text-xs text-gray-500">{likedPhotos.length} favorites</span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`grid ${view === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'grid-cols-1 gap-3'}`}
                >
                    {demoPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => openPhotoViewer(photo)}
                            className={`bg-gradient-to-br ${photo.color} rounded-xl border border-pink-500/30 hover:border-pink-500/60 transition-all cursor-pointer group overflow-hidden`}
                        >
                            {view === 'grid' ? (
                                // Grid View
                                <div className="relative">
                                    <div className="aspect-square flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                                        {photo.icon}
                                    </div>
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                        <button
                                            onClick={(e) => handleLike(photo.id, e)}
                                            className={`p-1.5 rounded-full backdrop-blur-sm ${likedPhotos.includes(photo.id) ? 'bg-pink-500/80' : 'bg-black/50'} hover:scale-110 transition`}
                                        >
                                            <FiHeart size={12} className={likedPhotos.includes(photo.id) ? 'text-white' : 'text-pink-400'} />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(photo.id, e)}
                                            className="p-1.5 rounded-full bg-black/50 hover:bg-red-500/80 transition"
                                        >
                                            <FiTrash2 size={12} className="text-gray-400" />
                                        </button>
                                    </div>
                                    <div className="p-3 bg-black/50 backdrop-blur-sm">
                                        <p className="text-white text-sm font-medium truncate">{photo.title}</p>
                                        <p className="text-gray-400 text-xs">{photo.date}</p>
                                    </div>
                                </div>
                            ) : (
                                // List View
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl">{photo.icon}</div>
                                        <div>
                                            <p className="text-white font-medium">{photo.title}</p>
                                            <p className="text-gray-400 text-xs">{photo.date} • {photo.size}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => handleLike(photo.id, e)}
                                            className={`p-2 rounded-lg transition ${likedPhotos.includes(photo.id) ? 'text-pink-500' : 'text-gray-500 hover:text-pink-400'}`}
                                        >
                                            <FiHeart />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(photo.id, e)}
                                            className="p-2 rounded-lg text-gray-500 hover:text-red-400 transition"
                                        >
                                            <FiTrash2 />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                showTemporaryMessage('📤 Share feature coming soon');
                                            }}
                                            className="p-2 rounded-lg text-gray-500 hover:text-blue-400 transition"
                                        >
                                            <FiShare2 />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State Message */}
                <div className="mt-8 glass-panel p-6 text-center">
                    <div className="text-5xl mb-3">📷</div>
                    <p className="text-gray-400 text-sm">
                        This is a demo gallery with placeholder images.<br />
                        Actual screenshots and photos will be added in the full version.
                    </p>
                    <div className="mt-3 h-1 w-32 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Photo Viewer Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={closePhotoViewer}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel max-w-2xl w-full p-6 text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-8xl mb-4">{selectedPhoto.icon}</div>
                            <h2 className="text-2xl font-bold text-white mb-2">{selectedPhoto.title}</h2>
                            <p className="text-gray-400 mb-4">{selectedPhoto.date} • {selectedPhoto.size}</p>
                            <div className="flex gap-3 justify-center">
                                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white text-sm">
                                    Download
                                </button>
                                <button
                                    onClick={closePhotoViewer}
                                    className="px-4 py-2 bg-gray-700 rounded-lg text-white text-sm"
                                >
                                    Close
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">📸 Demo preview - No actual image file</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}