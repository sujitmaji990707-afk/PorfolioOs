
import React, { lazy, Suspense, useEffect } from 'react';
import Wallpaper from './Wallpaper';
import Dock from './Dock';
import Window from './Window';
import ParticlesBackground from './ParticlesBackground';
import GraphBackground from './GraphBackground';
import { useOSStore } from '../store/osStore';
import { AnimatePresence } from 'framer-motion';

// Lazy load components to avoid hook issues
const TerminalApp = lazy(() => import('../apps/Terminal'));
const GitHubApp = lazy(() => import('../apps/GitHub'));
const PostmanApp = lazy(() => import('../apps/Postman'));
const VSCodeApp = lazy(() => import('../apps/VSCode'));
const BrowserApp = lazy(() => import('../apps/Browser'));
const MonitorApp = lazy(() => import('../apps/Monitor'));
const PhotosApp = lazy(() => import('../apps/Photos'));
const MusicApp = lazy(() => import('../apps/Music'));
const SettingsApp = lazy(() => import('../apps/Settings'));
const ContactApp = lazy(() => import('../apps/Contact'));
const AboutApp = lazy(() => import('../apps/About'));
const ExplorerApp = lazy(() => import('../apps/Explorer'));
const NotepadApp = lazy(() => import('../apps/Notepad'));

// Component registry
const componentRegistry = {
    'Terminal': TerminalApp,
    'GitHub': GitHubApp,
    'Postman': PostmanApp,
    'VSCode': VSCodeApp,
    'Browser': BrowserApp,
    'Monitor': MonitorApp,
    'Photos': PhotosApp,
    'Music': MusicApp,
    'Settings': SettingsApp,
    'Contact': ContactApp,
    'About': AboutApp,
    'Explorer': ExplorerApp,
    'Notepad': NotepadApp,
};

function WindowContent({ componentName, onClose }) {
    const Component = componentRegistry[componentName];
    if (!Component) {
        return <div className="text-white p-4">Component not found: {componentName}</div>;
    }

    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-400">Loading {componentName}...</p>
                </div>
            </div>
        }>
            <Component />
        </Suspense>
    );
}

export default function Desktop() {
    const { windows, removeWindow, setMousePosition } = useOSStore();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition(e.clientX, e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [setMousePosition]);

    return (
        <div className="h-screen w-screen relative overflow-hidden">
            <Wallpaper />
            <GraphBackground />
            <ParticlesBackground />

            <AnimatePresence>
                {windows.map(win => (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        initialX={win.x || 100}
                        initialY={win.y || 100}
                        width={win.width || 950}
                        height={win.height || 650}
                        onClose={removeWindow}
                    >
                        <WindowContent componentName={win.componentName} />
                    </Window>
                ))}
            </AnimatePresence>

            <Dock />
        </div>
    );
}
