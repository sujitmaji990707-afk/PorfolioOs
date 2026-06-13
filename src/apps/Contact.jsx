import React, { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiPhone, FiTwitter } from 'react-icons/fi';
import { useOSStore } from '../store/osStore';

export default function ContactApp() {
    const { addNotification } = useOSStore();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addNotification('Message Sent!', 'Thanks for reaching out! I\'ll respond within 24 hours.', 'success');
        setFormData({ name: '', email: '', message: '' });
    };

    const contactMethods = [
        { icon: FiMail, label: 'Email', value: 'uttam@portfolio-os.com', color: 'text-blue-400' },
        { icon: FiGithub, label: 'GitHub', value: 'github.com/uttam-maji', color: 'text-gray-400' },
        { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/uttam-maji', color: 'text-blue-400' },
        { icon: FiTwitter, label: 'Twitter', value: '@UttamMaji', color: 'text-sky-400' },
        { icon: FiMapPin, label: 'Location', value: 'Bangalore, India', color: 'text-red-400' },
        { icon: FiPhone, label: 'Phone', value: '+91 98765 43210', color: 'text-green-400' },
    ];

    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <FiMail /> Contact
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-cyan-400">Get in Touch</h3>
                    <div className="space-y-3">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition">
                                <method.icon className={`${method.color} text-xl`} />
                                <div>
                                    <p className="text-xs text-gray-400">{method.label}</p>
                                    <p className="text-sm font-mono">{method.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                        <p className="text-sm text-green-400">💡 Response Time</p>
                        <p className="text-xs text-gray-300">Usually within 24 hours. For urgent matters, please mention "URGENT" in subject.</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-black/50 border border-blue-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full bg-black/50 border border-blue-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            className="w-full bg-black/50 border border-blue-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition resize-none"
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition"
                        >
                            <FiSend /> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}