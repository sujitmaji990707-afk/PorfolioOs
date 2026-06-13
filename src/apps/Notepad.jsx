// src/apps/Notepad.jsx
import React, { useState, useEffect } from 'react';
import { FiSave, FiTrash2, FiCopy, FiPrinter, FiFileText, FiPlus, FiFolder, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotepadApp() {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('portfolio-os-notes');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Welcome Note', content: 'Welcome to Portfolio OS Notepad!\n\nYou can write anything here.\n\nFeatures:\n• Auto-save\n• Multiple notes\n• Dark theme\n• Easy to use', date: new Date().toLocaleString() },
            { id: 2, title: 'Todo List', content: '✓ Complete Portfolio OS\n✓ Add more features\n✓ Deploy to production\n✓ Share with community', date: new Date().toLocaleString() },
            { id: 3, title: 'Ideas', content: '• Add AI features\n• Improve terminal commands\n• Add more animations\n• Create mobile version', date: new Date().toLocaleString() },
        ];
    });

    const [currentNote, setCurrentNote] = useState(notes[0]);
    const [content, setContent] = useState(notes[0]?.content || '');
    const [title, setTitle] = useState(notes[0]?.title || 'Untitled');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem('portfolio-os-notes', JSON.stringify(notes));
    }, [notes]);

    const showTemporaryMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
    };

    const handleNewNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'Untitled',
            content: '',
            date: new Date().toLocaleString()
        };
        setNotes([newNote, ...notes]);
        setCurrentNote(newNote);
        setTitle('Untitled');
        setContent('');
        showTemporaryMessage('📝 New note created');
    };

    const handleSaveNote = () => {
        const updatedNotes = notes.map(note =>
            note.id === currentNote.id
                ? { ...note, title, content, date: new Date().toLocaleString() }
                : note
        );
        setNotes(updatedNotes);
        setCurrentNote({ ...currentNote, title, content, date: new Date().toLocaleString() });
        showTemporaryMessage('💾 Note saved');
    };

    const handleDeleteNote = (id) => {
        if (notes.length === 1) {
            showTemporaryMessage('⚠️ Cannot delete last note');
            return;
        }
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
        setCurrentNote(filteredNotes[0]);
        setTitle(filteredNotes[0].title);
        setContent(filteredNotes[0].content);
        showTemporaryMessage('🗑️ Note deleted');
    };

    const handleSelectNote = (note) => {
        setCurrentNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleCopyNote = () => {
        navigator.clipboard.writeText(content);
        showTemporaryMessage('📋 Copied to clipboard');
    };

    const handleExportNote = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        showTemporaryMessage('📥 Note exported');
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black flex">
            {/* Toast Message */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-full text-sm z-50 border border-yellow-500/50"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div className="w-72 bg-black/50 border-r border-yellow-500/30 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-yellow-500/30">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <FiFileText className="text-yellow-400" />
                            <span className="text-white font-semibold">Notes</span>
                        </div>
                        <button
                            onClick={handleNewNote}
                            className="p-1.5 bg-yellow-500/20 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition"
                        >
                            <FiPlus size={16} />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/50 border border-yellow-500/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                    />
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {filteredNotes.map(note => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => handleSelectNote(note)}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${currentNote?.id === note.id
                                    ? 'bg-yellow-500/20 border border-yellow-500/50'
                                    : 'hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-white text-sm font-medium truncate flex-1">{note.title}</h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteNote(note.id);
                                    }}
                                    className="text-gray-500 hover:text-red-400 transition"
                                >
                                    <FiTrash2 size={12} />
                                </button>
                            </div>
                            <p className="text-gray-500 text-xs truncate">{note.content.substring(0, 50)}</p>
                            <p className="text-gray-600 text-xs mt-1">{note.date}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-3 border-t border-yellow-500/30 text-xs text-gray-500">
                    {notes.length} notes • Auto-save enabled
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col">
                {/* Editor Toolbar */}
                <div className="bg-black/30 border-b border-yellow-500/30 p-3 flex items-center justify-between flex-wrap gap-3">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleSaveNote}
                        className="bg-transparent text-white text-xl font-semibold outline-none border-b border-transparent focus:border-yellow-400 px-2 py-1"
                        placeholder="Note title"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveNote}
                            className="px-3 py-1.5 bg-yellow-500/20 rounded-lg text-yellow-400 text-sm flex items-center gap-2 hover:bg-yellow-500/30 transition"
                        >
                            <FiSave size={14} /> Save
                        </button>
                        <button
                            onClick={handleCopyNote}
                            className="px-3 py-1.5 bg-gray-700/50 rounded-lg text-gray-300 text-sm flex items-center gap-2 hover:bg-gray-700 transition"
                        >
                            <FiCopy size={14} /> Copy
                        </button>
                        <button
                            onClick={handleExportNote}
                            className="px-3 py-1.5 bg-gray-700/50 rounded-lg text-gray-300 text-sm flex items-center gap-2 hover:bg-gray-700 transition"
                        >
                            <FiDownload size={14} /> Export
                        </button>
                    </div>
                </div>

                {/* Editor Content */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={handleSaveNote}
                    className="flex-1 bg-transparent text-gray-300 font-mono text-sm p-6 outline-none resize-none"
                    placeholder="Start writing your note here..."
                    spellCheck="false"
                    style={{ fontFamily: 'monospace' }}
                />

                {/* Editor Footer */}
                <div className="bg-black/30 border-t border-yellow-500/30 p-2 text-xs text-gray-500 flex justify-between">
                    <span>{content.split('\n').length} lines • {content.length} characters</span>
                    <span>Last saved: {currentNote?.date || 'Never'}</span>
                </div>
            </div>
        </div>
    );
}