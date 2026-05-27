import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function Login() {
  const { signIn, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    typeof location.state === 'object' &&
    location.state &&
    'from' in location.state
      ? String(location.state.from)
      : '/profile';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    if (!isConfigured) {
      setError('Login is not configured yet.');
      return;
    }

    if (!isEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-bg-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-[440px] bg-bg shadow-sm">
        <CardBody className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-[28px] font-semibold text-ink-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-[15px] text-text-secondary">Sign in to continue to AILABSBG.</p>
          </div>

          {!isConfigured && (
            <div className="bg-amber-light text-amber-900 px-4 py-3 rounded-xl text-[14px] mb-6 border border-amber/20">
              Authentication is not configured. Add VITE_SUPABASE_URL and
              VITE_SUPABASE_ANON_KEY.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-ink-900">Email Address</label>
              <Input
                type="email"
                value={email}
                autoComplete="email"
                placeholder="you@company.com"
                onChange={(event:any) => setEmail(event.target.value)}
                aria-invalid={Boolean(error)}
                className="h-12 border-border"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[14px] font-medium text-ink-900">Password</label>
                <Link to="/forgot-password" className="text-[13px] font-medium text-accent hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={(event:any) => setPassword(event.target.value)}
                  aria-invalid={Boolean(error)}
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

            {error && <p className="text-[14px] text-rose font-medium mt-2">{error}</p>}

            <div className="pt-2">
              <Button type="submit" className="w-full h-12 text-[15px]" disabled={loading || !isConfigured}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-[14px] text-text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-ink-900 hover:text-accent transition-colors">
              Create an account
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
