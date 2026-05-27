import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Users, GraduationCap, MapPin, Search, Clock, MessageSquare, ChevronRight, Twitter, Github, Linkedin, Bookmark } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardBody, CardFooter, CardHeader } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { CodeWindow } from '../components/CodeWindow';
import { StatusChip } from '../components/ui/StatusChip';
import { ProgressBar } from '../components/ui/ProgressBar';

// Using the same mocked data
import { LESSONS_MODS, PROMPTS, EVENTS_DATA } from '../data';

export default function Home({ checkAuthThenGo, setPage, db }: any) {
  const { user: currentUser } = useAuth();
  const recentPosts = db?.posts?.filter((p:any) => p.type !== 'announcement').slice(0, 3) || [];
  const featuredPrompts = PROMPTS.slice(0, 3);
  const academyLessons = LESSONS_MODS.reduce((acc, mod) => acc.concat(mod.lessons), []).slice(0, 3);

  const formatTimeAgo = (ts: number) => {
    const d = Date.now() - ts;
    if (d < 60000) return 'Just now';
    if (d < 3600000) return `${Math.floor(d/60000)}m ago`;
    if (d < 86400000) return `${Math.floor(d/3600000)}h ago`;
    return `${Math.floor(d/86400000)}d ago`;
  };

  const sampleCode = `import { AIAgent } from "@ailabs/core";

const agent = new AIAgent({
  model: "gpt-4o",
  temperature: 0.7,
  systemPrompt: \`You are an expert TS developer.\`
});

// Stream response to client
const response = await agent.stream({
  messages: [{ role: "user", content: query }],
  tools: [searchDocs, analyzeRepo]
});

return new Response(response.body);`;

  return (
    <div className="min-h-screen bg-bg-subtle text-text-primary overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative px-4 md:px-6 pt-24 pb-20 md:pt-32 md:pb-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 min-h-[70vh]">
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full flex flex-col items-start"
        >
          <Badge variant="accent" className="mb-6">AI Practitioner Community</Badge>
          
          <h1 className="text-[40px] md:text-[52px] font-semibold leading-[1.1] tracking-tight text-ink-900 mb-6">
            Build, Share, and <br/>Learn with AI.
          </h1>
          
          <p className="text-[18px] text-text-secondary max-w-[460px] leading-[1.65] mb-10">
            The community for engineers and creators building with AI. Discover prompts, join discussions, and sharpen your skills.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
            <Button size="lg" onClick={() => checkAuthThenGo('register')}>
              Join the Community
            </Button>
            <Button variant="ghost" size="lg" onClick={() => setPage('prompts')}>
              Browse Prompts &rarr;
            </Button>
          </div>
          
          <div className="flex items-center gap-6 text-[13px] text-text-tertiary">
            <span className="flex items-center gap-1.5"><ArrowRight size={14} className="-rotate-45" /> 2,400 members</span>
            <span>&middot;</span>
            <span>850+ prompts</span>
            <span>&middot;</span>
            <span>120 lessons</span>
          </div>
        </motion.div>
        
        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <CodeWindow 
            code={sampleCode} 
            filename="prompt_builder.ts" 
            animated={true} 
            className="w-full max-w-[560px] min-h-[320px] ml-auto relative z-10"
          />
          
          {/* Floating Badges */}
          <div className="absolute -bottom-6 -left-6 z-20 flex flex-col gap-3">
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.6}} className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-border text-[12px] font-medium text-ink-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald"></span> GPT-4o
            </motion.div>
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.7}} className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-border text-[12px] font-medium text-ink-700 flex items-center gap-2 ml-4">
              <span className="w-2 h-2 rounded-full bg-amber"></span> Claude 3.5
            </motion.div>
            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.8}} className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-border text-[12px] font-medium text-ink-700 flex items-center gap-2 ml-8">
              <span className="w-2 h-2 rounded-full bg-accent"></span> Gemini
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* START HERE SECTION */}
      <section className="px-4 md:px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-[28px] font-semibold text-ink-900 mb-10 tracking-tight">Your learning path</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-px border-t border-dashed border-border-strong z-0" />
          
          {[
            {icon: Sparkles, color: 'text-amber', bg: 'bg-amber-light', title: 'Explore Prompts', desc: 'Find battle-tested prompts to use in your daily workflow immediately.', action: 'browse prompts', p: 'prompts'},
            {icon: Users, color: 'text-emerald', bg: 'bg-emerald-light', title: 'Join Discussions', desc: 'Ask questions and share your wins with a private community of peers.', action: 'join community', p: 'community'},
            {icon: GraduationCap, color: 'text-accent', bg: 'bg-accent-light', title: 'Take a Lesson', desc: 'Level up your skills with structured courses on modern AI APIs.', action: 'start learning', p: 'lessons'}
          ].map((step, i) => (
            <Card key={i} hover className="relative z-10 flex flex-col items-center text-center p-8">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 border border-bg ${step.bg} shadow-sm`}>
                <step.icon className={step.color} size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-ink-900 mb-3">{step.title}</h3>
              <p className="text-[14px] text-text-secondary mb-6 flex-1">{step.desc}</p>
              <Button variant="ghost" className="w-full text-accent" onClick={() => setPage(step.p)}>
                {step.action} &rarr;
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURED PROMPTS SECTION */}
      <section className="px-4 md:px-6 py-20 max-w-7xl mx-auto border-t border-border">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-[28px] font-semibold text-ink-900 tracking-tight">Top prompts</h2>
          <Button variant="ghost" onClick={() => setPage('prompts')} className="hidden sm:inline-flex">View all &rarr;</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 snap-x">
          {featuredPrompts.map((p) => (
            <Card key={p.id} hover className="flex flex-col min-w-[300px] snap-start cursor-pointer" onClick={() => setPage('prompts')}>
              <CardHeader className="flex flex-row justify-between items-start">
                <Badge variant="default">{p.cat}</Badge>
                <div className="text-[12px] font-medium text-text-secondary bg-bg-subtle px-2 py-0.5 rounded-full border border-border">GPT-4</div>
              </CardHeader>
              <CardBody className="py-4">
                <h3 className="text-[16px] font-semibold text-ink-900 mb-2 line-clamp-2 leading-tight">{p.title}</h3>
                <p className="text-[13px] text-text-secondary line-clamp-3 leading-relaxed">{p.text}</p>
              </CardBody>
              <CardFooter className="mt-auto flex justify-between items-center text-[12px] text-text-tertiary">
                <span className="flex items-center gap-1.5"><Bookmark size={14} className="text-text-disabled" /> 120 saves</span>
                <span className="flex items-center gap-1.5">Used 847x</span>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Button variant="secondary" className="w-full mt-6 sm:hidden" onClick={() => setPage('prompts')}>View all prompts</Button>
      </section>

      {/* COMMUNITY ACTIVITY */}
      <section className="px-4 md:px-6 py-20 max-w-7xl mx-auto bg-white border-y border-border">
        <h2 className="text-[28px] font-semibold text-ink-900 mb-10 tracking-tight">Latest from the community</h2>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Feed */}
          <div className="flex-1 flex flex-col gap-4">
            {recentPosts.map((post:any) => {
              const author = db.users.find((u:any) => u.id === post.uid) || { initials: '?', fname: 'User', lname: '' };
              return (
                <div key={post.id} className="p-5 border border-border rounded-xl bg-bg-subtle/50 hover:bg-bg-subtle transition-colors cursor-pointer" onClick={() => checkAuthThenGo('community')}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar size="md" initials={author.initials} />
                      <div>
                        <div className="text-[14px] font-semibold text-ink-900">{author.fname} {author.lname}</div>
                        <div className="text-[12px] text-text-tertiary">{formatTimeAgo(post.time)}</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-[16px] font-medium text-ink-900 mb-2 line-clamp-1">{post.text.substring(0, 80).replace(/<[^>]+>/g, '')}{post.text.length > 80 ? '...' : ''}</h3>
                  <div className="flex gap-4 mt-4 text-[13px] text-text-tertiary">
                    <span className="flex items-center gap-1.5 hover:text-rose transition-colors"><Search size={14}/> {post.likes.length}</span>
                    <span className="flex items-center gap-1.5 hover:text-accent transition-colors"><MessageSquare size={14}/> {(post.comments||[]).length} replies</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6">
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  <span className="text-[14px] font-semibold text-ink-900">42 Members Online</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[...Array(12)].map((_, i) => (
                    <Avatar key={i} size="sm" initials="U" className="opacity-80" />
                  ))}
                  <div className="w-[28px] h-[28px] rounded-full bg-bg-subtle border border-border flex items-center justify-center text-[10px] text-text-tertiary font-semibold">+30</div>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => checkAuthThenGo('community')}>Join the discussion</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* ACADEMY PREVIEW */}
      <section className="px-4 md:px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-[28px] font-semibold text-ink-900 mb-10 tracking-tight">
          {currentUser ? 'Continue learning' : 'Start your AI education'}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {academyLessons.map((lesson:any) => (
            <Card key={lesson.id} hover className="flex flex-col cursor-pointer overflow-hidden border-t-4 border-t-accent" onClick={() => setPage('lessons')}>
              <CardBody className="py-6 flex flex-col h-full">
                <Badge variant="accent" className="mb-4 self-start">Fundamentals</Badge>
                <h3 className="text-[17px] font-semibold text-ink-900 mb-3">{lesson.title}</h3>
                <p className="text-[13px] text-text-secondary line-clamp-2 mb-6 flex-1">{lesson.desc}</p>
                
                <div className="flex justify-between items-center text-[12px] text-text-tertiary mb-5">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {lesson.duration || '12 mins'}</span>
                  <span className="bg-bg-subtle px-2 py-0.5 rounded font-medium border border-border">Beginner</span>
                </div>
                
                {currentUser && <ProgressBar value={0} />}
              </CardBody>
              <CardFooter className="bg-bg-subtle border-t border-border py-3 px-6 flex justify-end">
                <span className="text-[13px] font-medium text-accent flex items-center gap-1">Start lesson <ChevronRight size={14}/></span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-[14px]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-accent rounded flex justify-center items-center">
                <div className="w-2.5 h-2.5 bg-white rounded-sm" />
              </div>
              <span className="font-semibold text-[16px] text-ink-900 tracking-tight">AILABS</span>
            </div>
            <p className="text-text-secondary max-w-[280px]">
              The community for engineers and creators building with AI in Bulgaria.
            </p>
            <div className="flex gap-4 mt-2 text-text-tertiary">
               <Twitter size={18} className="hover:text-text-primary cursor-pointer transition-colors" />
               <Github size={18} className="hover:text-text-primary cursor-pointer transition-colors" />
               <Linkedin size={18} className="hover:text-text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div className="flex gap-16 md:justify-center">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-ink-900 mb-2">Platform</h4>
              <button className="text-text-secondary hover:text-text-primary text-left transition-colors" onClick={()=>setPage('prompts')}>Prompts</button>
              <button className="text-text-secondary hover:text-text-primary text-left transition-colors" onClick={()=>setPage('lessons')}>Academy</button>
              <button className="text-text-secondary hover:text-text-primary text-left transition-colors" onClick={()=>setPage('community')}>Community</button>
              <button className="text-text-secondary hover:text-text-primary text-left transition-colors" onClick={()=>setPage('events')}>Events</button>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-ink-900 mb-2">Company</h4>
              <button className="text-text-secondary hover:text-text-primary text-left transition-colors" onClick={()=>setPage('about')}>About</button>
              <button className="text-text-secondary hover:text-text-primary text-left transition-colors" onClick={()=>setPage('contact')}>Contact</button>
              <span className="text-text-tertiary cursor-not-allowed">Terms</span>
              <span className="text-text-tertiary cursor-not-allowed">Privacy</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 md:items-end text-left md:text-right">
             <h4 className="font-semibold text-ink-900 mb-2">Community Stats</h4>
             <span className="text-text-secondary">2,400+ Active Members</span>
             <span className="text-text-secondary">850+ Shared Prompts</span>
             <span className="text-text-secondary">Over 10,000 lessons taken</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-text-tertiary">
          <span>&copy; {new Date().getFullYear()} AILABS BG. All rights reserved.</span>
          <span>A demo application.</span>
        </div>
      </footer>

    </div>
  );
}
