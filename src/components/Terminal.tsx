import { useEffect, useState, useRef, KeyboardEvent, useCallback } from "react";

interface CommandOutput {
  type: "command" | "output" | "error" | "success" | "info" | "path" | "ascii";
  text: string;
  isTyping?: boolean;
}

interface TerminalProps {
  className?: string;
  username?: string;
  hostname?: string;
}

const ASCII_ART = `
███╗   ███╗ █████╗ ██████╗ ████████╗███████╗██╗     ██╗      ██████╗ ██╗  ██╗ ██╗
████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██║     ██║     ██╔═████╗╚██╗██╔╝███║
██╔████╔██║███████║██████╔╝   ██║   █████╗  ██║     ██║     ██║██╔██║ ╚███╔╝ ╚██║
██║╚██╔╝██║██╔══██║██╔══██╗   ██║   ██╔══╝  ██║     ██║     ████╔╝██║ ██╔██╗  ██║
██║ ╚═╝ ██║██║  ██║██║  ██║   ██║   ███████╗███████╗███████╗╚██████╔╝██╔╝ ██╗ ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═╝
`.trim();

const COMMANDS: Record<string, CommandOutput[]> = {
  help: [
    { type: "info", text: "Available commands:" },
    { type: "output", text: "  neofetch    - Display system info" },
    { type: "output", text: "  skills      - Show my technical skills" },
    { type: "output", text: "  projects    - List my projects" },
    { type: "output", text: "  contact     - How to reach me" },
    { type: "output", text: "  socials     - My social links" },
    { type: "output", text: "  whoami      - About me" },
    { type: "output", text: "  clear       - Clear terminal" },
    { type: "output", text: "  help        - Show this help" },
  ],
  neofetch: [
    { type: "ascii", text: ASCII_ART },
    { type: "success", text: "─────────────────────────────────" },
    { type: "info", text: "OS: Arch Linux x86_64" },
    { type: "info", text: "Host: Martell0x1" },
    { type: "info", text: "Role: Full Stack Developer" },
    { type: "info", text: "Focus: Backend • Embedded • IoT" },
    { type: "info", text: "Location: Alexandria, Egypt 🇪🇬" },
    { type: "info", text: "Languages: Rust, C++, TypeScript, Python" },
    { type: "info", text: "Status: Open to opportunities" },
    {
      type: "success",
      text: "Welcom to Martell0x1's Terminal ! , Type 'help' for commands",
    },
  ],
  skills: [
    { type: "success", text: "Technical Skills:" },
    { type: "info", text: "├── Backend" },
    { type: "output", text: "│   ├── Node.js / Express / NestJS" },
    { type: "output", text: "│   ├── .NET / ASP.NET Core - MVC" },
    { type: "output", text: "│   └── PostgreSQL / MongoDB / MSSQL" },
    { type: "info", text: "├── Embedded & IoT" },
    { type: "output", text: "│   ├── ESP32 / Arduino" },
    { type: "output", text: "│   ├── Bare Metal Programming" },
    { type: "output", text: "│   └── MQTT / BLE protocols" },
    { type: "info", text: "├── Frontend" },
    { type: "output", text: "│   ├── Angular / TypeScript" },
    { type: "output", text: "│   └── HTML | CSS | JS" },
    { type: "info", text: "└── DevOps" },
    { type: "output", text: "    ├── Docker / Linux" },
    { type: "output", text: "    └── AWS / CI/CD" },
  ],
  projects: [
    { type: "success", text: "Featured Projects:" },
    { type: "info", text: "1. Rusty x86-64 OS Kernel" },
    { type: "output", text: "   A bare-metal OS kernel written in Rust" },
    { type: "info", text: "2. VisionGate - IoT Access Control" },
    { type: "output", text: "   Smart Iot Parking system with ESP32" },
    { type: "info", text: "3. LED Controller ESP32" },
    { type: "output", text: "   Smart LED strip controller via BLE" },
    { type: "info", text: "4. Express.js RESTful API" },
    { type: "output", text: "   Production-ready API template" },
    { type: "path", text: "→ Visit #projects section for more!" },
  ],
  contact: [
    { type: "success", text: "Get in touch:" },
    { type: "info", text: "📧 Email: marwan222@@gmail.com" },
    { type: "info", text: "🐙 GitHub: github.com/Martell0x1" },
    { type: "info", text: "💼 LinkedIn: linkedin.com/in/marawan-zein" },
    { type: "path", text: "→ Or use the contact form below!" },
  ],
  socials: [
    { type: "success", text: "Social Links:" },
    { type: "output", text: "GitHub   → https://github.com/Martell0x1" },
    { type: "output", text: "LinkedIn → https://linkedin.com/in/marawan-zein" },
  ],
  whoami: [
    { type: "success", text: "Marwan Mohamed Zein (Martell0x1)" },
    { type: "output", text: "Full Stack Developer from Alexandria, Egypt" },
    {
      type: "output",
      text: "FCDS Student passionate about building robust systems",
    },
    { type: "output", text: "Specializing in Backend, Embedded Systems & IoT" },
    { type: "info", text: "Currently exploring: OS Development with Rust 🦀" },
  ],
};

