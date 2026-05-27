import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bookmark, Copy, Lightbulb, Check } from 'lucide-react';
import { PROMPTS } from '../data';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';

export default function Prompts({ db, updateDb, showToast }: any) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const saved = db.savedPrompts || [];
  
  const filtered = PROMPTS.filter((p:any) => {
    if (savedOnly && !saved.includes(p.id)) return false;
    if (cat !== 'all' && p.cat !== cat) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getCatVariant = (c: string) => {
    if (c === 'marketing') return 'accent';
    if (c === 'automation') return 'default';
    if (c === 'content') return 'info';
    if (c === 'productivity') return 'warning';
    return 'neutral';
  };

  const catN:any = {marketing:'Marketing',business:'Business',content:'Content',productivity:'Productivity',automation:'Automation'};

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      showToast('Prompt copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const toggleSave = (id: string) => {
    let newSaved;
    if (saved.includes(id)) {
      newSaved = saved.filter((x:string) => x !== id);
      showToast('Removed from saved');
    } else {
      newSaved = [...saved, id];
      showToast('Saved to library 🔖');
    }
    updateDb('savedPrompts', newSaved);
  };

  return (
    <div className="min-h-screen bg-bg-subtle text-text-primary px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="accent">Prompt Library</Badge>
          <h1 className="text-[40px] md:text-[56px] font-semibold text-ink-900 tracking-tight leading-tight">
            AI Prompt Library
          </h1>
          <p className="text-[18px] md:text-[20px] text-text-secondary max-w-2xl leading-relaxed">
            {PROMPTS.length} ready-to-use, tested prompts for business, marketing, productivity, and automation. Just copy and paste.
          </p>
          <div className="flex items-center gap-2 text-text-tertiary text-[14px] font-medium mt-2">
            <span>{PROMPTS.length} total</span>
            <span className="w-1 h-1 rounded-full bg-border-strong"></span>
            <span>{saved.length} saved</span>
            <span className="w-1 h-1 rounded-full bg-border-strong"></span>
            <span>{filtered.length} results</span>
          </div>
        </div>
        
        {/* FILTERS */}
        <div className="bg-bg border border-border p-4 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
            <Input 
              value={search} 
              onChange={(e:any)=>setSearch(e.target.value)} 
              placeholder="Search prompts..." 
              className="pl-11 h-12 rounded-xl text-[15px] border-border bg-bg-subtle"
            />
          </div>
          
          <Button 
            variant={savedOnly ? 'default' : 'secondary'}
            onClick={() => setSavedOnly(v => !v)}
            className="h-12 w-full md:w-auto shrink-0 rounded-xl px-6"
          >
            <Bookmark size={16} className={savedOnly ? "fill-white" : ""} /> Saved ({saved.length})
          </Button>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar snap-x snap-mandatory">
            {['all', 'marketing', 'business', 'content', 'productivity', 'automation'].map(c => (
              <button 
                key={c}
                onClick={() => setCat(c)}
                className={`snap-start shrink-0 px-5 h-12 rounded-xl text-[14px] font-semibold transition-all border ${
                  cat === c 
                    ? 'bg-ink-900 text-white border-ink-900 shadow-md' 
                    : 'bg-bg-subtle text-text-secondary border-border hover:bg-black/5 hover:text-ink-900'
                }`}
              >
                {c === 'all' ? 'All Categories' : catN[c]}
              </button>
            ))}
          </div>
        </div>
        
        {/* GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-2xl bg-bg-subtle flex flex-col items-center">
                <Search size={48} className="text-text-disabled mb-4" />
                <h3 className="text-[20px] font-semibold text-ink-900 mb-2">No prompts found</h3>
                <p className="text-text-secondary mb-6 max-w-md">Try searching for different keywords or clearing your active filters.</p>
                <Button variant="secondary" onClick={() => {setSearch(''); setCat('all'); setSavedOnly(false);}}>Clear Filters</Button>
              </motion.div>
            ) : filtered.map((p:any) => {
              const isSaved = saved.includes(p.id);
              const isCopied = copiedId === p.id;
              return (
                <motion.div 
                  layout
                  initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.95}} transition={{duration: 0.2}}
                  key={p.id}
                  className="flex"
                >
                  <Card className="flex flex-col w-full bg-bg border-border-strong hover:border-text-tertiary transition-colors relative group shadow-sm hover:shadow-md">
                    <CardBody className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <div className="space-y-3">
                          <Badge variant={getCatVariant(p.cat) as any} className="uppercase tracking-wider text-[10px]">
                            {catN[p.cat]||p.cat}
                          </Badge>
                          <h3 className="text-[18px] font-semibold text-ink-900 leading-tight">
                            {p.title}
                          </h3>
                        </div>
                        <button 
                          className={`shrink-0 p-2 rounded-full transition-colors border ${isSaved ? 'bg-emerald-50 text-emerald border-emerald-200' : 'bg-bg-subtle text-text-tertiary border-transparent hover:bg-black/5 hover:text-ink-900'}`} 
                          onClick={() => toggleSave(p.id)}
                        >
                          <Bookmark size={18} className={isSaved ? "fill-emerald" : ""} />
                        </button>
                      </div>
                      
                      <div className="bg-ink-900 text-slate-300 font-mono text-[13px] leading-[1.6] p-4 rounded-xl border border-slate-800 flex-1 max-h-[180px] overflow-y-auto custom-scrollbar whitespace-pre-wrap selection:bg-accent/30 selection:text-white relative group/code shadow-inner">
                        {p.text}
                        <div className="absolute top-0 right-0 w-full h-12 bg-gradient-to-b from-ink-900/80 to-transparent pointer-events-none opacity-0 group-hover/code:opacity-100 transition-opacity"></div>
                      </div>
                    </CardBody>
                    
                    <CardFooter className="px-6 py-4 border-t border-border bg-bg-subtle flex justify-between items-center rounded-b-2xl">
                      <div className="text-[13px] text-text-tertiary font-medium flex items-center gap-1.5">
                        <Bookmark size={14}/> {p.saves || '10+'} saves
                      </div>
                      <Button 
                        size="sm" 
                        variant={isCopied ? 'secondary' : 'default'}
                        onClick={() => copy(p.id, p.text)}
                        className="rounded-full pl-3 pr-4"
                      >
                        {isCopied ? <Check size={14}/> : <Copy size={14}/>} 
                        {isCopied ? 'Copied' : 'Copy'}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 10px; }
        .bg-ink-900.custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}</style>
    </div>
  );
}
