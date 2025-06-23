import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createUser } from '../api/api';
import { UserRequestDTO } from '../api/interfaces';

interface Props {
  onRegistered: () => void;
}

const Register: React.FC<Props> = ({ onRegistered }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    // Skip online password breach checks to keep registration fully offline
    const req: UserRequestDTO = { username, password };
    try {
      await createUser(req);
      setSuccess(true);
      onRegistered();
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">Register</Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      {success && <Typography color="success.main">Registration successful</Typography>}
    </Box>
  );
};

export default Register;
