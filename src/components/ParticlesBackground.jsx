import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                particles: {
                    color: { value: ["#3b82f6", "#a855f7", "#06b6d4", "#f97316"] },
                    links: {
                        color: "#00ccff",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 0.5,
                        direction: "none",
                        random: true,
                        outModes: "out"
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 60
                    },
                    opacity: { value: 0.3 },
                    size: { value: { min: 1, max: 2 } },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 pointer-events-none -z-10"
        />
    );
}