import React, { useState, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import { useOSStore } from './store/osStore';

function App() {
    const { booted, setBooted } = useOSStore();
    const [showBoot, setShowBoot] = useState(true);

    useEffect(() => {
        if (booted) {
            setTimeout(() => setShowBoot(false), 500);
        }
    }, [booted]);

    if (showBoot && !booted) {
        return <BootScreen onComplete={() => setBooted(true)} />;
    }

    return <Desktop />;
}

export default App;