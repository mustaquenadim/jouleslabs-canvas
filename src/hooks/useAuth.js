import { useSelector } from 'react-redux';

const useAuth = () => {
  const { profile } = useSelector((state) => state.user);
  return profile;
};

export default useAuth;
