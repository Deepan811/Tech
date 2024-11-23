import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));

  };
  useEffect(() =>{ 
  if (success) {
    alert ("Signup is successfull") ;  
    navigate('/login'); 
  }
}, [success, navigate]);

  return (
    <div className="signup-container">
    <div className="signup-form">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <br/>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br/>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  </div>
);
};

export default SignupPage;
