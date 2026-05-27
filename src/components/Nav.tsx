import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Bell, 
  Menu,
  Home,
  MessageSquare,
  Sparkles,
  GraduationCap,
  Calendar,
  Search,
  User,
  Settings,
  Bookmark,
  LogOut,
  X
} from 'lucide-react';
import { Avatar } from './ui/Avatar';

export default function Nav({ page, setPage, openModal, db, updateDb, showToast }: any) {
  const navigate = useNavigate();
  const { user: currentUser, signOut } = useAuth();
  const unreadCount = db?.notifs?.filter((n:any) => !n.read).length || 0;
  
  const [mobMenu, setMobMenu] = useState(false);
  const [notifPanel, setNotifPanel] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdown(false);
        setNotifPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const go = (p: string) => { 
    setPage(p); 
    setMobMenu(false); 
    setNotifPanel(false);
    setUserDropdown(false);
    window.scrollTo(0, 0); 
  };

  const activeClass = "font-semibold text-accent border-b-2 border-accent";
  const inactiveClass = "text-text-secondary hover:text-text-primary border-b-2 border-transparent";

  const navLinks = [
    {id: 'home', label: 'Home', icon: Home, route: '/'},
    {id: 'lessons', label: 'Academy', icon: GraduationCap, route: '/lessons'},
    {id: 'community', label: 'Community', icon: MessageSquare, route: '/community'},
    {id: 'prompts', label: 'Prompts', icon: Sparkles, route: '/prompts'},
    {id: 'events', label: 'Events', icon: Calendar, route: '/events'},
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 h-[60px] bg-white/95 backdrop-blur-sm border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div className="flex items-center gap-8 h-full">
            <div className="cursor-pointer flex items-center gap-2" onClick={() => go('home')}>
              <div className="w-8 h-8 bg-accent rounded-md flex flex-col justify-center items-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <span className="font-semibold text-[18px] tracking-tight">AILABS</span>
            </div>
            
            {/* CENTER (Desktop): Nav Links */}
            <div className="hidden md:flex items-center gap-8 h-full">
              {navLinks.map(item => (
                <NavLink 
                  key={item.id} 
                  to={item.route}
                  className={({ isActive }) => `text-[14px] h-full flex items-center transition-colors ${isActive ? activeClass : inactiveClass}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* RIGHT: Search + Notif + Avatar */}
          <div className="flex items-center gap-2 md:gap-4 relative" ref={dropdownRef}>
            <button className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-bg-subtle transition-colors">
              <Search size={20} />
            </button>
            
            {currentUser && (
              <div className="relative">
                <button 
                  className={`p-2 rounded-full transition-colors relative ${notifPanel ? 'bg-bg-subtle text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle'}`}
                  onClick={() => { setNotifPanel(!notifPanel); setUserDropdown(false); }}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose rounded-full border border-white" />}
                </button>
                
                {/* Notifs Dropdown */}
                <AnimatePresence>
                  {notifPanel && (
                    <motion.div 
                      initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}} transition={{duration: 0.15}}
                      className="absolute top-[calc(100%+8px)] right-0 w-80 bg-white border border-border rounded-xl shadow-md z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-bg-subtle">
                        <span className="font-semibold text-[14px]">Notifications</span>
                        <button className="text-[12px] text-accent font-medium hover:text-accent-hover" onClick={() => updateDb('notifs', db.notifs.map((n:any) => ({...n, read: true})))}>Mark all read</button>
                      </div>
                      <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {!db?.notifs?.length ? (
                          <div className="p-6 text-center text-text-secondary text-[14px]">No notifications yet.</div>
                        ) : (
                          db.notifs.slice(0, 10).map((n:any) => (
                            <div key={n.id} className={`p-4 border-b border-border flex gap-3 ${!n.read ? 'bg-accent-light/30' : 'bg-white'}`}>
                              <div className="flex-1">
                                <p className={`text-[13px] text-text-primary ${!n.read ? 'font-medium' : 'font-normal'}`}>{n.text}</p>
                                <p className="text-[11px] text-text-tertiary mt-1">Just now</p>
                              </div>
                              {!n.read && <div className="w-2 h-2 rounded-full bg-accent mt-1" />}
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {!currentUser ? (
              <div className="hidden md:flex gap-2 ml-2">
                <button className="h-9 px-4 text-[14px] font-medium text-text-primary hover:bg-bg-subtle rounded-md transition-colors border border-border bg-white" onClick={() => navigate('/login')}>Log in</button>
                <button className="h-9 px-4 text-[14px] font-medium text-white bg-accent hover:bg-accent-hover rounded-md transition-colors" onClick={() => navigate('/register')}>Sign up</button>
              </div>
            ) : (
              <div className="relative hidden md:block ml-2">
                <button onClick={() => { setUserDropdown(!userDropdown); setNotifPanel(false); }} className="focus:outline-none">
                  <Avatar size="sm" initials={currentUser.initials} />
                </button>
                
                {/* User Dropdown */}
                <AnimatePresence>
                  {userDropdown && (
                    <motion.div 
                      initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}} transition={{duration: 0.15}}
                      className="absolute top-[calc(100%+8px)] right-0 w-56 bg-white border border-border rounded-xl shadow-md z-50 py-2"
                    >
                      <div className="px-4 py-2 border-b border-border mb-2 truncate">
                        <p className="font-semibold text-[14px] text-text-primary">{currentUser.fname} {currentUser.lname}</p>
                        <p className="text-[12px] text-text-secondary truncate">{currentUser.email || 'user@example.com'}</p>
                      </div>
                      
                      <button onClick={() => go('profile')} className="w-full text-left px-4 py-2 text-[14px] text-text-secondary hover:bg-bg-subtle hover:text-text-primary flex items-center gap-2">
                        <User size={16} /> Profile
                      </button>
                      <button onClick={() => go('profile')} className="w-full text-left px-4 py-2 text-[14px] text-text-secondary hover:bg-bg-subtle hover:text-text-primary flex items-center gap-2">
                        <Bookmark size={16} /> Saved Prompts
                      </button>
                      <button onClick={() => go('profile')} className="w-full text-left px-4 py-2 text-[14px] text-text-secondary hover:bg-bg-subtle hover:text-text-primary flex items-center gap-2">
                        <Settings size={16} /> Settings
                      </button>
                      
                      <div className="h-px bg-border my-2" />
                      
                      <button onClick={() => { signOut(); go('home'); showToast('Signed out successfully'); }} className="w-full text-left px-4 py-2 text-[14px] text-rose hover:bg-rose-light flex items-center gap-2">
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Hamburger Mobile */}
            <button className="md:hidden p-2 text-text-secondary rounded-md border border-border ml-1" onClick={() => setMobMenu(true)}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobMenu && (
          <>
            <motion.div 
              initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.2}}
              className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-50"
              onClick={() => setMobMenu(false)}
            />
            <motion.div 
              initial={{x: '-100%'}} animate={{x: 0}} exit={{x: '-100%'}} transition={{type: 'spring', bounce: 0, duration: 0.4}}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[60] shadow-xl flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-accent rounded flex justify-center items-center">
                    <div className="w-3.5 h-3.5 bg-white rounded-sm" />
                  </div>
                  <span className="font-semibold text-[16px]">AILABS</span>
                </div>
                <button onClick={() => setMobMenu(false)} className="p-1 text-text-secondary hover:bg-bg-subtle rounded"><X size={20}/></button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
                {navLinks.map(item => (
                  <NavLink 
                    key={item.id}
                    to={item.route}
                    onClick={() => setMobMenu(false)}
                    className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-lg text-[15px] font-medium transition-colors ${isActive ? 'bg-accent-light text-accent-text' : 'text-text-secondary hover:bg-bg-subtle'}`}
                  >
                    <item.icon size={20} className={page === item.id ? 'text-accent' : 'text-text-tertiary'} />
                    {item.label}
                  </NavLink>
                ))}
              </div>
              
              <div className="p-4 border-t border-border">
                {!currentUser ? (
                  <div className="flex flex-col gap-3">
                    <button className="h-10 text-[14px] font-medium border border-border rounded-md hover:bg-bg-subtle" onClick={() => { setMobMenu(false); navigate('/login'); }}>Log in</button>
                    <button className="h-10 text-[14px] font-medium border border-transparent rounded-md bg-accent text-white hover:bg-accent-hover" onClick={() => { setMobMenu(false); navigate('/register'); }}>Sign up</button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <Avatar size="md" initials={currentUser.initials} />
                      <div>
                        <div className="text-[14px] font-semibold text-text-primary">{currentUser.fname} {currentUser.lname}</div>
                        <div className="text-[12px] text-text-secondary">Member</div>
                      </div>
                    </div>
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-text-secondary hover:bg-bg-subtle" onClick={() => go('profile')}><User size={18}/> Profile</button>
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-rose hover:bg-rose-light" onClick={() => { signOut(); go('home'); }}><LogOut size={18}/> Sign Out</button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
