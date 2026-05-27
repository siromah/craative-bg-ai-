import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';
import { Lock } from 'lucide-react';

export function ResetPassword() {
  const { updatePassword, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!isConfigured) {
      setError('Password reset is not configured.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await updatePassword(password);
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setMessage('Password updated successfully.');

    setTimeout(() => {
      navigate('/profile', { replace: true });
    }, 900);
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-bg-subtle flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-[440px] bg-bg shadow-sm">
        <CardBody className="p-8 md:p-10">
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald flex items-center justify-center mb-4">
              <Lock size={24} />
            </div>
            <h1 className="text-[28px] font-semibold text-ink-900 tracking-tight mb-2">Create New Password</h1>
            <p className="text-[15px] text-text-secondary">Please enter your new password below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-ink-900">New Password</label>
              <Input
                type="password"
                value={password}
                placeholder="Enter new password"
                autoComplete="new-password"
                onChange={(event:any) => setPassword(event.target.value)}
                className="h-12 border-border"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-ink-900">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                placeholder="Confirm your password"
                autoComplete="new-password"
                onChange={(event:any) => setConfirmPassword(event.target.value)}
                className="h-12 border-border"
              />
            </div>

            {error && <p className="text-[14px] text-rose font-medium mt-2">{error}</p>}
            {message && <p className="text-[14px] text-emerald bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl font-medium mt-2">{message}</p>}

            <div className="pt-2">
              <Button type="submit" className="w-full h-12 text-[15px]" disabled={loading || !isConfigured}>
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
