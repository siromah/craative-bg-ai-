import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import { KeyRound } from 'lucide-react';

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ForgotPassword() {
  const { resetPassword, isConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!isConfigured) {
      setError('Password recovery is not configured.');
      return;
    }

    if (!isEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setMessage('Please check your email for a password reset link.');
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-bg-subtle flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-[440px] bg-bg shadow-sm">
        <CardBody className="p-8 md:p-10">
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent-light/10 text-accent flex items-center justify-center mb-4">
              <KeyRound size={24} />
            </div>
            <h1 className="text-[28px] font-semibold text-ink-900 tracking-tight mb-2">Reset Password</h1>
            <p className="text-[15px] text-text-secondary">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            {error && <p className="text-[14px] text-rose font-medium mt-2">{error}</p>}
            {message && <p className="text-[14px] text-emerald bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl font-medium mt-2">{message}</p>}

            <div className="pt-2">
              <Button type="submit" className="w-full h-12 text-[15px]" disabled={loading || !isConfigured}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-[14px] text-text-secondary">
            <Link to="/login" className="font-semibold text-ink-900 hover:text-accent transition-colors">
              Back to Sign In
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
