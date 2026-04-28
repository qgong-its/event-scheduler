import { useNavigate } from 'react-router';

import AuthForm from '@/components/ui/AuthForm';
import { userRegister } from '@/services/userApi';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <AuthForm
        submitLabel="Sign Up"
        onSubmit={async (email, password) => {
          await userRegister({ email, password });
          navigate('/sign-in');
        }}
      />
    </main>
  );
};

export default SignUpPage;
