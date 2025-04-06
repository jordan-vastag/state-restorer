import React, { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  Grid2,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { Face, Fingerprint } from "@mui/icons-material";

import { login, isAuthenticated } from "../utils/auth";

export const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (_: React.MouseEvent) => {
    setError("");
    try {
      const data = await login(email, password);

      if (data) {
        navigate("/");
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
  };

  return isAuthenticated() ? (
    <Navigate to="/" />
  ) : (
    <Paper>
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
      <Grid2 container spacing={8} alignItems="flex-end" size={5}>
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
      <br />
      <Grid2 container alignItems="center">
        {error && <Alert severity="error">{error}</Alert>}
      </Grid2>
      <Grid2 container alignItems="center" justifyContent="space-between">
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember me"
        />
        <Button disableFocusRipple disableRipple variant="text" color="primary">
          Forgot password ?
        </Button>
      </Grid2>
      <Grid2 container justifyContent="center">
        {" "}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>{" "}
        &nbsp;
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Grid2>
    </Paper>
  );
};
