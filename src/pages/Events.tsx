import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Video, CheckCircle2 } from 'lucide-react';
import { EVENTS_DATA } from '../data';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

export default function Events({ currentUser, openModal, showToast }: any) {
  const [joined, setJoined] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ailabs_joinedEvents');
      if (raw) setJoined(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ailabs_joinedEvents', JSON.stringify(joined));
  }, [joined]);

  const handleJoin = (id: string) => {
    if (!currentUser) { openModal('login'); return; }
    if (joined.includes(id)) return;
    setJoined([...joined, id]);
    showToast('Successfully registered. Check your email.');
  };

  return (
    <div className="min-h-screen warm-gradient text-text-primary px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="accent" className="rounded-full">Calendar</Badge>
          <h1 className="text-[40px] md:text-[56px] font-semibold text-ink-900 tracking-tight leading-tight">
            Upcoming Events
          </h1>
          <p className="text-[18px] md:text-[20px] text-text-secondary max-w-2xl leading-relaxed">
            AI workshops, live Q&A, and office hours with our core engineers. Exclusive for community members.
          </p>
          <div className="flex items-center gap-2 text-text-tertiary text-[14px] font-medium mt-2">
            <span>{EVENTS_DATA.length} upcoming</span>
            <span className="w-1 h-1 rounded-full bg-border-strong"></span>
            <span>{joined.length} joined</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          {EVENTS_DATA.length === 0 ? (
            <Card className="bg-bg-subtle border-dashed border-2 py-16 text-center">
              <h3 className="text-[18px] font-semibold text-ink-900 mb-2">No upcoming events</h3>
              <p className="text-text-secondary">Check back soon for new workshops and office hours.</p>
            </Card>
          ) : EVENTS_DATA.map((e:any) => {
            const isJoined = joined.includes(e.id);
            return (
              <motion.div 
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.4}}
                key={e.id}
              >
                <Card className="bg-bg transition-shadow hover:shadow-md border-border/50 group overflow-hidden relative">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${isJoined ? 'bg-emerald' : 'bg-border-strong group-hover:bg-accent transition-colors'}`}></div>
                  <CardBody className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
                    
                    {/* Date Block */}
                    <div className={`flex flex-col items-center justify-center shrink-0 w-24 h-24 rounded-2xl border transition-colors ${
                      isJoined 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald' 
                        : 'bg-bg-subtle border-border/50 text-ink-900 group-hover:bg-bg group-hover:border-accent/20'
                    }`}>
                      <span className="text-[32px] font-bold leading-none tracking-tight mb-1">{e.day}</span>
                      <span className="text-[12px] font-semibold uppercase tracking-widest opacity-80">{e.mo}</span>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {isJoined ? (
                          <Badge variant="success" className="gap-1 px-2 rounded-full"><CheckCircle2 size={12} /> Registered</Badge>
                        ) : (
                          <Badge variant="outline" className="rounded-full">Upcoming</Badge>
                        )}
                        <Badge variant="outline" className="gap-1.5 opacity-80 border-dashed rounded-full">
                          <Video size={12} className="text-text-tertiary" /> {e.platform}
                        </Badge>
                      </div>
                      
                      <h3 className="text-[22px] md:text-[24px] font-semibold text-ink-900 leading-tight mb-2">
                        {e.title}
                      </h3>
                      
                      <p className="text-[15px] text-text-secondary leading-relaxed mb-5 max-w-2xl">
                        {e.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-[13px] font-medium text-text-tertiary bg-bg-subtle rounded-xl px-4 py-3 inline-flex items-center">
                        <span className="flex items-center gap-1.5">
                          <Clock size={16} className="text-text-disabled" /> {e.time}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border-strong"></span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={16} className="text-text-disabled" /> {e.dur}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border-strong"></span>
                        <span className="flex items-center gap-1.5 text-ink-900">
                          <Users size={16} className="text-accent" /> {e.spots} spots left
                        </span>
                      </div>
                    </div>
                    
                    {/* Action */}
                    <div className="w-full md:w-auto shrink-0 md:ml-4">
                      {isJoined ? (
                        <div className="w-full md:w-32 py-3 px-4 rounded-xl font-medium text-center bg-emerald-50 text-emerald text-[14px]">
                          Joined
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleJoin(e.id)} 
                          className="w-full md:w-auto min-w-[140px] rounded-full"
                        >
                          Save My Spot
                        </Button>
                      )}
                    </div>
                    
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