const Terminal = ({
  className = "",
  username = "visitor",
  hostname = "portfolio",
}: TerminalProps) => {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      type: "success",
      text: "Loading terminal ... Please wait.",
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [typingText, setTypingText] = useState<{[key: number]: string}>({});
  const typingRef = useRef<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, typingText]);

  const typeOutput = useCallback(async (outputs: CommandOutput[], baseHistory: CommandOutput[]) => {
    typingRef.current = true;
    let currentHistory = [...baseHistory];
    
    for (let i = 0; i < outputs.length; i++) {
      const output = outputs[i];
      const historyIndex = currentHistory.length;
      
      // Add empty entry for this line
      currentHistory = [...currentHistory, { ...output, text: "", isTyping: true }];
      setHistory(currentHistory);
      
      // Type each character
      const text = output.text;
      const isAscii = output.type === "ascii";
      const delay = isAscii ? 1 : 15; // Faster for ASCII art
      
      for (let j = 0; j <= text.length; j++) {
        if (!typingRef.current) break;
        setTypingText(prev => ({ ...prev, [historyIndex]: text.slice(0, j) }));
        await new Promise(r => setTimeout(r, delay));
      }
      
      // Finalize this line
      currentHistory = currentHistory.map((item, idx) => 
        idx === historyIndex ? { ...output, isTyping: false } : item
      );
      setHistory(currentHistory);
      setTypingText(prev => {
        const newState = { ...prev };
        delete newState[historyIndex];
        return newState;
      });
      
      await new Promise(r => setTimeout(r, 30));
    }
    
    typingRef.current = false;
  }, []);

  useEffect(() => {
    const runIntro = async () => {
      const cmd = "neofetch";

      // Type command character by character
      for (let i = 1; i <= cmd.length; i++) {
        setInput(cmd.slice(0, i));
        await new Promise((r) => setTimeout(r, 120));
      }

      await new Promise((r) => setTimeout(r, 300));

      // Execute command with typing effect
      const output = COMMANDS[cmd];
      const baseHistory: CommandOutput[] = [
        { type: "success", text: "Loading terminal ... Please wait." },
        { type: "command", text: cmd },
      ];
      setHistory(baseHistory);
      setInput("");
      
      await typeOutput(output, baseHistory);
      setIsTyping(false);
    };

    runIntro();
  }, [typeOutput]);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add command to history display
    const newHistory: CommandOutput[] = [
      ...history,
      { type: "command", text: cmd },
    ];

    if (trimmedCmd === "") {
      setHistory(newHistory);
      return;
    }

    if (trimmedCmd === "clear") {
      setHistory([
        {
          type: "success",
          text: "Terminal cleared. Type 'help' for commands.",
        },
      ]);
      return;
    }

    const output = COMMANDS[trimmedCmd];
    if (output) {
      setHistory(newHistory);
      setIsTyping(true);
      await typeOutput(output, newHistory);
      setIsTyping(false);
    } else {
      const errorOutput = [
        { type: "error" as const, text: `Command not found: ${cmd}` },
        { type: "output" as const, text: "Type 'help' to see available commands." },
      ];
      setHistory(newHistory);
      setIsTyping(true);
      await typeOutput(errorOutput, newHistory);
      setIsTyping(false);
    }

    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((c) =>
        c.startsWith(input.toLowerCase()),
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const getColorClass = (cmd: CommandOutput) => {
    switch (cmd.type) {
      case "command":
        return "text-[hsl(var(--terminal-text))]";
      case "output":
        return "text-muted-foreground";
      case "error":
        return "text-destructive";
      case "success":
        return "text-primary";
      case "info":
        return "text-[hsl(200_80%_60%)]";
      case "path":
        return "text-[hsl(280_80%_70%)]";
      case "ascii":
        return "text-primary text-xs leading-none";
      default:
        return "text-[hsl(var(--terminal-text))]";
    }
  };

  const renderPrompt = (isInput = false) => (
    <span className="flex-shrink-0">
      <span className="text-primary font-bold">{username}</span>
      <span className="text-muted-foreground">@</span>
      <span className="text-[hsl(200_80%_60%)]">{hostname}</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-[hsl(280_80%_70%)]">~</span>
      <span className="text-foreground font-bold">$</span>
      {isInput ? null : <span className="ml-2" />}
    </span>
  );

  return (
    <div
      className={`bg-[hsl(var(--terminal-bg))] rounded-xl border border-border/50 overflow-hidden font-mono text-sm shadow-2xl ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-card/50 border-b border-border/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(0_70%_55%)] shadow-[0_0_8px_hsl(0_70%_55%/0.5)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(45_90%_55%)] shadow-[0_0_8px_hsl(45_90%_55%/0.5)]" />
          <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-muted-foreground text-xs font-medium tracking-wide">
            {username}@{hostname}: ~ (interactive)
          </span>
        </div>
        <div className="w-16" />
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="p-4 space-y-1 min-h-[280px] max-h-[350px] overflow-y-auto bg-gradient-to-b from-transparent to-card/20 cursor-text"
      >
        {history.map((cmd, index) => (
          <div
            key={index}
            className={`flex ${cmd.type === "ascii" ? "justify-center" : ""}`}
          >
            {cmd.type === "command" && renderPrompt()}
            <span
              className={`${getColorClass(cmd)} ${cmd.type === "ascii" ? "whitespace-pre font-bold" : ""}`}
            >
              {cmd.isTyping ? (typingText[index] || "") : cmd.text}
              {cmd.isTyping && (
                <span className={`inline-block w-2 h-4 bg-primary ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"}`} />
              )}
            </span>
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center">
          {renderPrompt(true)}
          <div className="flex-1 relative ml-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-[hsl(var(--terminal-text))] caret-transparent"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              disabled={isTyping}
            />
            <span
              className={`absolute top-0 left-0 pointer-events-none text-[hsl(var(--terminal-text))]`}
              style={{ left: `${input.length}ch` }}
            >
              <span
                className={`inline-block w-2.5 h-5 bg-primary transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-card/30 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
        <span>zsh • tab to autocomplete • ↑↓ history</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_6px_#FFA500] animate-pulse" />
          interactive
        </span>
      </div>
    </div>
  );
};

export default Terminal;
