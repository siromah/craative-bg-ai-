import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function Register() {
  const { signUp, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!isConfigured) {
      setError('Registration is not configured yet.');
      return;
    }

    if (fullName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    if (!isEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!acceptedTerms) {
      setError('You must accept the Terms and Privacy Policy.');
      return;
    }

    setLoading(true);
    const result = await signUp(email, password, fullName.trim());
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (result.needsEmailConfirmation) {
      setMessage('Моля, проверете имейла си, за да потвърдите акаунта.');
      return;
    }

    navigate('/profile', { replace: true });
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-bg-subtle flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-[440px] bg-bg shadow-sm">
        <CardBody className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-[28px] font-semibold text-ink-900 tracking-tight mb-2">Create an account</h1>
            <p className="text-[15px] text-text-secondary">Join AILABSBG to unlock all features.</p>
          </div>

          {!isConfigured && (
            <div className="bg-amber-light text-amber-900 px-4 py-3 rounded-xl text-[14px] mb-6 border border-amber/20">
              Registration is not configured currently.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-ink-900">Name</label>
              <Input
                type="text"
                value={fullName}
                autoComplete="name"
                placeholder="Full Name"
                onChange={(event:any) => setFullName(event.target.value)}
                className="h-12 border-border"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-ink-900">Email Address</label>
              <Input
                type="email"
                value={email}
                autoComplete="email"
                placeholder="you@company.com"
                onChange={(event:any) => setEmail(event.target.value)}
                className="h-12 border-border"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-ink-900">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  onChange={(event:any) => setPassword(event.target.value)}
                  className="h-12 border-border pr-12"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-ink-900 p-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-ink-900">Confirm Password</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                placeholder="Confirm password"
                autoComplete="new-password"
                onChange={(event:any) => setConfirmPassword(event.target.value)}
                className="h-12 border-border"
              />
            </div>

            <label className="flex items-start gap-3 mt-4 pt-2 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 border-2 border-border-strong rounded bg-bg checked:bg-accent checked:border-accent transition-colors"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                />
                <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 placeholder:transition-opacity" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[14px] text-text-secondary leading-snug">
                I agree to the <Link to="/terms" className="text-accent hover:underline">Terms</Link> and <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            {error && <p className="text-[14px] text-rose font-medium mt-2">{error}</p>}
            {message && <p className="text-[14px] text-emerald bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl font-medium mt-2">{message}</p>}

            <div className="pt-2">
              <Button type="submit" className="w-full h-12 text-[15px]" disabled={loading || !isConfigured}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-[14px] text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-ink-900 hover:text-accent transition-colors">
              Sign in
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
