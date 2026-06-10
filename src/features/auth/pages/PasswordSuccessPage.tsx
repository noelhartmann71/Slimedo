import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AuthButton from '../components/AuthButton/AuthButton';

const LOCK_ICON = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1E3A2E" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    <circle cx="12" cy="16" r="1" fill="#1E3A2E"/>
  </svg>
);

export default function PasswordSuccessPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="bg-white rounded-card-sm border border-gray-200 shadow-sm p-8 w-full text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#f0f7f4] flex items-center justify-center">
          {LOCK_ICON}
        </div>
        <h2 className="text-[20px] font-semibold text-gray-900">Erfolgreich aktualisiert!</h2>
        <p className="text-[13px] text-gray-500 leading-relaxed">
          Ihr Passwort wurde geändert. Sie können sich jetzt mit Ihrem neuen Passwort anmelden.
        </p>
        <AuthButton onClick={() => navigate('/auth/login')}>Erneut anmelden</AuthButton>
      </div>
    </AuthLayout>
  );
}
