import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle2, Circle, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { LESSONS_MODS } from '../data';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

export default function Lessons({ db, updateDb, showToast }: any) {
  const allLessons = LESSONS_MODS.flatMap((m:any) => m.lessons);
  const [currentLesson, setCurrentLesson] = useState(allLessons[0]);

  const prog = db.lessonProg || {};
  const total = allLessons.length;
  const doneCount = Object.values(prog).filter(Boolean).length;
  const isDone = prog[currentLesson.id];

  const idx = allLessons.findIndex((l: any) => l.id === currentLesson.id);
  const prev = idx > 0 ? allLessons[idx - 1] : null;
  const next = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;

  const markLesson = (id: string) => {
    updateDb('lessonProg', { ...prog, [id]: !prog[id] });
    if (!prog[id]) showToast('Lesson marked as complete');
  };

  return (
    <div className="min-h-screen bg-bg-subtle text-text-primary px-4 md:px-6 py-6 md:py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="mb-8">
          <Badge variant="accent" className="mb-4">AI Academy</Badge>
          <h1 className="text-[32px] md:text-[40px] font-semibold text-ink-900 tracking-tight leading-tight">
            AI Engineering for Founders
          </h1>
          <p className="text-[18px] text-text-secondary mt-2 max-w-2xl">
            Learn how to automate workflows and build AI systems from scratch.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR */}
          <div className="w-full lg:w-[320px] lg:sticky lg:top-[96px] flex flex-col gap-6 lg:h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar pr-2">
            
            {/* Progress Card */}
            <Card className="bg-bg border-border">
              <CardBody className="py-5 flex flex-col gap-3">
                <div className="flex justify-between items-end mb-1">
                  <h3 className="text-[14px] font-semibold text-ink-900">Your Progress</h3>
                  <span className="text-[12px] font-medium text-text-secondary">{doneCount} / {total} lessons</span>
                </div>
                <ProgressBar value={doneCount} max={total} colorClass="bg-accent" />
                <div className="text-[12px] text-text-tertiary">
                  {doneCount === total ? 'Course completed! 🎉' : 'Keep going, you are doing great!'}
                </div>
              </CardBody>
            </Card>
            
            {/* Content Outline */}
            <div className="flex flex-col gap-6">
              {LESSONS_MODS.map((mod:any, mIdx: number) => (
                <div key={mod.title} className="flex flex-col">
                  {/* Module Header */}
                  <div className="sticky top-0 bg-bg-subtle/90 backdrop-blur pb-3 mb-2 z-10 pt-2">
                    <h4 className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                      Module {mIdx + 1}
                    </h4>
                    <div className="text-[15px] font-semibold text-ink-900 mt-1">{mod.title}</div>
                  </div>
                  
                  {/* Lessons */}
                  <div className="flex flex-col gap-1.5">
                    {mod.lessons.map((l:any) => {
                      const done = prog[l.id];
                      const active = currentLesson.id === l.id;
                      return (
                        <button 
                          key={l.id}
                          onClick={() => setCurrentLesson(l)}
                          className={`
                            group flex items-start gap-3 p-3 rounded-lg text-left transition-colors border
                            ${active ? 'bg-bg border-border shadow-sm' : 'border-transparent hover:bg-black/5'}
                          `}
                        >
                          <div className="mt-0.5 shrink-0">
                            {done ? (
                              <CheckCircle2 size={18} className="text-emerald" />
                            ) : active ? (
                              <Circle size={18} className="text-accent fill-accent/20" />
                            ) : (
                              <Circle size={18} className="text-text-disabled group-hover:text-text-tertiary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className={`text-[14px] font-medium leading-tight mb-1 ${active ? 'text-ink-900' : 'text-text-secondary'}`}>
                              {l.title}
                            </div>
                            <div className="text-[12px] text-text-tertiary flex items-center gap-1.5">
                              <Play size={10} /> {l.dur}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* MAIN CONTENT */}
          <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
            
            {/* VIDEO PLAYER (Simulated) */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`video-${currentLesson.id}`}
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                transition={{duration: 0.3}}
                className="w-full aspect-video bg-ink-900 rounded-xl overflow-hidden relative shadow-lg group cursor-pointer border border-border-strong flex items-center justify-center"
                onClick={() => showToast('Video starting...')}
              >
                {/* Decorative video player UI */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-[12px] font-medium z-10 flex items-center gap-2">
                  <Play size={12} className="fill-white" /> {currentLesson.dur}
                </div>
                
                <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <Play size={28} className="fill-white ml-1" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-4 z-10">
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-accent rounded-full" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* LESSON CONTENT */}
            <Card>
              <CardBody className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
                  <div>
                    <Badge variant="neutral" className="mb-3">Module Insight</Badge>
                    <h2 className="text-[24px] md:text-[28px] font-semibold text-ink-900 tracking-tight leading-tight">
                      {currentLesson.h}
                    </h2>
                  </div>
                  <Button 
                    variant={isDone ? 'secondary' : 'default'} 
                    onClick={() => markLesson(currentLesson.id)}
                    className="shrink-0"
                  >
                    {isDone ? (
                      <><CheckCircle2 size={16} /> Completed</>
                    ) : (
                      'Mark as Complete'
                    )}
                  </Button>
                </div>
                
                <div className="text-[16px] text-text-secondary leading-[1.7] space-y-5">
                  <p>{currentLesson.p1}</p>
                  <p>{currentLesson.p2}</p>
                  <p>{currentLesson.p3}</p>
                </div>
                
                {/* NAVIGATION */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                  {prev ? (
                    <Button variant="ghost" onClick={() => setCurrentLesson(prev)}>
                      <ChevronLeft size={16} /> Previous Lesson
                    </Button>
                  ) : <div></div>}
                  {next ? (
                    <Button onClick={() => setCurrentLesson(next)}>
                      Next Lesson <ChevronRight size={16} />
                    </Button>
                  ) : (
                    <div className="text-emerald font-semibold text-[15px] flex items-center gap-2">
                      <Sparkles size={16} /> Module Complete!
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
            
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
      `}</style>
    </div>
  );
}
