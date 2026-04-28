import { useNavigate } from 'react-router';

import AuthForm from '@/components/ui/AuthForm';
import { saveToken } from '@/utils/tokenStorage';
import { userLogin } from '@/services/userApi';

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <AuthForm
        submitLabel="Sign In"
        onSubmit={async (email, password) => {
          const data = await userLogin({ email, password });
          saveToken(data.token);
          navigate('/');
        }}
      />
    </main>
  );
};

export default SignInPage;
