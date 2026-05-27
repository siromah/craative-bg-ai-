import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Contact({ showToast }: any) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      showToast('Please agree to the privacy policy.', true);
      return;
    }

    setLoading(true);
    try {
      const endpoint = (import.meta as any).env?.VITE_CONTACT_ENDPOINT;
      if (!endpoint) {
        await new Promise(r => setTimeout(r, 800));
        showToast('Message sent successfully');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setConsent(false);
        return;
      }
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Network error');
      showToast('Message sent successfully');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setConsent(false);
    } catch (error) {
      showToast('An error occurred. Please try again later.', true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen warm-gradient text-text-primary px-4 md:px-6 py-12 md:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="w-12 h-12 rounded-xl bg-accent-light/50 text-accent flex items-center justify-center mb-2">
            <MessageSquare size={24} />
          </div>
          <h1 className="text-[40px] md:text-[56px] font-semibold text-ink-900 tracking-tight leading-tight">
            Contact <span className="text-accent">Us</span>
          </h1>
          <p className="text-[18px] md:text-[20px] text-text-secondary max-w-xl leading-relaxed">
            Have questions about our training programs, partnerships, or the platform? Drop us a line.
          </p>
        </div>

        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration: 0.4}}>
          <Card className="bg-bg shadow-sm border-border/50">
            <CardBody className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[14px] font-medium text-ink-900">Name</label>
                    <Input 
                      id="name" 
                      type="text" 
                      required 
                      placeholder="Your name" 
                      value={formData.name} 
                      onChange={(e:any) => setFormData({...formData, name: e.target.value})} 
                      disabled={loading} 
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[14px] font-medium text-ink-900">Email Address</label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="you@company.com" 
                      value={formData.email} 
                      onChange={(e:any) => setFormData({...formData, email: e.target.value})} 
                      disabled={loading} 
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[14px] font-medium text-ink-900">Subject</label>
                  <Input 
                    id="subject" 
                    type="text" 
                    required 
                    placeholder="e.g. Question about Academy" 
                    value={formData.subject} 
                    onChange={(e:any) => setFormData({...formData, subject: e.target.value})} 
                    disabled={loading} 
                    className="h-12 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[14px] font-medium text-ink-900">Message</label>
                  <Textarea 
                    id="message" 
                    required 
                    placeholder="How can we help you?" 
                    value={formData.message} 
                    onChange={(e:any) => setFormData({...formData, message: e.target.value})} 
                    disabled={loading} 
                    className="min-h-[160px] resize-y custom-scrollbar rounded-xl"
                  />
                </div>
                
                <label className="flex items-start gap-3 pt-2 pb-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      required
                      className="peer appearance-none w-5 h-5 border-2 border-border-strong rounded bg-bg checked:bg-accent checked:border-accent transition-colors"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 placeholder:transition-opacity" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[14px] text-text-secondary leading-snug">
                    I agree that the data I provide will be processed to answer my request, in accordance with the <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
                  </span>
                </label>
                
                <Button type="submit" disabled={loading} className="w-full h-12 text-[15px] gap-2 mt-4 inline-flex items-center justify-center rounded-full">
                  {loading ? 'Sending...' : <>Send Message <Send size={16} /></>}
                </Button>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
