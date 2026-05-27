import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle2, Circle, ChevronLeft, ChevronRight, Lock, Paperclip, X, Save } from 'lucide-react';
import { LESSONS_MODS } from '../data';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Input } from '../components/ui/Input';

function getVideoEmbedUrl(url: string): { type: 'youtube' | 'vimeo' | 'mp4' | 'unknown'; src: string } {
  if (!url) return { type: 'unknown', src: '' };
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return { type: 'youtube', src: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0` };
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { type: 'vimeo', src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) return { type: 'mp4', src: url };
  return { type: 'unknown', src: url };
}

export default function Lessons({ db, updateDb, showToast }: any) {
  const allLessons = LESSONS_MODS.flatMap((m:any) => m.lessons);
  const [currentLesson, setCurrentLesson] = useState(allLessons[0]);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [attachUrl, setAttachUrl] = useState('');
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('ailabs_lessonNotes');
      if (raw) setNotes(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist notes
  useEffect(() => {
    localStorage.setItem('ailabs_lessonNotes', JSON.stringify(notes));
  }, [notes]);

  const prog = db.lessonProg || {};
  const total = allLessons.length;
  const doneCount = Object.values(prog).filter(Boolean).length;
  const isDone = prog[currentLesson.id];

  const idx = allLessons.findIndex((l: any) => l.id === currentLesson.id);
  const prev = idx > 0 ? allLessons[idx - 1] : null;
  const next = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;

  // Attached videos per lesson
  const attachedVideos = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('ailabs_attachedVideos') || '{}');
    } catch {
      return {};
    }
  }, [showAttachModal, currentLesson.id]);

  const currentVideo = attachedVideos[currentLesson.id] || '';
  const videoInfo = getVideoEmbedUrl(currentVideo);

  const markLesson = (id: string) => {
    updateDb('lessonProg', { ...prog, [id]: !prog[id] });
    if (!prog[id]) showToast('Lesson marked as complete');
    else showToast('Lesson marked as incomplete');
  };

  const saveAttachedVideo = () => {
    if (!attachUrl.trim()) return;
    const existing = JSON.parse(localStorage.getItem('ailabs_attachedVideos') || '{}');
    existing[currentLesson.id] = attachUrl.trim();
    localStorage.setItem('ailabs_attachedVideos', JSON.stringify(existing));
    setAttachUrl('');
    setShowAttachModal(false);
    showToast('Video attached');
  };

  const removeAttachedVideo = () => {
    const existing = JSON.parse(localStorage.getItem('ailabs_attachedVideos') || '{}');
    delete existing[currentLesson.id];
    localStorage.setItem('ailabs_attachedVideos', JSON.stringify(existing));
    setShowAttachModal(false);
    showToast('Video removed');
  };

  return (
    <div className="min-h-screen warm-gradient text-text-primary px-4 md:px-6 py-6 md:py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="mb-10">
          <Badge variant="accent" className="mb-4 rounded-full">AI Academy</Badge>
          <h1 className="text-[32px] md:text-[44px] font-semibold text-ink-900 tracking-tight leading-tight">
            AI Engineering for Founders
          </h1>
          <p className="text-[17px] text-text-secondary mt-2 max-w-2xl">
            Learn how to automate workflows and build AI systems from scratch.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR */}
          <div className="w-full lg:w-[320px] lg:sticky lg:top-[96px] flex flex-col gap-6 lg:h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar pr-2">
            
            {/* Progress Card */}
            <Card className="bg-bg border-border/50">
              <CardBody className="py-5 flex flex-col gap-3">
                <div className="flex justify-between items-end mb-1">
                  <h3 className="text-[14px] font-semibold text-ink-900">Your Progress</h3>
                  <span className="text-[12px] font-medium text-text-secondary">{doneCount} / {total} lessons</span>
                </div>
                <ProgressBar value={Math.round((doneCount / total) * 100)} />
                <div className="text-[12px] text-text-tertiary">
                  {doneCount === total ? 'Course completed.' : 'Keep going, you are doing great.'}
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
                            group flex items-start gap-3 p-3 rounded-xl text-left transition-colors border
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
            
            {/* VIDEO PLAYER */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`video-${currentLesson.id}`}
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                transition={{duration: 0.3}}
                className="w-full aspect-video bg-ink-900 rounded-2xl overflow-hidden relative shadow-lg border border-border/50"
              >
                {videoInfo.type === 'youtube' && (
                  <iframe 
                    src={videoInfo.src} 
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Lesson video"
                  />
                )}
                {videoInfo.type === 'vimeo' && (
                  <iframe 
                    src={videoInfo.src} 
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Lesson video"
                  />
                )}
                {videoInfo.type === 'mp4' && (
                  <video 
                    src={videoInfo.src} 
                    className="w-full h-full"
                    controls
                  />
                )}
                {videoInfo.type === 'unknown' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                      <Play size={28} className="fill-white ml-1" />
                    </div>
                    <div className="text-[14px] text-white/70">No video attached</div>
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={() => setShowAttachModal(true)}>
                      <Paperclip size={14} /> Attach Video
                    </Button>
                  </div>
                )}

                {/* Overlay controls when video exists */}
                {videoInfo.type !== 'unknown' && (
                  <div className="absolute top-3 right-3 z-10">
                    <Button size="sm" variant="secondary" className="bg-black/50 text-white border-white/10 hover:bg-black/70 rounded-full" onClick={() => setShowAttachModal(true)}>
                      <Paperclip size={14} /> Change
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* LESSON CONTENT */}
            <Card>
              <CardBody className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
                  <div>
                    <Badge variant="outline" className="mb-3 rounded-full">Module Insight</Badge>
                    <h2 className="text-[24px] md:text-[28px] font-semibold text-ink-900 tracking-tight leading-tight">
                      {currentLesson.h}
                    </h2>
                  </div>
                  <Button 
                    variant={isDone ? 'secondary' : 'primary'} 
                    onClick={() => markLesson(currentLesson.id)}
                    className="shrink-0 rounded-full"
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
                
                {/* NOTES */}
                <div className="mt-10 pt-8 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[16px] font-semibold text-ink-900">My Notes</h3>
                    <span className="text-[12px] text-text-tertiary">Auto-saved</span>
                  </div>
                  <textarea
                    className="w-full bg-bg-subtle border border-border/50 rounded-xl p-4 text-[14px] text-ink-900 placeholder:text-text-disabled focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors min-h-[120px] resize-y custom-scrollbar"
                    placeholder="Write your notes for this lesson..."
                    value={notes[currentLesson.id] || ''}
                    onChange={(e) => setNotes(prev => ({ ...prev, [currentLesson.id]: e.target.value }))}
                  />
                </div>
                
                {/* NAVIGATION */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                  {prev ? (
                    <Button variant="ghost" className="rounded-full" onClick={() => setCurrentLesson(prev)}>
                      <ChevronLeft size={16} /> Previous Lesson
                    </Button>
                  ) : <div></div>}
                  {next ? (
                    <Button className="rounded-full" onClick={() => setCurrentLesson(next)}>
                      Next Lesson <ChevronRight size={16} />
                    </Button>
                  ) : (
                    <div className="text-emerald font-semibold text-[15px] flex items-center gap-2">
                      <CheckCircle2 size={16} /> Module Complete
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
            
          </div>
        </div>
      </div>
      
      {/* ATTACH VIDEO MODAL */}
      <AnimatePresence>
        {showAttachModal && (
          <motion.div 
            initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
            className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAttachModal(false)}
          >
            <motion.div
              initial={{scale: 0.95, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0.95, opacity: 0}}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg border border-border rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-semibold text-ink-900">Attach Video</h3>
                <button onClick={() => setShowAttachModal(false)} className="p-1 text-text-tertiary hover:text-ink-900"><X size={18} /></button>
              </div>
              <p className="text-[14px] text-text-secondary mb-4">
                Paste a YouTube, Vimeo, or direct MP4 link for this lesson.
              </p>
              <Input
                value={attachUrl}
                onChange={(e:any) => setAttachUrl(e.target.value)}
                placeholder="https://..."
                className="h-12 mb-4 rounded-xl"
              />
              <div className="flex gap-3">
                {currentVideo && (
                  <Button variant="danger" className="flex-1 rounded-full" onClick={removeAttachedVideo}>
                    Remove
                  </Button>
                )}
                <Button className="flex-1 rounded-full" onClick={saveAttachedVideo} disabled={!attachUrl.trim()}>
                  <Save size={16} /> Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
      `}</style>
    </div>
  );
}
