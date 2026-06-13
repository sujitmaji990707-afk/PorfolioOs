
import { create } from 'zustand';

export const useOSStore = create((set, get) => ({
    booted: false,
    setBooted: (val) => set({ booted: val }),

    windows: [],
    nextZIndex: 10,
    addWindow: (winConfig) => set((state) => {
        const newZ = state.nextZIndex + 1;
        return {
            windows: [...state.windows, {
                ...winConfig,
                id: winConfig.id || Date.now() + Math.random(),
                zIndex: newZ,
                minimized: false,
                componentName: winConfig.componentName // Store name instead of component
            }],
            nextZIndex: newZ,
        };
    }),
    removeWindow: (id) => set((state) => ({
        windows: state.windows.filter(w => w.id !== id)
    })),
    focusWindow: (id) => set((state) => {
        const newZ = state.nextZIndex + 1;
        return {
            windows: state.windows.map(w => w.id === id ? { ...w, zIndex: newZ } : w),
            nextZIndex: newZ,
        };
    }),
    minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w)
    })),

    terminalHistory: [],
    addTerminalOutput: (text) => set((state) => ({
        terminalHistory: [...state.terminalHistory, text]
    })),
    clearTerminal: () => set({ terminalHistory: [] }),

    notifications: [],
    addNotification: (title, message, type = 'info') => {
        const id = Date.now();
        set((state) => ({
            notifications: [...state.notifications, { id, title, message, type }]
        }));
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter(n => n.id !== id)
            }));
        }, 4000);
    },

    mousePosition: { x: 0, y: 0 },
    setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
}));
