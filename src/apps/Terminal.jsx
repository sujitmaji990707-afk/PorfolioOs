import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '../store/osStore';
import { commandHandler } from '../utils/commandEngine';

export default function TerminalApp() {
    const { terminalHistory, addTerminalOutput, clearTerminal } = useOSStore();
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (terminalHistory.length === 0) {
            addTerminalOutput('╔══════════════════════════════════════════════════════════╗');
            addTerminalOutput('║           PORTFOLIO OS TERMINAL v2.0                     ║');
            addTerminalOutput('╚══════════════════════════════════════════════════════════╝');
            addTerminalOutput('');
            addTerminalOutput('💡 Type "help" to see all available commands');
            addTerminalOutput('🎯 Try "sudo show skills" to view my tech stack');
            addTerminalOutput('🚀 "open github" to launch GitHub client');
            addTerminalOutput('');
            addTerminalOutput('uttam@portfolio-os:~$ ');
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [terminalHistory]);

    const handleCommand = async (cmd) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        setCommandHistory(prev => [...prev, trimmed]);
        setHistoryIndex(-1);

        addTerminalOutput(`┌─[uttam@portfolio-os]─[~]`);
        addTerminalOutput(`└──╼ $ ${trimmed}`);

        if (trimmed === 'clear') {
            clearTerminal();
            addTerminalOutput('uttam@portfolio-os:~$ ');
            return;
        }

        const output = await commandHandler(trimmed);
        if (output) {
            output.split('\n').forEach(line => addTerminalOutput(line));
        }
        addTerminalOutput('');
        addTerminalOutput('uttam@portfolio-os:~$ ');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <div className="h-full w-full bg-black/95 text-green-400 font-mono flex flex-col" onClick={() => inputRef.current?.focus()}>
            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 px-3 py-2 border-b border-green-500/30">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Terminal</span>
                    <span className="text-xs text-gray-500">— zsh</span>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-1 text-sm">
                {terminalHistory.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words font-mono">
                        {line}
                    </div>
                ))}

                <div className="flex items-center mt-2">
                    <span className="text-green-400">└──╼ $&nbsp;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none text-green-400 font-mono text-sm"
                        autoFocus
                        spellCheck={false}
                    />
                    <span className="animate-blink text-green-400">█</span>
                </div>
            </div>

            <div className="bg-black/50 px-3 py-1 border-t border-green-500/30 text-xs text-gray-400 flex justify-between">
                <span>📟 bash</span>
                <span>🖥️ 80x24</span>
                <span>⚡ Ready</span>
            </div>
        </div>
    );
}