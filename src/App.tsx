/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Community from './pages/Community';
import Prompts from './pages/Prompts';
import Lessons from './pages/Lessons';
import Events from './pages/Events';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import SystemCheck from './pages/SystemCheck';
import Nav from './components/Nav';
import ToastContainer from './components/ToastContainer';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { PrivacyPolicy, CookiePolicy, TermsOfUse } from './pages/LegalPages';
import { INIT_USERS, INIT_POSTS, INIT_NOTIFS } from './data';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.split('/')[1] || 'home';
  const setPage = (p: string) => navigate(`/${p === 'home' ? '' : p}`);

  const { user } = useAuth();
  
  const currentUser = user ? { 
    id: user.id, 
    email: user.email, 
    fname: user.user_metadata?.full_name?.split(' ')[0] || 'Member',
    lname: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
    initials: (user.user_metadata?.full_name?.[0] || 'A').toUpperCase(),
    role: 'Member',
    color: 'var(--bl)',
    tc: 'var(--bg)',
    isAdmin: false
  } : null;

  const [toasts, setToasts] = useState<any[]>([]);
  const [db, setDb] = useState<{users:any[], posts:any[], notifs:any[], lessonProg:any, savedPrompts:any[]}>({
    users: [], posts: [], notifs: [], lessonProg: {}, savedPrompts: []
  });

  useEffect(() => {
    try {
      const isSeeded = localStorage.getItem('ailabs_seeded');
      if (!isSeeded) {
        localStorage.setItem('ailabs_seeded', 'true');
        localStorage.setItem('ailabs_users', JSON.stringify(INIT_USERS));
        localStorage.setItem('ailabs_posts', JSON.stringify(INIT_POSTS));
        localStorage.setItem('ailabs_notifs', JSON.stringify(INIT_NOTIFS));
      }
      setDb({
        users: JSON.parse(localStorage.getItem('ailabs_users') || '[]'),
        posts: JSON.parse(localStorage.getItem('ailabs_posts') || '[]'),
        notifs: JSON.parse(localStorage.getItem('ailabs_notifs') || '[]'),
        lessonProg: JSON.parse(localStorage.getItem('ailabs_lessonProg') || '{}'),
        savedPrompts: JSON.parse(localStorage.getItem('ailabs_savedPrompts') || '[]'),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateDb = (key: keyof typeof db, value: any) => {
    setDb(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(`ailabs_${String(key)}`, JSON.stringify(value));
  };

  const showToast = (msg: string, isError = false) => {
    const t = { id: Date.now(), msg, isError };
    setToasts(prev => [...prev, t]);
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 3200);
  };

  const checkAuthThenGo = (p: string) => {
    if (!currentUser && (p === 'login' || p === 'register')) {
      navigate(`/${p}`);
      return;
    }
    if (!currentUser) { navigate('/login'); return; }
    navigate(`/${p === 'home' ? '' : p}`);
  };

  const RequireAuth = ({ children }: any) => {
    if (!currentUser) {
      return (
        <div className="card" style={{padding: '24px', textAlign: 'center', margin: '80px auto', maxWidth: 400}}>
          <h2 style={{fontSize: 20, marginBottom: 16}}>Разделът изисква профил</h2>
          <p style={{marginBottom: 24, color: 'var(--txt2)'}}>Влезте за да видите тази страница.</p>
          <button className="btn btn-cta btn-full" onClick={() => navigate('/login')}>Вход</button>
        </div>
      );
    }
    return children;
  };

  const handleModal = (m: string) => {
    navigate(`/${m === 'signup' ? 'register' : m}`);
  };

  const props = { page, setPage, showToast, checkAuthThenGo, currentUser, setCurrentUser: () => {}, openModal: handleModal, db, updateDb };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ToastContainer toasts={toasts} />
      <CookieBanner />
      
      <Nav {...props} />
      
      <div style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<Home {...props} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/community" element={<Community {...props} />} />
          <Route path="/prompts" element={<Prompts {...props} />} />
          <Route path="/lessons" element={<Lessons {...props} />} />
          <Route path="/events" element={<Events {...props} />} />
          <Route path="/about" element={<About {...props} />} />
          <Route path="/contact" element={<Contact {...props} />} />
          <Route path="/pricing" element={<Pricing {...props} />} />
          <Route path="/system-check" element={<SystemCheck />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile {...props} />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={currentUser?.isAdmin ? <Admin {...props} /> : <Home {...props} />} />
          <Route path="*" element={<Home {...props} />} />
        </Routes>
      </div>

      <AIAssistant currentPage={page} setPage={setPage} />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
