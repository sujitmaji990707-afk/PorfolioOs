import React from 'react';
import { FiStar, FiGitBranch, FiCode, FiGithub } from 'react-icons/fi';

const repos = [
    { name: 'PortfolioOS', stars: 342, forks: 56, language: 'React' },
    { name: 'EventBookingSystem', stars: 128, forks: 34, language: 'TypeScript' },
    { name: 'AI-Assistant', stars: 456, forks: 78, language: 'Python' },
    { name: 'HospitalManagementSystem', stars: 89, forks: 23, language: 'Django' },
];

export default function GitHubApp() {
    return (
        <div className="p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
                <FiGithub className="text-4xl text-purple-400" />
                <div>
                    <h2 className="text-2xl font-bold">Uttam Maji</h2>
                    <p className="text-sm text-gray-400">@uttam-maji</p>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-cyan-400 font-semibold">Popular Repositories</h3>
                {repos.map(repo => (
                    <div key={repo.name} className="p-3 bg-black/30 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-cyan-300">📦 {repo.name}</span>
                            <div className="flex gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><FiStar /> {repo.stars}</span>
                                <span className="flex items-center gap-1"><FiGitBranch /> {repo.forks}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 bg-blue-500/20 rounded">{repo.language}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}