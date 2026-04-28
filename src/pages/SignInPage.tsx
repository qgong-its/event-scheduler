import { useNavigate } from 'react-router';

import AuthForm from '@/components/ui/AuthForm';
import { saveToken } from '@/utils/tokenStorage';
import { userLogin } from '@/services/userApi';

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <AuthForm
      submitLabel="Sign In"
      onSubmit={async (email, password) => {
        const data = await userLogin({ email, password });
        saveToken(data.token);
        navigate('/');
      }}
    />
  );
};

export default SignInPage;
