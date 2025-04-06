import React, { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router';

import {
  Paper,
  TextField,
  Button,
  Alert,
  Grid2
} from "@mui/material";
import { Face, Fingerprint } from "@mui/icons-material";

import { signUp, isAuthenticated } from '../utils/auth';


export const SignUp: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (_: React.MouseEvent) => {
    // Password confirmation validation
    if (password !== passwordConfirmation) setError('Passwords do not match');
    else {
      setError('');
      try {
        const data = await signUp(email, password, passwordConfirmation);

        if (data) {
          navigate('/');
        }
      } catch (err) {
        if (err instanceof Error) {
          // handle errors thrown from frontend
          setError(err.message);
        } else {
          // handle errors thrown from backend
          setError(String(err));
        }
      }
    }
  };

  return isAuthenticated() ? (
    <Navigate to="/" />
  ) : (
    <Paper>
      <div>
        <Grid2 container spacing={8} alignItems="flex-end">
            <Face />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
              fullWidth
              autoFocus
              required
            />
        </Grid2>
        <Grid2 container spacing={8} alignItems="flex-end">
            <Fingerprint />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              fullWidth
              required
            />
        </Grid2>
        <Grid2 container spacing={8} alignItems="flex-end">
            <Fingerprint />
            <TextField
              id="passwordConfirmation"
              label="Confirm password"
              type="password"
              value={passwordConfirmation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirmation(e.currentTarget.value)
              }
              fullWidth
              required
            />
        </Grid2>
        <br />
        <Grid2 container alignItems="center">
          {error && (
              <Alert severity="error">{error}</Alert>
          )}
        </Grid2>
        <Grid2 container justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </Grid2>
      </div>
    </Paper>
  );
};
