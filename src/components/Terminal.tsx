import { useEffect, useState } from "react";

interface CommandOutput {
  type: "command" | "output" | "error" | "success" | "info" | "path";
  text: string;
  color?: string;
}

interface TerminalProps {
  commands: CommandOutput[];
  typingSpeed?: number;
  className?: string;
  username?: string;
  hostname?: string;
}

const Terminal = ({ 
  commands, 
  typingSpeed = 40, 
  className = "",
  username = "marwan",
  hostname = "arch"
}: TerminalProps) => {
  const [displayedCommands, setDisplayedCommands] = useState<CommandOutput[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex >= commands.length) return;

    const currentCommand = commands[currentIndex];
    
    if (currentCommand.type === "command") {
      // Type out commands character by character
      if (currentCharIndex < currentCommand.text.length) {
        const timeout = setTimeout(() => {
          setDisplayedCommands(prev => {
            const newCommands = [...prev];
            if (newCommands.length <= currentIndex) {
              newCommands.push({ ...currentCommand, text: currentCommand.text.charAt(0) });
            } else {
              newCommands[currentIndex] = { ...currentCommand, text: currentCommand.text.substring(0, currentCharIndex + 1) };
            }
            return newCommands;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 200);
        return () => clearTimeout(timeout);
      }
    } else {
      // Instantly show output lines
      setDisplayedCommands(prev => [...prev, currentCommand]);
      const timeout = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentCharIndex, commands, typingSpeed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const getColorClass = (cmd: CommandOutput) => {
    if (cmd.color) return cmd.color;
    switch (cmd.type) {
      case "command": return "text-[hsl(var(--terminal-text))]";
      case "output": return "text-muted-foreground";
      case "error": return "text-destructive";
      case "success": return "text-primary";
      case "info": return "text-[hsl(200_80%_60%)]";
      case "path": return "text-[hsl(280_80%_70%)]";
      default: return "text-[hsl(var(--terminal-text))]";
    }
  };

  const renderPrompt = () => (
    <span className="flex-shrink-0">
      <span className="text-primary font-bold">{username}</span>
      <span className="text-muted-foreground">@</span>
      <span className="text-[hsl(200_80%_60%)]">{hostname}</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-[hsl(280_80%_70%)]">~</span>
      <span className="text-foreground font-bold">$</span>
      <span className="ml-2" />
    </span>
  );

  return (
    <div className={`bg-[hsl(var(--terminal-bg))] rounded-xl border border-border/50 overflow-hidden font-mono text-sm shadow-2xl ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-card/50 border-b border-border/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(0_70%_55%)] shadow-[0_0_8px_hsl(0_70%_55%/0.5)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(45_90%_55%)] shadow-[0_0_8px_hsl(45_90%_55%/0.5)]" />
          <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-muted-foreground text-xs font-medium tracking-wide">
            {username}@{hostname}: ~
          </span>
        </div>
        <div className="w-16" />
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-1 min-h-[200px] bg-gradient-to-b from-transparent to-card/20">
        {displayedCommands.map((cmd, index) => (
          <div key={index} className="flex flex-wrap">
            {cmd.type === "command" && renderPrompt()}
            <span className={`${getColorClass(cmd)} ${cmd.type !== "command" ? "pl-0" : ""}`}>
              {cmd.text}
              {cmd.type === "command" && index === displayedCommands.length - 1 && currentIndex < commands.length && (
                <span 
                  className={`inline-block w-2.5 h-5 bg-primary ml-0.5 align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} 
                />
              )}
            </span>
          </div>
        ))}
        
        {/* Final cursor line */}
        {currentIndex >= commands.length && (
          <div className="flex">
            {renderPrompt()}
            <span 
              className={`inline-block w-2.5 h-5 bg-primary transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} 
            />
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-card/30 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
        <span>zsh</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          ready
        </span>
      </div>
    </div>
  );
};

export default Terminal;
