/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Error from '../components/Error';

// models
import { User } from '../models/index';

const USERS = 'users';
const USER = 'user';

function Index() {
  const navigate = useNavigate();

  const [signMode, setSignMode] = useState<'signin' | 'signup'>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signHandler = () => {
    const newUser: User = {
      username,
      password,
    };
    const users: User[] | null = localStorage.getItem(USERS) ? JSON.parse(localStorage.getItem(USERS)!) as User[] : null;
    setError('');
    if (signMode === 'signin') {
      if (!users) {
        setError('Cannot find user!');
        return;
      }
      const findUser = users?.find((el) => el.username === username);
      if (!findUser) {
        setError('Cannot find user!');
        return;
      }
      if (findUser?.password !== password) {
        setError('Wrong password!');
        return;
      }
      localStorage.setItem(USER, JSON.stringify(newUser));
      navigate('/');
      return;
    }

    if (!users) {
      const newUsers = [];
      newUsers.push(newUser);
      localStorage.setItem(USERS, JSON.stringify(newUsers));
      localStorage.setItem(USER, JSON.stringify(newUser));
      navigate('/');
    } else {
      if (users.find((el) => el.username === newUser.username)) {
        setError('username has already taken!');
        return;
      }
      const newUsers = [...users, newUser];
      localStorage.setItem(USERS, JSON.stringify(newUsers));
      localStorage.setItem(USER, JSON.stringify(newUser));
      navigate('/');
    }
  };

  useEffect(() => {
    const alreadySign = localStorage.getItem(USER);
    if (alreadySign) navigate('/');
  }, []);

  return (
    <div className="container mt-5">
      <div className="auth">
        <h1>welcome to pokemon</h1>
        <div className="auth-box mt-5">
          <h2>{signMode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="name" placeholder="User Name" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" type="text" id="password" placeholder="Password" />
          <button onClick={signHandler} className="button-primary mt-2" type="button">
            {signMode === 'signin' ? 'sign in' : 'sign up'}
          </button>
          <button className="account-button" type="button" onClick={() => setSignMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))}>
            {signMode === 'signin' ? "Don't have an account?" : 'have an account?'}
          </button>
        </div>
      </div>
      {error !== '' && <Error message={error} />}
    </div>
  );
}

export default Index;
