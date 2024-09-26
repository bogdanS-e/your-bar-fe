import { useAuth0 } from '@auth0/auth0-react';
import UserProfile from './UserProfile';
import Button from 'components/Button';

const AuthHandler = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <UserProfile />;
  }

  return (
    <Button disabled={isLoading} onClick={loginWithRedirect}>
      Login
    </Button>
  );
};

export default AuthHandler;
