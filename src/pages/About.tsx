import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Zap, Briefcase, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function About({ openModal }: any) {
  return (
    <div className="min-h-screen bg-bg-subtle text-text-primary px-4 md:px-6 py-12 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-6">
          <Badge variant="accent" className="mb-4">Our Mission</Badge>
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-semibold tracking-tight text-ink-900 leading-[1.1] max-w-3xl mx-auto">
            Practical AI Systems <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">for Modern Business.</span>
          </h1>
          <p className="text-[18px] md:text-[22px] text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
            AILABSBG is a community and educational platform focused on implementing AI technologies into real workflows. No fluff, just practical execution.
          </p>
        </div>
        
        {/* MISSION STATEMENT */}
        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration: 0.5}}>
          <Card className="bg-bg shadow-sm border-border-strong relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <CardBody className="p-8 md:p-12 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-light/10 flex items-center justify-center text-accent">
                  <Target size={24} />
                </div>
                <h2 className="text-[24px] md:text-[28px] font-semibold text-ink-900 tracking-tight">The Problem We Solve</h2>
              </div>
              
              <div className="space-y-6 text-[16px] md:text-[18px] text-text-secondary leading-relaxed max-w-3xl">
                <p>
                  Our goal is to help professionals and businesses understand and apply AI tools effectively in their day-to-day operations.
                </p>
                <p>
                  The reality is that superficial use of language models (like copy-pasting standard chat queries) does not yield lasting results or competitive advantage. Meaningful impact requires <strong className="text-ink-900 font-semibold">systematic prompts, clear workflows, and a deep understanding of AI capabilities</strong>.
                </p>
                <p>
                  That's why we built this platform—to consolidate verified practices, structured training courses, and a community of like-minded builders who share what actually works.
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
        
        {/* WHO IS THIS FOR */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-[28px] md:text-[36px] font-semibold text-ink-900 tracking-tight mb-4">Who is AILABSBG for?</h2>
            <p className="text-text-secondary text-[16px] md:text-[18px]">Designed for professionals driving real change.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration: 0.5, delay: 0.1}}>
              <Card className="h-full bg-bg shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-8 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-[20px] font-semibold text-ink-900">Entrepreneurs</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    Optimize operations, scale content creation, and build marketing automations that free up your time for strategic growth.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration: 0.5, delay: 0.2}}>
              <Card className="h-full bg-bg shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-8 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-[20px] font-semibold text-ink-900">Marketers</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    Generate stronger ideas, analyze complex localized data, personalize outreach at scale, and accelerate your campaign velocity.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration: 0.5, delay: 0.3}}>
              <Card className="h-full bg-bg shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-8 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <h3 className="text-[20px] font-semibold text-ink-900">Teams</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    Build internal AI tools and shared knowledge bases that increase productivity and consistency across your entire organization.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* CTA */}
        <motion.div initial={{opacity:0, scale:0.95}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration: 0.4}}>
          <div className="text-center p-12 md:p-16 rounded-[32px] bg-ink-900 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-accent/20 to-transparent"></div>
             <div className="relative z-10 flex flex-col items-center">
               <h2 className="text-[32px] md:text-[40px] font-semibold mb-4 tracking-tight">Ready to build the future?</h2>
               <p className="text-[18px] text-slate-300 mb-8 max-w-lg mx-auto">
                 Join a community of forward-thinking builders and unlock access to lessons, prompts, and exclusive events.
               </p>
               <Button size="lg" onClick={() => openModal('signup')} className="gap-2 px-8 h-14 bg-white text-ink-900 hover:bg-slate-100 rounded-full text-[16px]">
                 Join the Community <ChevronRight size={18} />
               </Button>
             </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
