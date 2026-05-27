import React, { useState } from 'react';
import { EVENTS_DATA, PROMPTS } from '../data';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar, 
  Sparkles,
  Trash2,
  Pin,
  PinOff
} from 'lucide-react';

export default function Admin({ db, updateDb, showToast }: any) {
  const [sec, setSec] = useState('dashboard');
  
  const users = db.users;
  const posts = db.posts;

  const adminDelUser = (uid: string) => {
    if (uid === 'admin') { showToast('Cannot delete admin account', true); return; }
    if (!confirm('Delete this user?')) return;
    updateDb('users', users.filter((u:any) => u.id !== uid));
    showToast('User deleted');
  };

  const deletePost = (pid: string) => {
    if (!confirm('Delete this post?')) return;
    updateDb('posts', posts.filter((p:any) => p.id !== pid));
    showToast('Post deleted');
  };

  const togglePin = (pid: string) => {
    const pIndex = posts.findIndex((x:any) => x.id === pid);
    if(pIndex !== -1) {
      const newPosts = [...posts];
      newPosts[pIndex].pinned = !newPosts[pIndex].pinned;
      updateDb('posts', newPosts);
      showToast(newPosts[pIndex].pinned ? 'Pinned' : 'Unpinned');
    }
  };

  const renderSec = () => {
    if(sec === 'dashboard') return (
      <div className="animate-in fade-in duration-300">
        <h2 className="text-[24px] font-semibold tracking-tight text-ink-900 mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden bg-bg shadow-sm border-border/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
            <CardBody className="p-6">
              <div className="text-[36px] font-bold text-accent mb-1">{users.length}</div>
              <div className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Users</div>
            </CardBody>
          </Card>
          <Card className="relative overflow-hidden bg-bg shadow-sm border-border/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber"></div>
            <CardBody className="p-6">
              <div className="text-[36px] font-bold text-amber mb-1">{posts.length}</div>
              <div className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Posts</div>
            </CardBody>
          </Card>
          <Card className="relative overflow-hidden bg-bg shadow-sm border-border/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald"></div>
            <CardBody className="p-6">
              <div className="text-[36px] font-bold text-emerald mb-1">{posts.reduce((s:number,p:any)=>s+(p.comments||[]).length,0)}</div>
              <div className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Comments</div>
            </CardBody>
          </Card>
          <Card className="relative overflow-hidden bg-bg shadow-sm border-border/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-rose"></div>
            <CardBody className="p-6">
              <div className="text-[36px] font-bold text-rose mb-1">{EVENTS_DATA.length}</div>
              <div className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Events</div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
    
    if (sec === 'users') return (
      <div className="animate-in fade-in duration-300">
        <h2 className="text-[24px] font-semibold tracking-tight text-ink-900 mb-6">Users ({users.length})</h2>
        <Card className="bg-bg shadow-sm overflow-hidden border border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-bg-subtle border-b border-border">
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider">User</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Role</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Joined</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u:any) => (
                  <tr key={u.id} className="hover:bg-bg-subtle/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar initials={u.initials} size="sm" />
                        <span className="font-semibold text-[14px] text-ink-900">{u.fname} {u.lname}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[14px] text-text-secondary">{u.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={u.isAdmin ? 'danger' : 'default'} className="px-2.5 py-1 rounded-full">
                        {u.isAdmin ? 'Admin' : u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-[14px] text-text-tertiary">{u.joined}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => adminDelUser(u.id)} className="text-rose hover:bg-rose-light/50 h-8 px-2 group rounded-full">
                        <Trash2 size={16} className="text-rose opacity-70 group-hover:opacity-100" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
    
    if (sec === 'posts') return (
      <div className="animate-in fade-in duration-300">
        <h2 className="text-[24px] font-semibold tracking-tight text-ink-900 mb-6">Posts ({posts.length})</h2>
        <Card className="bg-bg shadow-sm overflow-hidden border border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-bg-subtle border-b border-border">
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Author</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Content</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Likes</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider">Pinned</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((p:any) => {
                  const a = users.find((u:any) => u.id === p.uid) || {fname:'?',lname:''};
                  return (
                    <tr key={p.id} className="hover:bg-bg-subtle/50 transition-colors">
                      <td className="py-3 px-4 text-[14px] font-semibold text-ink-900 whitespace-nowrap">{a.fname} {a.lname}</td>
                      <td className="py-3 px-4 text-[14px] text-text-secondary max-w-[300px] truncate">{p.text}</td>
                      <td className="py-3 px-4 text-[14px] text-text-secondary">{p.likes.length}</td>
                      <td className="py-3 px-4 text-[14px] text-text-secondary">{p.pinned ? 'Yes' : '-'}</td>
                      <td className="py-3 px-4 text-right flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => togglePin(p.id)} className="h-8 px-2 text-text-secondary hover:text-ink-900 rounded-full">
                          {p.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deletePost(p.id)} className="text-rose hover:bg-rose-light/50 h-8 px-2 group rounded-full">
                          <Trash2 size={16} className="text-rose opacity-70 group-hover:opacity-100" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
    
    if (sec === 'events-a') return (
      <div className="animate-in fade-in duration-300">
        <h2 className="text-[24px] font-semibold tracking-tight text-ink-900 mb-6">Events ({EVENTS_DATA.length})</h2>
        <div className="space-y-4">
          {EVENTS_DATA.map((e:any) => (
            <Card key={e.id} className="bg-bg shadow-sm border-border/50">
              <CardBody className="p-5 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <div className="font-semibold text-[16px] text-ink-900 mb-1 leading-tight">{e.title}</div>
                  <div className="text-[13px] text-text-secondary font-medium">{e.day} {e.mo} &middot; {e.time} &middot; {e.spots} spots left</div>
                </div>
                <Badge variant="success" className="px-3 py-1.5 whitespace-nowrap rounded-full">Active</Badge>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
    
    if (sec === 'prompts-a') return (
      <div className="animate-in fade-in duration-300">
        <h2 className="text-[24px] font-semibold tracking-tight text-ink-900 mb-6">Prompt Library ({PROMPTS.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROMPTS.map((p:any) => (
            <Card key={p.id} className="bg-bg shadow-sm flex flex-col h-full border-border/50">
              <CardBody className="p-6 flex flex-col h-full">
                <div className="font-semibold text-[15px] text-ink-900 mb-3 leading-snug">{p.title}</div>
                <div className="text-[14px] text-text-secondary leading-relaxed line-clamp-3 mb-5 flex-1">{p.text}</div>
                <div className="inline-flex items-center bg-bg-subtle border border-border/50 px-3 py-1.5 rounded-full text-[13px] font-semibold text-text-secondary self-start">
                  {p.saves} saves
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-72px)] warm-gradient w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-[240px] shrink-0">
          <div className="sticky top-[100px]">
            <div className="text-[12px] font-bold text-text-tertiary uppercase tracking-widest mb-4 px-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" /> Admin Control
            </div>
            <div className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'posts', label: 'Posts', icon: MessageSquare },
                { id: 'events-a', label: 'Events', icon: Calendar },
                { id: 'prompts-a', label: 'Prompt Library', icon: Sparkles }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setSec(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:border-accent
                    ${sec === item.id 
                      ? 'bg-white shadow-sm text-ink-900 border border-border' 
                      : 'text-text-secondary hover:text-ink-900 hover:bg-black/5 border border-transparent'
                    }
                  `}
                >
                  <item.icon size={18} className={sec === item.id ? 'text-accent' : 'text-text-tertiary'} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {renderSec()}
        </div>
      </div>
    </div>
  );
}
