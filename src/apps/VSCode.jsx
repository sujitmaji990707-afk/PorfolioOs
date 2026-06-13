// src/apps/VSCode.jsx
import React, { useState } from 'react';
import { FiCode, FiFolder, FiSearch, FiGitBranch, FiTool, FiTerminal, FiSave, FiPlus, FiX, FiFile, FiFolderPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function VSCodeApp() {
    const [files, setFiles] = useState([
        { id: 1, name: 'App.jsx', content: `import React from 'react';\nimport './App.css';\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;`, language: 'javascript', active: true },
        { id: 2, name: 'README.md', content: `# Portfolio OS\n\nA futuristic portfolio operating system built with React, Vite, and Tailwind CSS.`, language: 'markdown', active: false },
        { id: 3, name: 'styles.css', content: `.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.button {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border: none;\n  border-radius: 8px;\n  padding: 10px 20px;\n  color: white;\n  cursor: pointer;\n}`, language: 'css', active: false },
    ]);

    const [currentFile, setCurrentFile] = useState(files[0]);
    const [content, setContent] = useState(files[0].content);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const showTemporaryMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
    };

    const handleFileSelect = (file) => {
        setCurrentFile(file);
        setContent(file.content);
        setFiles(files.map(f => ({ ...f, active: f.id === file.id })));
        showTemporaryMessage(`📁 Opened: ${file.name}`);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        // Auto-save simulation
        setFiles(files.map(f =>
            f.id === currentFile.id ? { ...f, content: e.target.value } : f
        ));
    };

    const handleSave = () => {
        showTemporaryMessage(`💾 Saved: ${currentFile.name}`);
    };

    const createNewFile = () => {
        const newFileName = prompt('Enter file name:', 'newfile.js');
        if (newFileName) {
            const newFile = {
                id: Date.now(),
                name: newFileName,
                content: '// New file created\nconsole.log("Hello World");',
                language: 'javascript',
                active: false
            };
            setFiles([...files, newFile]);
            showTemporaryMessage(`📄 Created: ${newFileName}`);
        }
    };

    return (
        <div className="h-full w-full bg-[#1e1e2e] flex flex-col">
            {/* Toast Message */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#252535] text-white px-4 py-2 rounded-md text-sm z-50 border border-blue-500/50"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* VS Code Header */}
            <div className="bg-[#252535] border-b border-[#3b82f6]/30 px-3 py-2">
                <div className="flex items-center gap-4">
                    <FiCode className="text-blue-400" />
                    <div className="flex gap-4 text-sm">
                        <span className="text-white">File</span>
                        <span className="text-gray-400">Edit</span>
                        <span className="text-gray-400">Selection</span>
                        <span className="text-gray-400">View</span>
                        <span className="text-gray-400">Go</span>
                        <span className="text-gray-400">Run</span>
                        <span className="text-gray-400">Terminal</span>
                        <span className="text-gray-400">Help</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className={`${sidebarOpen ? 'w-12' : 'w-0'} bg-[#252535] border-r border-[#3b82f6]/30 flex flex-col items-center py-3 gap-4 transition-all duration-300 overflow-hidden`}>
                    <FiFolder className="text-blue-400 text-xl cursor-pointer hover:text-blue-300" />
                    <FiSearch className="text-gray-500 text-xl cursor-pointer hover:text-gray-400" />
                    <FiGitBranch className="text-gray-500 text-xl cursor-pointer hover:text-gray-400" />
                    <FiTerminal className="text-gray-500 text-xl cursor-pointer hover:text-gray-400" onClick={() => setTerminalOpen(!terminalOpen)} />
                </div>

                {/* File Explorer */}
                <div className="w-64 bg-[#252535] border-r border-[#3b82f6]/30 flex flex-col overflow-y-auto">
                    <div className="p-3 border-b border-[#3b82f6]/30 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-semibold">EXPLORER</span>
                        <div className="flex gap-2">
                            <button onClick={createNewFile} className="text-gray-400 hover:text-white">
                                <FiFile size={12} />
                            </button>
                            <button className="text-gray-400 hover:text-white">
                                <FiFolderPlus size={12} />
                            </button>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="text-yellow-400 text-xs mb-2">📁 PORTFOLIO-OS</div>
                        <div className="space-y-1 ml-2">
                            {files.map(file => (
                                <div
                                    key={file.id}
                                    onClick={() => handleFileSelect(file)}
                                    className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm transition ${currentFile.id === file.id ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:bg-white/10'}`}
                                >
                                    <FiFile size={12} />
                                    <span className="flex-1">{file.name}</span>
                                    {currentFile.id === file.id && <div className="w-1 h-1 bg-blue-400 rounded-full"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Tabs */}
                    <div className="bg-[#252535] border-b border-[#3b82f6]/30 flex overflow-x-auto">
                        {files.map(file => (
                            <div
                                key={file.id}
                                onClick={() => handleFileSelect(file)}
                                className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-r border-[#3b82f6]/30 ${currentFile.id === file.id ? 'bg-[#1e1e2e] text-blue-400 border-t-2 border-t-blue-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                <FiFile size={12} />
                                <span>{file.name}</span>
                                <FiX size={12} className="opacity-0 hover:opacity-100" />
                            </div>
                        ))}
                        <button className="px-3 py-2 text-gray-400 hover:text-white">
                            <FiPlus size={14} />
                        </button>
                    </div>

                    {/* Editor Content */}
                    <div className="flex-1 overflow-auto">
                        <textarea
                            value={content}
                            onChange={handleContentChange}
                            className="w-full h-full bg-[#1e1e2e] text-gray-300 font-mono text-sm p-4 outline-none resize-none"
                            spellCheck={false}
                            style={{ fontFamily: 'monospace' }}
                        />
                    </div>

                    {/* Status Bar */}
                    <div className="bg-[#252535] border-t border-[#3b82f6]/30 px-3 py-1 text-xs text-gray-400 flex justify-between">
                        <div className="flex gap-4">
                            <span>✨ {currentFile.name}</span>
                            <span>{currentFile.language.toUpperCase()}</span>
                            <span>Ln {content.split('\n').length}, Col 1</span>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={handleSave} className="hover:text-white flex items-center gap-1">
                                <FiSave size={12} /> Save
                            </button>
                            <span>UTF-8</span>
                        </div>
                    </div>

                    {/* Terminal Panel */}
                    <AnimatePresence>
                        {terminalOpen && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 200 }}
                                exit={{ height: 0 }}
                                className="bg-black/90 border-t border-[#3b82f6]/30 overflow-hidden"
                            >
                                <div className="p-2 border-b border-[#3b82f6]/30 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">TERMINAL</span>
                                    <button onClick={() => setTerminalOpen(false)} className="text-gray-400 hover:text-white">
                                        <FiX size={12} />
                                    </button>
                                </div>
                                <div className="p-3 font-mono text-xs text-green-400">
                                    <div>$ node --version</div>
                                    <div>v18.17.0</div>
                                    <div>$ npm start</div>
                                    <div className="text-yellow-400">🚀 Portfolio OS running on port 3000</div>
                                    <div className="text-gray-400">$ _</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};