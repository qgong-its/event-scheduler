import { useNavigate } from 'react-router';

import AuthForm from '@/components/ui/AuthForm';
import { userRegister } from '@/services/userApi';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <AuthForm
      submitLabel="Sign Up"
      onSubmit={async (email, password) => {
        await userRegister({ email, password });
        navigate('/sign-in');
      }}
    />
  );
};

export default SignUpPage;
