import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthButton from '../components/AuthButton/AuthButton';

const MailIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1E3A2E" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export default function ForgotPasswordSentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email || 'Ihre E-Mail';

  return (
    <AuthLayout>
      <div className="bg-white rounded-card-sm border border-gray-200 shadow-sm p-8 w-full text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#f0f7f4] flex items-center justify-center">
          <MailIcon />
        </div>
        <h2 className="text-[20px] font-semibold text-gray-900">Überprüfen Sie Ihr Postfach</h2>
        <p className="text-[13px] text-gray-500 leading-relaxed">
          Wir haben einen Link zum Zurücksetzen des Passworts an <strong className="text-gray-700">{email}</strong> gesendet.
          Überprüfen Sie Ihre E-Mail und folgen Sie den Anweisungen, um Ihr Passwort zurückzusetzen.
        </p>
        <AuthButton onClick={() => navigate('/auth/change-password')}>Passwort zurücksetzen</AuthButton>
        <button
          onClick={() => navigate('/auth/login')}
          className="text-[12.5px] text-deep font-medium hover:underline cursor-pointer bg-transparent border-none"
        >
          Zurück zum Login
        </button>
      </div>
    </AuthLayout>
  );
}
