import React, { useState, useEffect } from 'react';

export interface CodeWindowProps {
  code: string;
  filename?: string;
  language?: 'typescript' | 'python' | 'bash';
  animated?: boolean;
  className?: string;
}

export function CodeWindow({ code, filename = 'terminal', language = 'typescript', animated = false, className = '' }: CodeWindowProps) {
  const [displayedCode, setDisplayedCode] = useState(animated ? '' : code);

  useEffect(() => {
    if (!animated) {
      setDisplayedCode(code);
      return;
    }
    
    let i = 0;
    setDisplayedCode('');
    
    const interval = setInterval(() => {
      setDisplayedCode(prev => prev + code.charAt(i));
      i++;
      if (i >= code.length) {
        clearInterval(interval);
      }
    }, 15); // Adjust speed here
    
    return () => clearInterval(interval);
  }, [code, animated]);

  // Basic syntax highlighting implementation
  const renderHighlighted = (source: string) => {
    if (language === 'typescript') {
      return source.split('\n').map((line, idx) => {
        // Minimal syntax highlighting regex approach for showcase
        const highlighted = line
          // Keywords
          .replace(/\b(import|from|export|const|let|var|function|return|if|else|await|async)\b/g, '<span style="color:#7dd3fc">$1</span>')
          // Types
          .replace(/\b(string|number|boolean|any|void|undefined|null|Promise)\b/g, '<span style="color:#f9a8d4">$1</span>')
          // Functions
          .replace(/\b(\w+)(?=\()/g, '<span style="color:#fde68a">$1</span>')
          // Strings
          .replace(/(["'`].*?["'`])/g, '<span style="color:#86efac">$1</span>')
          // Comments
          .replace(/(\/\/.*$)/g, '<span style="color:#64748b">$1</span>')
          // Numbers
          .replace(/\b(\d+)\b/g, '<span style="color:#c4b5fd">$1</span>');

        return (
          <div key={idx} className="flex">
            <span className="select-none text-ink-500 mr-4 text-right min-w-[24px] inline-block">{idx + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: highlighted }} />
          </div>
        );
      });
    }

    if (language === 'bash') {
       return source.split('\n').map((line, idx) => {
        const highlighted = line
          .replace(/(\B-[\w-]+\b)/g, '<span style="color:#86efac">$1</span>') // flags
          .replace(/^(npm|npx|node|yarn|git|echo|ls|cd|docker)\b/g, '<span style="color:#7dd3fc">$1</span>') // commands
          .replace(/(["'`].*?["'`])/g, '<span style="color:#fde68a">$1</span>') // strings
          .replace(/(#.*$)/g, '<span style="color:#64748b">$1</span>'); // comments

        return (
          <div key={idx} className="flex">
            <span dangerouslySetInnerHTML={{ __html: highlighted }} />
          </div>
        );
      });
    }
    
    return source; // fallback
  };

  return (
    <div className={`bg-ink-900 rounded-xl shadow-md overflow-hidden flex flex-col font-mono text-[13px] ${className}`}>
      {/* Title bar */}
      <div className="h-[36px] bg-ink-800 px-4 flex items-center relative select-none">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="text-[12px] text-ink-400 absolute left-1/2 -translate-x-1/2 pointer-events-none">
          {filename}
        </div>
      </div>
      
      {/* Code area */}
      <div className="p-5 overflow-x-auto text-ink-100 leading-[1.7] whitespace-pre">
        {renderHighlighted(displayedCode)}
        <div className="inline-block w-[2px] h-[14px] bg-accent align-middle ml-[2px] animate-[pulse_1s_step-end_infinite]" />
      </div>
    </div>
  );
}
