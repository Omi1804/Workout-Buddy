import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import publicRequest from '../requestMethod';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await publicRequest.post(
        '/user/login',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const json = await response.data;

      if (response.status !== 200) {
        setIsLoading(false);
        setError(json.error);
      } else {
        // Save the user's token to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error);
    }
  };

  return { login, isLoading, error };
};
