import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Users, GraduationCap, Calendar, Bookmark, ChevronRight, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LESSONS_MODS, PROMPTS, EVENTS_DATA } from '../data';

export default function Home({ checkAuthThenGo, setPage, db }: any) {
  const { user: currentUser } = useAuth();
  const recentPosts = db?.posts?.filter((p:any) => p.type !== 'announcement').slice(0, 2) || [];
  const featuredPrompts = PROMPTS.slice(0, 3);
  const academyLessons = LESSONS_MODS.reduce((acc, mod) => acc.concat(mod.lessons), [] as any[]).slice(0, 3);
  const nextEvent = EVENTS_DATA[0];

  const formatTimeAgo = (ts: number) => {
    const d = Date.now() - ts;
    if (d < 60000) return 'Just now';
    if (d < 3600000) return `${Math.floor(d/60000)}m ago`;
    if (d < 86400000) return `${Math.floor(d/3600000)}h ago`;
    return `${Math.floor(d/86400000)}d ago`;
  };

  return (
    <div className="min-h-screen warm-gradient text-text-primary overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative px-4 md:px-6 pt-24 pb-28 md:pt-36 md:pb-44 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <Badge variant="accent" className="mb-6">AI Practitioner Community</Badge>
          
          <h1 className="text-[44px] md:text-[72px] font-semibold leading-[1.05] tracking-tight text-ink-900 mb-6">
            Build and learn<br className="hidden md:block"/> with AI.
          </h1>
          
          <p className="text-[17px] md:text-[20px] text-text-secondary max-w-xl mx-auto leading-[1.65] mb-10">
            A calm, focused space for professionals who want practical AI skills, tested prompts, and a community of builders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Button size="lg" onClick={() => checkAuthThenGo('register')} className="h-12 px-7 rounded-full">
              Join the Community
            </Button>
            <Button variant="ghost" size="lg" onClick={() => setPage('prompts')} className="h-12 px-7 rounded-full">
              Browse Prompts <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-[13px] text-text-tertiary">
            <span className="flex items-center gap-1.5"><Users size={14} /> Growing community</span>
            <span className="w-1 h-1 rounded-full bg-border-strong"></span>
            <span className="flex items-center gap-1.5"><Sparkles size={14} /> Curated prompts</span>
            <span className="w-1 h-1 rounded-full bg-border-strong"></span>
            <span className="flex items-center gap-1.5"><GraduationCap size={14} /> Hands-on lessons</span>
          </div>
        </motion.div>
      </section>

      {/* START HERE SECTION */}
      <section className="px-4 md:px-6 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-[28px] md:text-[40px] font-semibold text-ink-900 tracking-tight mb-4">Your learning path</h2>
          <p className="text-[16px] md:text-[18px] text-text-secondary max-w-lg mx-auto">Three simple ways to start. Pick what fits your goals today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {icon: Sparkles, color: 'text-amber', bg: 'bg-amber-light', title: 'Explore Prompts', desc: 'Find battle-tested prompts to use in your daily workflow immediately.', action: 'Browse prompts', p: 'prompts'},
            {icon: Users, color: 'text-emerald', bg: 'bg-emerald-light', title: 'Join Discussions', desc: 'Ask questions and share your wins with a private community of peers.', action: 'Join community', p: 'community'},
            {icon: GraduationCap, color: 'text-accent', bg: 'bg-accent-light', title: 'Take a Lesson', desc: 'Level up your skills with structured courses on modern AI tools.', action: 'Start learning', p: 'lessons'}
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="group relative flex flex-col items-center text-center p-8 md:p-10 h-full rounded-2xl border border-border/50 bg-bg/60 hover:bg-bg hover:border-border-strong hover:shadow-md transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-border ${step.bg} shadow-sm`}>
                  <step.icon className={step.color} size={24} />
                </div>
                <h3 className="text-[18px] font-semibold text-ink-900 mb-3">{step.title}</h3>
                <p className="text-[14px] text-text-secondary mb-8 flex-1 leading-relaxed max-w-[280px]">{step.desc}</p>
                <button 
                  className="text-[14px] font-medium text-accent flex items-center gap-1 hover:gap-2 transition-all"
                  onClick={() => setPage(step.p)}
                >
                  {step.action} <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PROMPTS SECTION */}
      <section className="px-4 md:px-6 py-20 md:py-28 max-w-7xl mx-auto border-t border-border/50">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[28px] md:text-[40px] font-semibold text-ink-900 tracking-tight mb-2">Top prompts</h2>
            <p className="text-text-secondary text-[16px]">Ready to copy and adapt to your work.</p>
          </div>
          <Button variant="ghost" onClick={() => setPage('prompts')} className="hidden sm:inline-flex rounded-full">View all <ChevronRight size={14} /></Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPrompts.map((p) => (
            <Card key={p.id} hover className="flex flex-col cursor-pointer" onClick={() => setPage('prompts')}>
              <CardBody className="py-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="default">{p.cat}</Badge>
                </div>
                <h3 className="text-[16px] font-semibold text-ink-900 mb-2 line-clamp-2 leading-tight">{p.title}</h3>
                <p className="text-[13px] text-text-secondary line-clamp-3 leading-relaxed flex-1">{p.text}</p>
              </CardBody>
              <div className="px-6 pb-5 mt-auto flex justify-between items-center text-[12px] text-text-tertiary">
                <span className="flex items-center gap-1.5"><Bookmark size={14} className="text-text-disabled" /> {p.saves} saves</span>
              </div>
            </Card>
          ))}
        </div>
        <Button variant="secondary" className="w-full mt-6 sm:hidden rounded-full" onClick={() => setPage('prompts')}>View all prompts</Button>
      </section>

      {/* COMMUNITY ACTIVITY */}
      <section className="px-4 md:px-6 py-20 md:py-28 max-w-7xl mx-auto border-t border-border/50">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 w-full">
            <h2 className="text-[28px] md:text-[40px] font-semibold text-ink-900 tracking-tight mb-8">Latest from the community</h2>
            <div className="flex flex-col gap-4">
              {recentPosts.map((post:any) => {
                const author = db.users.find((u:any) => u.id === post.uid) || { initials: '?', fname: 'User', lname: '' };
                return (
                  <div key={post.id} className="p-5 border border-border/50 rounded-2xl bg-bg hover:bg-bg-subtle transition-colors cursor-pointer" onClick={() => setPage('community')}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar size="md" initials={author.initials} />
                        <div>
                          <div className="text-[14px] font-semibold text-ink-900">{author.fname} {author.lname}</div>
                          <div className="text-[12px] text-text-tertiary">{formatTimeAgo(post.time)}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[15px] text-text-secondary leading-relaxed line-clamp-2">{post.text}</p>
                  </div>
                );
              })}
              {recentPosts.length === 0 && (
                <div className="p-8 border border-dashed border-border rounded-2xl text-center text-text-secondary text-[14px]">
                  No posts yet. Be the first to share.
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full lg:w-[360px] flex flex-col gap-6">
            <Card>
              <CardBody className="p-6">
                <h3 className="text-[16px] font-semibold text-ink-900 mb-2">Upcoming Event</h3>
                {nextEvent ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent font-bold text-[14px]">
                        {nextEvent.day}
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-ink-900">{nextEvent.title}</div>
                        <div className="text-[12px] text-text-secondary flex items-center gap-1"><Calendar size={12} /> {nextEvent.day} {nextEvent.mo}, {nextEvent.time}</div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full rounded-full" onClick={() => setPage('events')}>View events</Button>
                  </div>
                ) : (
                  <p className="text-[14px] text-text-secondary">No upcoming events.</p>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* ACADEMY PREVIEW */}
      <section className="px-4 md:px-6 py-20 md:py-28 max-w-7xl mx-auto border-t border-border/50">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[28px] md:text-[40px] font-semibold text-ink-900 tracking-tight mb-2">
              {currentUser ? 'Continue learning' : 'Start your AI education'}
            </h2>
            <p className="text-text-secondary text-[16px]">Structured lessons you can apply today.</p>
          </div>
          <Button variant="ghost" onClick={() => setPage('lessons')} className="hidden sm:inline-flex rounded-full">View all <ChevronRight size={14} /></Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {academyLessons.map((lesson:any) => (
            <Card key={lesson.id} hover className="flex flex-col cursor-pointer overflow-hidden" onClick={() => setPage('lessons')}>
              <CardBody className="py-6 flex flex-col h-full">
                <Badge variant="accent" className="mb-4 self-start">Fundamentals</Badge>
                <h3 className="text-[17px] font-semibold text-ink-900 mb-3">{lesson.title}</h3>
                <p className="text-[13px] text-text-secondary line-clamp-2 mb-6 flex-1">{lesson.p1}</p>
                
                <div className="flex justify-between items-center text-[12px] text-text-tertiary mb-5">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {lesson.dur}</span>
                  <span className="bg-bg-subtle px-2 py-0.5 rounded-md font-medium border border-border">Beginner</span>
                </div>
                
                {currentUser && <ProgressBar value={0} />}
              </CardBody>
              <div className="px-6 pb-4 bg-bg-subtle border-t border-border py-3 flex justify-end">
                <span className="text-[13px] font-medium text-accent flex items-center gap-1">Start lesson <ChevronRight size={14}/></span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
