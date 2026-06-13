import { useOSStore } from '../store/osStore';

const commandDescriptions = {
    'help': 'Show all available commands',
    'ls': 'List files and directories',
    'pwd': 'Show current directory',
    'clear': 'Clear terminal screen',
    'whoami': 'Display user info',
    'cat about.txt': 'Show about information',
    'neofetch': 'Display system info',
    'date': 'Show current date/time',
    'sudo show skills': 'Display complete skills tree',
    'sudo show projects': 'List all projects',
    'open github': 'Launch GitHub app',
    'open postman': 'Launch Postman app',
    'open vscode': 'Launch VS Code editor',
    'open browser': 'Launch web browser',
    'open monitor': 'Open Activity Monitor',
    'open photos': 'Open Photos gallery',
    'open contact': 'Open Contact info',
    'matrix': 'Matrix rain effect',
    'coffee': 'Brew coffee ☕'
};

export const commandHandler = async (cmd) => {
    const lower = cmd.toLowerCase().trim();

    if (lower === 'help') {
        let help = '\n╔══════════════════════════════════════════════════════════╗\n';
        help += '║              AVAILABLE COMMANDS                          ║\n';
        help += '╠══════════════════════════════════════════════════════════╣\n';
        for (const [command, desc] of Object.entries(commandDescriptions)) {
            help += `║  ${command.padEnd(25)} → ${desc.padEnd(35)}║\n`;
        }
        help += '╚══════════════════════════════════════════════════════════╝\n';
        return help;
    }

    if (lower === 'ls') {
        return '📁 Projects/  📁 Skills/  📁 Experience/  📁 Certificates/\n📁 Photos/  📄 About.txt  📁 GitHub/  💻 Terminal/';
    }

    if (lower === 'pwd') return '/home/uttam/portfolio-os';
    if (lower === 'whoami') return 'Uttam Maji - Backend Developer & DevOps Engineer';
    if (lower === 'date') return `📅 ${new Date().toString()}`;

    if (lower === 'cat about.txt') {
        return `\n╔══════════════════════════════════════════════════════════╗
║                    UTTAM MAJI                                ║
╠══════════════════════════════════════════════════════════════╣
║  💻 Backend Developer | DevOps Enthusiast | AI/ML Learner   ║
║  ═══════════════════════════════════════════════════════════║
║                                                              ║
║  🚀 Building scalable applications, APIs, cloud solutions   ║
║  ☁️  and automation systems.                                ║
║                                                              ║
║  📧 Email: uttam@portfolio-os.com                           ║
║  🐙 GitHub: github.com/uttam-maji                           ║
║  💼 LinkedIn: linkedin.com/in/uttam-maji                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝\n`;
    }

    if (lower === 'neofetch') {
        return `
      ./+o+-       uttam@portfolio-os
      yyyyy/ -yyyyy+    OS: Portfolio OS v2.0
      :+oooyyyyyyyo-    Shell: zsh
          /osyyyyyyo    Terminal: Web-Based
    /+++o/+osyyyyy+     CPU: Apple M2
    \\+/:ooyyyyyyo       Memory: 16GB
      .-/+osyyyy+       Skills: Full-Stack
         \\/++yyy+       Uptime: ∞
            +yyy+       
             :+         `;
    }

    if (lower === 'matrix') {
        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        let result = '\n';
        for (let i = 0; i < 15; i++) {
            let line = '';
            for (let j = 0; j < 80; j++) {
                line += chars[Math.floor(Math.random() * chars.length)];
            }
            result += line + '\n';
        }
        return result;
    }

    if (lower === 'coffee') {
        return `☕ Brewing your coffee... Done! Enjoy!
   ░░░░░░░░░░░░░░░
   ░░░░░░░☕░░░░░░░
   ░░░░░░░░░░░░░░░`;
    }

    if (lower.startsWith('sudo ')) {
        const sub = lower.substring(5);
        if (sub === 'show skills') {
            return `\n╔══════════════════════════════════════════════════════════════╗
║                     SKILLS DATABASE                              ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  🎨 FRONTEND                                                     ║
║  ├── HTML5, CSS3, JavaScript (ES6+)                             ║
║  ├──                             ║                          ║
║                                                                  ║
║  ⚙️ BACKEND                                                      ║
║  ├── Node.js, Express.js, REST API Design                                   ║
║                                                                  ║
║  🗄️ DATABASE                                                     ║
║  ├── MongoDB, PostgreSQL, MySQL                                 ║
║  ├── Redis, Firebase, Supabase                                  ║
║  └── Prisma, Mongoose ODM                                       ║
║                                                                  ║
║  🧠 CORE CS                                                      ║
║  ├── DSA (Advanced), OOP, System Design                         ║
║  ├── DBMS, Operating Systems, Computer Networks                 ║
║  └── Cloud Computing, Microservices                             ║
║                                                                  ║                                  ║
║  🛠️ TOOLS & DEVOPS                                               ║
║  ├── Git, GitHub Actions, Docker, Kubernetes                    ║
║  ├── AWS (EC2, S3, Lambda), Vercel, Netlify                     ║
║  ├── Jenkins, Terraform (Learning)                              ║
║  └── VS Code, Postman, MongoDB Compass                          ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝\n`;
        }
        if (sub === 'show projects') {
            return `\n📦 ACTIVE PROJECTS\n\n1. Event Booking System - MERN stack with real-time updates\n2. Hospital Management System - Django + React\n3. Portfolio OS - Desktop-like portfolio environment\n4. Smart Plant Monitor - IoT + FastAPI\n5. AI Assistant - LLM + Voice recognition\n6. Resume Builder - Drag-drop resume creator\n\n⭐ Total Stars: 1,127 | 🍴 Forks: 222\n`;
        }
        return `Permission denied. Try: sudo show skills, sudo show projects`;
    }

    if (lower.startsWith('open ')) {
        const app = lower.substring(5);
        const store = useOSStore.getState();
        const appMap = {
            'github': 'GitHub',
            'postman': 'Postman',
            'vscode': 'VS Code',
            'browser': 'Browser',
            'monitor': 'Monitor',
            'photos': 'Photos',
            'contact': 'Contact'
        };
        if (appMap[app]) {
            return `Opening ${appMap[app]}... (Click the dock icon or wait for window)`;
        }
        return `App not found: ${app}`;
    }

    return `Command not found: ${cmd}\nType 'help' for available commands.`;
};