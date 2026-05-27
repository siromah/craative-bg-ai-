import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Lightbulb, GraduationCap, Calendar, Trophy, HelpCircle, Settings, Trash2, Heart, MessageSquare, Bookmark, Send, Sparkles, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Textarea } from '../components/ui/Input';

export default function Community({ db, updateDb, currentUser, openModal, showToast, setPage }: any) {
  const [feedFilter, setFeedFilter] = useState('all');
  const [compExpanded, setCompExpanded] = useState(false);
  const [compText, setCompText] = useState('');
  const [compType, setCompType] = useState('win');

  const addNotif = (text: string, icon = 'bell') => {
    const n = { id: 'n'+Date.now(), text, icon, time: Date.now(), read: false };
    updateDb('notifs', [n, ...db.notifs].slice(0, 50));
  };

  const submitPost = () => {
    if (!compText.trim()) { showToast('Type something before posting', true); return; }
    const nTypeLabel = { win: 'Win', question: 'Question', workflow: 'Workflow', 'prompt-share': 'Prompt' } as any;
    const newPost = {
      id: 'p' + Date.now(),
      uid: currentUser.id,
      type: compType,
      text: compText.trim(),
      tags: [nTypeLabel[compType] || compType],
      likes: [], saved: [], comments: [],
      time: Date.now(), pinned: false
    };
    updateDb('posts', [newPost, ...db.posts]);
    setCompText('');
    setCompExpanded(false);
    showToast('Post published');
  };

  const toggleLike = (pid: string) => {
    if(!currentUser) { openModal('login'); return; }
    const posts = [...db.posts];
    const i = posts.findIndex(p => p.id === pid);
    if (i !== -1) {
      const idx = posts[i].likes.indexOf(currentUser.id);
      if (idx === -1) {
        posts[i].likes.push(currentUser.id);
        addNotif(`${currentUser.fname} liked your post`, 'heart');
      } else {
        posts[i].likes.splice(idx, 1);
      }
      updateDb('posts', posts);
    }
  };

  const toggleSave = (pid: string) => {
    if(!currentUser) { openModal('login'); return; }
    const posts = [...db.posts];
    const i = posts.findIndex(p => p.id === pid);
    if (i !== -1) {
      if (!posts[i].saved) posts[i].saved = [];
      const idx = posts[i].saved.indexOf(currentUser.id);
      if (idx === -1) {
        posts[i].saved.push(currentUser.id);
        showToast('Saved');
      } else {
        posts[i].saved.splice(idx, 1);
        showToast('Removed from saved');
      }
      updateDb('posts', posts);
    }
  };

  const addComment = (pid: string, val: string) => {
    if(!currentUser) { openModal('login'); return; }
    if(!val.trim()) return;
    const posts = [...db.posts];
    const i = posts.findIndex(p => p.id === pid);
    if (i !== -1) {
      if(!posts[i].comments) posts[i].comments = [];
      posts[i].comments.push({ id: 'c'+Date.now(), uid: currentUser.id, text: val.trim(), time: Date.now() });
      updateDb('posts', posts);
      addNotif(`${currentUser.fname} commented on your post`, 'message');
    }
  };

  const delPost = (pid: string) => {
    if(!confirm('Delete this post?')) return;
    updateDb('posts', db.posts.filter((p:any) => p.id !== pid));
    showToast('Post deleted');
  };

  const fTime = (ts: number) => {
    const d = Date.now() - ts;
    if (d < 60000) return 'just now';
    if (d < 3600000) return `${Math.floor(d/60000)}m ago`;
    if (d < 86400000) return `${Math.floor(d/3600000)}h ago`;
    return `${Math.floor(d/86400000)}d ago`;
  };

  const getTypeInfo = (type: string) => {
    const m:any = {win:{label:'Win',variant:'success'},question:{label:'Question',variant:'info'},workflow:{label:'Workflow',variant:'warning'},'prompt-share':{label:'Prompt',variant:'accent'},announcement:{label:'Announcement',variant:'default'}};
    return m[type] || {label:type,variant:'neutral'};
  };

  let postsToRender = db.posts;
  if (feedFilter !== 'all') {
    postsToRender = postsToRender.filter((p:any) => p.type === feedFilter);
  }
  postsToRender.sort((a:any, b:any) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.time - a.time);

  const escH = (t: string) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return (
    <div className="min-h-screen warm-gradient text-text-primary px-4 md:px-6 py-6 md:py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:flex w-[260px] shrink-0 sticky top-[96px] flex-col gap-6 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
          
          {/* User Card */}
          {currentUser ? (
            <Card className="bg-bg">
              <CardBody className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar size="md" initials={currentUser.initials} />
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-ink-900 truncate">{currentUser.fname} {currentUser.lname}</div>
                    <div className="text-[12px] text-text-tertiary truncate">{currentUser.role || 'Community Member'}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="secondary" className="w-full justify-center rounded-xl" onClick={() => setPage('profile')}>My Profile</Button>
                  {currentUser.isAdmin && (
                    <Button variant="ghost" className="w-full justify-center text-rose rounded-xl" onClick={() => setPage('admin')}><Settings size={14}/> Admin Panel</Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className="bg-bg border-accent/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={64} className="text-accent" />
              </div>
              <CardBody className="p-5 relative z-10 flex flex-col items-start gap-4">
                <div>
                  <div className="text-[16px] font-bold text-ink-900 mb-1">Join the community</div>
                  <div className="text-[13px] text-text-secondary leading-relaxed">Connect with other builders and creators.</div>
                </div>
                <Button className="w-full rounded-xl" onClick={() => openModal('signup')}>Register Now</Button>
              </CardBody>
            </Card>
          )}

          {/* Navigation Links */}
          <div>
            <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-3 px-3">Navigation</div>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => setFeedFilter('all')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[14px] transition-colors border ${feedFilter === 'all' ? 'bg-bg text-ink-900 font-semibold border-border shadow-sm' : 'text-text-secondary border-transparent hover:bg-black/5 hover:text-ink-900'}`}
              >
                <div className="w-6 flex justify-center"><Home size={18} /></div> Live Feed
                <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full ${feedFilter === 'all' ? 'bg-accent text-white' : 'bg-border text-text-secondary'}`}>
                  {db.posts.length}
                </span>
              </button>
              <button onClick={() => setPage('prompts')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[14px] text-text-secondary border-transparent hover:bg-black/5 hover:text-ink-900 transition-colors">
                <div className="w-6 flex justify-center"><Lightbulb size={18} /></div> Prompts
              </button>
              <button onClick={() => setPage('lessons')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[14px] text-text-secondary border-transparent hover:bg-black/5 hover:text-ink-900 transition-colors">
                <div className="w-6 flex justify-center"><GraduationCap size={18} /></div> Academy
              </button>
              <button onClick={() => setPage('events')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[14px] text-text-secondary border-transparent hover:bg-black/5 hover:text-ink-900 transition-colors">
                <div className="w-6 flex justify-center"><Calendar size={18} /></div> Events
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-3 px-3">Filter Feed</div>
            <div className="flex flex-col gap-1">
              {[
                {id: 'win', label: 'Wins', icon: Trophy},
                {id: 'question', label: 'Questions', icon: HelpCircle},
                {id: 'workflow', label: 'Workflows', icon: Zap},
                {id: 'prompt-share', label: 'Prompts', icon: Lightbulb}
              ].map(f => (
                <button 
                  key={f.id}
                  onClick={() => setFeedFilter(f.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[14px] transition-colors border ${feedFilter === f.id ? 'bg-bg text-ink-900 font-semibold border-border shadow-sm' : 'text-text-secondary border-transparent hover:bg-black/5 hover:text-ink-900'}`}
                >
                  <div className="w-6 flex justify-center"><f.icon size={18} /></div> {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - MAIN FEED */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          
          <div className="mb-2 lg:mb-6">
            <h1 className="text-[28px] md:text-[36px] font-semibold text-ink-900 tracking-tight mb-2">Community Feed</h1>
            <p className="text-[16px] text-text-secondary">Discuss tools, share prompts, and ask questions.</p>
          </div>

          {/* Mobile Categories (Horizontal Roll) */}
          <div className="flex lg:hidden overflow-x-auto gap-2 pb-4 snap-x custom-scrollbar hide-scrollbar">
            <Badge variant={feedFilter === 'all' ? 'default' : 'outline'} className="cursor-pointer snap-start shrink-0 rounded-full px-3 py-1" onClick={() => setFeedFilter('all')}>All Posts</Badge>
            <Badge variant={feedFilter === 'win' ? 'default' : 'outline'} className="cursor-pointer snap-start shrink-0 rounded-full px-3 py-1" onClick={() => setFeedFilter('win')}>Wins</Badge>
            <Badge variant={feedFilter === 'question' ? 'default' : 'outline'} className="cursor-pointer snap-start shrink-0 rounded-full px-3 py-1" onClick={() => setFeedFilter('question')}>Questions</Badge>
            <Badge variant={feedFilter === 'workflow' ? 'default' : 'outline'} className="cursor-pointer snap-start shrink-0 rounded-full px-3 py-1" onClick={() => setFeedFilter('workflow')}>Workflows</Badge>
            <Badge variant={feedFilter === 'prompt-share' ? 'default' : 'outline'} className="cursor-pointer snap-start shrink-0 rounded-full px-3 py-1" onClick={() => setFeedFilter('prompt-share')}>Prompts</Badge>
          </div>

          {/* Composer */}
          {currentUser ? (
            <Card className="bg-bg border-border/50">
              <CardBody className="p-4 sm:p-6">
                <div className="flex gap-4 items-start">
                  <Avatar size="md" initials={currentUser.initials} className="hidden sm:flex" />
                  <div className="flex-1 min-w-0">
                    {!compExpanded ? (
                      <button 
                        onClick={() => setCompExpanded(true)}
                        className="w-full text-left px-5 py-3.5 bg-bg-subtle text-text-tertiary border border-border/50 rounded-full text-[14px] hover:bg-black/5 transition-colors"
                      >
                        Share a workflow, question, or win...
                      </button>
                    ) : (
                      <motion.div initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}}>
                        <Textarea 
                          value={compText} 
                          onChange={(e:any)=>setCompText(e.target.value)} 
                          placeholder="Write something helpful for the community..."
                          autoFocus
                          className="min-h-[120px] mb-3 text-[15px] rounded-xl" 
                        />
                        
                        <div className="flex flex-col gap-3 mb-6">
                          <label className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider">Select Topic</label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              {id: 'win', label: 'Win'},
                              {id: 'question', label: 'Question'},
                              {id: 'workflow', label: 'Workflow'},
                              {id: 'prompt-share', label: 'Prompt'}
                            ].map(t => (
                              <Badge 
                                key={t.id} 
                                variant={compType === t.id ? 'accent' : 'outline'}
                                className="cursor-pointer text-[13px] py-1.5 px-3 rounded-full"
                                onClick={() => setCompType(t.id)}
                              >
                                {t.label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end items-center gap-3 pt-4 border-t border-border">
                          <Button variant="ghost" onClick={() => setCompExpanded(false)} className="rounded-full">Cancel</Button>
                          <Button onClick={submitPost} disabled={!compText.trim()} className="rounded-full"><Send size={16}/> Post</Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className="bg-bg border-accent/20 p-8 text-center bg-gradient-to-br from-bg to-accent/5">
              <h2 className="text-[20px] font-semibold text-ink-900 mb-2 tracking-tight">Log in to post</h2>
              <p className="text-[15px] text-text-secondary mb-6">Join the community to share your thoughts and workflows.</p>
              <div className="flex justify-center gap-4">
                <Button variant="secondary" className="rounded-full" onClick={() => openModal('login')}>Log In</Button>
                <Button className="rounded-full" onClick={() => openModal('signup')}>Register</Button>
              </div>
            </Card>
          )}

          {/* Feed List */}
          <div className="flex flex-col gap-6">
            {postsToRender.length === 0 ? (
              <Card className="bg-bg-subtle border-dashed border-2 py-16 text-center">
                <h3 className="text-[18px] font-semibold text-ink-900 mb-2">No posts found</h3>
                <p className="text-text-secondary mb-6">Be the first to share something in this category.</p>
                <Button variant="secondary" className="rounded-full" onClick={() => {setFeedFilter('all'); setCompExpanded(true);}}>Post now</Button>
              </Card>
            ) : (
              <AnimatePresence>
                {postsToRender.map((p:any) => (
                  <motion.div
                    key={p.id}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, scale: 0.95}}
                    transition={{duration: 0.2}}
                  >
                    <PostCard 
                      p={p} db={db} currentUser={currentUser} openModal={openModal} 
                      toggleLike={toggleLike} toggleSave={toggleSave} addComment={addComment} 
                      delPost={delPost} fTime={fTime} getTypeInfo={getTypeInfo} escH={escH} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden xl:flex w-[280px] shrink-0 sticky top-[96px] flex-col gap-6 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pl-2">
          <Card className="bg-bg">
            <CardBody className="p-5">
              <div className="flex items-center gap-2 mb-4 text-[13px] font-bold text-text-tertiary uppercase tracking-wider">
                <Trophy size={16} className="text-amber" /> Latest Wins
              </div>
              <div className="flex flex-col gap-3">
                {db.posts.filter((p:any) => p.type === 'win').slice(0,3).map((p:any) => {
                  const a = db.users.find((u:any) => u.id === p.uid) || {fname:'?'};
                  return (
                    <div key={p.id} className="flex gap-3 p-3 bg-bg-subtle border border-border/50 rounded-xl items-start">
                      <Avatar size="sm" initials={a.initials || a.fname.charAt(0)} />
                      <div className="text-[13px] text-text-secondary leading-snug">
                        <span className="font-semibold text-ink-900">{a.fname}</span>{' '}
                        {p.text.substring(0,50)}{p.text.length > 50 ? '...' : ''}
                      </div>
                    </div>
                  );
                })}
                {db.posts.filter((p:any) => p.type === 'win').length === 0 && (
                  <p className="text-[13px] text-text-tertiary">No wins shared yet.</p>
                )}
              </div>
            </CardBody>
          </Card>
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

function PostCard({ p, db, currentUser, openModal, toggleLike, toggleSave, addComment, delPost, fTime, getTypeInfo, escH }: any) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const a = db.users.find((u:any) => u.id === p.uid) || {initials:'?',color:'var(--s2)',tc:'var(--txt2)',fname:'User',lname:''};
  const liked = currentUser && p.likes.includes(currentUser.id);
  const saved = currentUser && p.saved && p.saved.includes(currentUser.id);
  const isOwn = currentUser && p.uid === currentUser.id;
  const isAdmin = currentUser && currentUser.isAdmin;
  const ti = getTypeInfo(p.type);

  return (
    <Card className="bg-bg border-border/50">
      <CardBody className="p-5 sm:p-7 relative">
        {p.pinned && (
          <div className="absolute top-0 right-7 bg-amber-light text-amber px-3 py-1 text-[11px] font-bold rounded-b-lg border-x border-b border-amber/20 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={12} /> Pinned
          </div>
        )}
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Avatar size="md" initials={a.initials} />
            <div>
              <div className="text-[15px] font-semibold text-ink-900">{a.fname} {a.lname}</div>
              <div className="text-[12px] text-text-tertiary flex items-center gap-2 mt-0.5">
                {fTime(p.time)}
                <span className="w-1 h-1 rounded-full bg-border-strong"></span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                    ti.variant === 'success' ? 'bg-emerald-light text-emerald border-emerald/20' :
                    ti.variant === 'info' ? 'bg-sky-50 text-sky-600 border-sky-100' :
                    ti.variant === 'warning' ? 'bg-amber-light text-amber border-amber/20' :
                    'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  {ti.label}
                </span>
              </div>
            </div>
          </div>
          
          {(isOwn || isAdmin) && (
            <div className="relative group cursor-pointer p-2 -mr-2">
              <span className="text-text-tertiary group-hover:text-ink-900 flex flex-col gap-1 px-1">
                <span className="w-1 h-1 bg-current rounded-full"></span>
                <span className="w-1 h-1 bg-current rounded-full"></span>
                <span className="w-1 h-1 bg-current rounded-full"></span>
              </span>
              <div className="absolute top-full right-0 mt-1 bg-bg border border-border shadow-md rounded-xl py-1 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                <button onClick={() => delPost(p.id)} className="w-full text-left px-4 py-2 text-[13px] font-medium hover:bg-rose-50 text-rose transition-colors flex items-center gap-2">
                  <Trash2 size={14} /> Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-[15px] text-ink-900 leading-[1.65] mb-5 whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{__html: escH(p.text)}} />
        
        {p.tags && p.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {p.tags.map((t:string) => (
              <Badge key={t} variant="outline" className="text-[12px] rounded-full">{t}</Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <button 
            onClick={() => toggleLike(p.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${liked ? 'bg-rose-50 text-rose border-rose-100' : 'bg-bg-subtle text-text-secondary border-transparent hover:bg-black/5 hover:text-ink-900'}`}
          >
            <Heart size={16} className={liked ? "fill-rose text-rose" : ""} /> {p.likes.length}
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${showComments ? 'bg-black/5 text-ink-900 border-border' : 'bg-bg-subtle text-text-secondary border-transparent hover:bg-black/5 hover:text-ink-900'}`}
          >
            <MessageSquare size={16} /> {(p.comments||[]).length}
          </button>
          
          <div className="flex-1"></div>
          
          <button 
            onClick={() => toggleSave(p.id)}
            className={`flex items-center gap-2 p-2 rounded-full border transition-colors ${saved ? 'bg-emerald-light text-emerald border-emerald/20' : 'bg-transparent text-text-tertiary border-transparent hover:bg-black/5 hover:text-ink-900'}`}
          >
            <Bookmark size={18} className={saved ? "fill-emerald text-emerald" : ""} />
          </button>
        </div>

        {/* COMMENTS SECTION */}
        <AnimatePresence>
          {showComments && (
            <motion.div 
              initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} transition={{duration: 0.2}}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-border">
                {(!p.comments || p.comments.length === 0) ? (
                  <div className="text-[13px] text-text-tertiary text-center py-6">No comments yet. Start the conversation.</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {p.comments.map((c:any) => {
                      const ca = db.users.find((u:any) => u.id === c.uid) || {initials:'?',color:'var(--s2)',tc:'var(--txt2)',fname:'?',lname:''};
                      return (
                        <div key={c.id} className="flex gap-3">
                          <Avatar size="sm" initials={ca.initials} />
                          <div className="flex-1 bg-bg-subtle p-3.5 rounded-2xl rounded-tl-sm border border-border/50">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-[13px] font-semibold text-ink-900">{ca.fname} {ca.lname}</span>
                              <span className="text-[11px] text-text-tertiary">{fTime(c.time)}</span>
                            </div>
                            <div className="text-[14px] leading-snug text-text-primary whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: escH(c.text)}} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {currentUser ? (
                  <div className="flex gap-3 mt-6">
                    <Avatar size="md" initials={currentUser.initials} className="hidden sm:flex" />
                    <div className="flex-1 flex gap-2">
                      <input 
                        className="flex-1 w-full bg-bg border border-border/50 rounded-full px-4 py-2 text-[14px] text-ink-900 placeholder:text-text-disabled focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors shadow-sm"
                        placeholder="Write a comment..." 
                        value={commentText} 
                        onChange={e=>setCommentText(e.target.value)} 
                        onKeyDown={e => { if(e.key === 'Enter') { addComment(p.id, commentText); setCommentText(''); } }} 
                      />
                      <Button onClick={() => { addComment(p.id, commentText); setCommentText(''); }} className="rounded-full px-4 shrink-0" disabled={!commentText.trim()}>
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 text-center text-[13px] text-text-secondary bg-bg-subtle p-4 rounded-xl border border-border/50">
                    <button className="text-accent font-semibold hover:underline" onClick={() => openModal('login')}>Log in</button> to comment on this post.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardBody>
    </Card>
  );
}
