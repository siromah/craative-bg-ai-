import React from 'react';
import { motion } from 'motion/react';
import { LogOut, BookOpen, Activity, LayoutTemplate, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LESSONS_MODS, PROMPTS } from '../data';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';

export function Profile({ db, setPage }: any) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const fullName =
    typeof user?.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : 'AILABSBG Member';
      
  const initials = (fullName[0] || '?').toUpperCase();
  
  const savedLen = (db?.savedPrompts || []).length;
  const prog = db?.lessonProg || {};
  const allLessons = LESSONS_MODS.flatMap((m:any) => m.lessons);
  const totalL = allLessons.length;
  const doneCount = Object.values(prog).filter(Boolean).length;
  const progressPct = totalL > 0 ? Math.round((doneCount / totalL) * 100) : 0;
  
  const savedPromptsFull = (db?.savedPrompts || []).map((id:string) => PROMPTS.find(p=>p.id===id)).filter(Boolean);

  const getCatVariant = (c: string) => {
    if (c === 'marketing') return 'accent';
    if (c === 'automation') return 'default';
    if (c === 'content') return 'info';
    if (c === 'productivity') return 'warning';
    return 'neutral';
  };

  return (
    <div className="min-h-screen warm-gradient text-text-primary px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 relative">
          <motion.div
             initial={{opacity: 0, scale: 0.9}} animate={{opacity:1, scale: 1}} transition={{duration: 0.5}}
             className="mb-6 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-amber rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Avatar initials={initials} size="xl" className="relative shadow-lg ring-4 ring-bg h-28 w-28 text-[32px] font-bold" />
          </motion.div>
          
          <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-ink-900 mb-2">
            Hello, {fullName}
          </h1>
          <p className="text-[16px] text-text-secondary mb-8">{user?.email}</p>
          <Button onClick={handleLogout} variant="secondary" className="gap-2 rounded-full px-6">
            <LogOut size={16} /> Sign out
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Progress Card */}
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.1}}>
            <Card className="h-full bg-bg shadow-sm border-border/50" hover>
              <CardBody className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 text-[18px] font-semibold text-ink-900">
                    <BookOpen size={20} className="text-accent" /> Academy Progress
                  </div>
                  <Badge variant="accent" className="text-[14px] rounded-full">{progressPct}%</Badge>
                </div>
                
                <div className="mb-4">
                  <ProgressBar value={progressPct} />
                </div>
                
                <p className="text-[14px] text-text-secondary font-medium mb-8">
                  {doneCount} of {totalL} lessons completed
                </p>
                
                <div className="mt-auto">
                  <Button onClick={() => setPage('lessons')} className="w-full h-12 rounded-full">
                     Resume Learning
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          {/* Stats Card */}
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.2}}>
             <Card className="h-full bg-bg shadow-sm border-border/50" hover>
              <CardBody className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-2 text-[18px] font-semibold text-ink-900 mb-8">
                  <Activity size={20} className="text-emerald" /> Your Activity
                </div>
                
                <div className="flex flex-col gap-1 justify-center flex-1 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border/60">
                    <span className="text-text-secondary font-medium flex items-center gap-2"><LayoutTemplate size={16} className="text-text-tertiary"/> Saved Prompts</span>
                    <span className="font-semibold text-ink-900 text-[18px]">{savedLen}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border/60">
                    <span className="text-text-secondary font-medium flex items-center gap-2"><Star size={16} className="text-text-tertiary"/> Account</span>
                    <Badge variant="success" className="uppercase tracking-widest text-[10px] rounded-full">Active</Badge>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
        
        {/* Saved Prompts Section */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[24px] font-semibold text-ink-900 tracking-tight">Saved Library</h2>
          {savedLen > 0 && <Button variant="ghost" onClick={() => setPage('prompts')} className="text-accent underline text-[14px] rounded-full">Browse all</Button>}
        </div>
        
        {savedLen === 0 ? (
          <Card className="bg-bg-subtle border-dashed border-2 p-16 text-center">
            <h3 className="text-[18px] font-semibold text-ink-900 mb-2">No saved prompts yet</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">Explore our prompt library and save the ones you find most useful for your workflow.</p>
            <Button onClick={() => setPage('prompts')} className="rounded-full">Explore Prompts</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedPromptsFull.map((p:any) => (
               <Card key={p.id} className="bg-bg hover:shadow-md transition-shadow group flex flex-col h-full border-border/50 hover:border-text-tertiary" hover>
                 <CardBody className="p-6 flex flex-col flex-1">
                   <div className="mb-3">
                     <Badge variant={getCatVariant(p.cat) as any} className="uppercase tracking-wider text-[10px] rounded-full">
                       {p.cat}
                     </Badge>
                   </div>
                   <h3 className="text-[16px] font-semibold text-ink-900 mb-3 leading-tight">{p.title}</h3>
                   <p className="text-[14px] text-text-secondary line-clamp-3 mb-6 flex-1">{p.text}</p>
                   <Button variant="secondary" onClick={() => setPage('prompts')} className="w-full rounded-full">
                     View in Library
                   </Button>
                 </CardBody>
               </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
