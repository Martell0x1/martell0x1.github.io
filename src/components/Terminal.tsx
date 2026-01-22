import { useEffect, useState } from "react";

interface TerminalProps {
  lines: string[];
  typingSpeed?: number;
  className?: string;
}

const Terminal = ({ lines, typingSpeed = 50, className = "" }: TerminalProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.charAt(0));
          } else {
            newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-[hsl(var(--terminal-bg))] rounded-lg border border-border overflow-hidden font-mono text-sm ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/20 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-destructive/80" />
        <div className="w-3 h-3 rounded-full bg-[hsl(45_90%_50%)]" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <span className="ml-2 text-muted-foreground text-xs">terminal</span>
      </div>
      <div className="p-4 space-y-1">
        {displayedLines.map((line, index) => (
          <div key={index} className="flex">
            <span className="text-primary mr-2">$</span>
            <span className="text-[hsl(var(--terminal-text))]">
              {line}
              {index === displayedLines.length - 1 && currentLineIndex < lines.length && (
                <span className={`inline-block w-2 h-4 bg-[hsl(var(--terminal-cursor))] ml-0.5 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
              )}
            </span>
          </div>
        ))}
        {currentLineIndex >= lines.length && (
          <div className="flex">
            <span className="text-primary mr-2">$</span>
            <span className={`inline-block w-2 h-4 bg-[hsl(var(--terminal-cursor))] ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
