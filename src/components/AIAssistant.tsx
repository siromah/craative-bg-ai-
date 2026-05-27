import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Sparkles, X, Trash2, Send, Bot, User } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "Where should I start?",
  "How does AI School work?",
  "How to use Prompt Library?",
  "What's in the Community?",
  "Which lesson is good for beginners?",
  "How can AI help my business?"
];

export default function AIAssistant({ currentPage, setPage }: { currentPage?: string, setPage?: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [inputStr, setInputStr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ailabs_ai_assistant_chat');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error parsing chat history', e);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('ailabs_ai_assistant_chat', JSON.stringify(messages));
      } catch (e) {
        console.error('Error saving chat history', e);
      }
    }
    
    // Scroll to bottom
    if (isOpen) {
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [messages, isOpen]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('ailabs_ai_assistant_chat');
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const newMsgs: {role: 'user'|'assistant', content: string}[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMsgs);
    setInputStr('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
          currentPage: currentPage || window.location.pathname.replace('/', '') || 'home',
          siteContext: 'AILABSBG Platform - Premium AI School & Community'
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        setMessages([...newMsgs, { role: 'assistant', content: data.error || 'A problem occurred with the AI response. Please try again later.' }]);
      } else {
        setMessages([...newMsgs, { role: 'assistant', content: data.answer || 'No response.' }]);
      }
    } catch (err) {
      setMessages([...newMsgs, { role: 'assistant', content: 'A problem occurred checking the AI response. Check your internet connection.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputStr);
    }
  };
  
  const handleQuickAction = (action: string) => {
    if (setPage) {
      if (action === 'lessons') setPage('lessons');
      if (action === 'prompts') setPage('prompts');
      if (action === 'community') setPage('community');
      if (action === 'events') setPage('events');
    }
  };

  // Extract quick action markers from text if we want, or just basic rendering
  const renderMessageContent = (content: string) => {
    return (
      <div className="whitespace-pre-wrap">
        {content}
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, type: 'spring', bounce: 0.4 }}
            className="fixed bottom-[96px] right-4 md:right-8 w-[calc(100vw-32px)] md:w-[400px] h-[550px] max-h-[calc(100vh-120px)] z-50 flex flex-col pointer-events-auto shadow-2xl rounded-[24px] bg-bg border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-bg-subtle/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 text-accent border border-accent/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="font-semibold text-[15px] leading-tight text-ink-900">AI Navigator</div>
                  <div className="text-[12px] text-text-tertiary font-medium">AILABSBG Assistant</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearChat} title="Clear chat" className="h-8 w-8 p-0 text-text-secondary hover:text-rose hover:bg-rose/10">
                    <Trash2 size={16} />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0 text-text-secondary hover:text-ink-900">
                  <X size={20} />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 scroll-smooth custom-scrollbar">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div>
                    <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/10">
                      <Sparkles size={32} className="text-accent" />
                    </div>
                    <div className="font-semibold text-[18px] text-ink-900 mb-2">Hello!</div>
                    <div className="text-[14px] text-text-secondary px-4 max-w-[280px]">
                      I am your AI assistant in AILABSBG. How can I help you today?
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2 mt-4 px-2">
                    {SUGGESTED_QUESTIONS.map(q => (
                      <button 
                        key={q} 
                        onClick={() => sendMessage(q)}
                        className="text-[13px] bg-bg-subtle hover:bg-black/5 border border-border text-ink-900 px-3 py-1.5 rounded-full transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {messages.map((m, idx) => (
                    <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
                          <Bot size={16} />
                        </div>
                      )}
                      
                      <div className={`px-4 py-3 rounded-[16px] max-w-[85%] text-[14px] leading-relaxed shadow-sm ${
                        m.role === 'user' 
                          ? 'bg-ink-900 text-bg rounded-br-sm' 
                          : 'bg-bg-subtle text-ink-900 border border-border rounded-bl-sm'
                      }`}>
                        {renderMessageContent(m.content)}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
                        <Bot size={16} />
                      </div>
                      <div className="px-5 py-4 rounded-[16px] rounded-bl-sm bg-bg-subtle border border-border flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={endRef} className="h-1" />
                </div>
              )}
            </div>

            {/* Quick Navigation (if setPage available) */}
            {setPage && messages.length > 0 && !isLoading && (
              <div className="flex items-center gap-2 px-5 py-3 border-t border-border bg-bg-subtle/30 overflow-x-auto whitespace-nowrap hide-scrollbar">
                <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider shrink-0">Quick Links:</span>
                <button onClick={() => handleQuickAction('lessons')} className="text-[12px] font-semibold text-accent hover:underline shrink-0">Lessons</button>
                <span className="w-1 h-1 rounded-full bg-border shrink-0" />
                <button onClick={() => handleQuickAction('prompts')} className="text-[12px] font-semibold text-accent hover:underline shrink-0">Prompts</button>
                <span className="w-1 h-1 rounded-full bg-border shrink-0" />
                <button onClick={() => handleQuickAction('community')} className="text-[12px] font-semibold text-accent hover:underline shrink-0">Community</button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-bg">
              <div className="relative flex items-center">
                <textarea 
                  className="w-full bg-bg-subtle border border-border rounded-[20px] pl-4 pr-12 py-3 text-[14px] text-ink-900 placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none hide-scrollbar max-h-[120px]"
                  placeholder="Ask something..."
                  value={inputStr}
                  onChange={e => setInputStr(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  maxLength={500}
                  disabled={isLoading}
                  style={{ minHeight: '44px' }}
                />
                <button 
                  className={`absolute right-2 bottom-1.5 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    !inputStr.trim() || isLoading 
                      ? 'bg-bg-subtle text-text-tertiary cursor-not-allowed' 
                      : 'bg-accent text-white hover:bg-accent/90 shadow-sm'
                  }`}
                  onClick={() => sendMessage(inputStr)}
                  disabled={!inputStr.trim() || isLoading}
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent text-white shadow-lg flex items-center justify-center z-40 hover:bg-accent/90 transition-colors border border-white/10"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!isOpen ? (
          <Sparkles size={24} />
        ) : (
          <X size={24} />
        )}
      </motion.button>
    </>
  );
}
