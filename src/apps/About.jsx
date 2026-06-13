import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';

export default function AboutApp() {
    return (
        <div className="p-6 text-white">
            <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl mb-3">
                    👨‍💻
                </div>
                <h1 className="text-3xl font-bold text-cyan-400">Uttam Maji</h1>
                <p className="text-gray-300 mt-1">Backend Developer | DevOps Enthusiast | AI/ML Learner</p>
            </div>

            <div className="space-y-4">
                <div className="glass-panel p-4">
                    <h2 className="text-xl font-semibold text-cyan-400 mb-2">About Me</h2>
                    <p className="text-gray-300 leading-relaxed">
                        I build scalable applications, APIs, cloud solutions and automation systems.
                        Passionate about creating efficient, modern web experiences with cutting-edge technology.
                        With 4+ years of experience in full-stack development, I specialize in backend
                        architecture and DevOps practices.
                    </p>
                </div>

                <div className="glass-panel p-4">
                    <h2 className="text-xl font-semibold text-cyan-400 mb-2">Quick Info</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiMapPin className="text-red-400" />
                            <span>Bangalore, India</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiMail className="text-blue-400" />
                            <span>uttam@portfolio-os.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiGithub className="text-gray-400" />
                            <span>github.com/uttam-maji</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiLinkedin className="text-blue-400" />
                            <span>linkedin.com/in/uttam-maji</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}