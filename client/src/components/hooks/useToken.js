import { useState } from 'react';
import Cookies from 'universal-cookie';

export default function useToken() {
  const getToken = () => {
    const cookies = new Cookies();
    const tokenString = cookies.get('jwt');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    new Cookies().setItem('jwt', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}