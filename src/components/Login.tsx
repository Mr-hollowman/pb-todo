import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { URL } from "../assets/Variables";
import { ToastContext, UserContext } from "../utils/Contexts";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const { setToastContent }: any = useContext(ToastContext);
  const { setUserInfo }: any = useContext(UserContext);
  const [isSignUp, setIsSignup] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!isSignUp) {
      const resp = await fetch(`${URL}/users`)
        .then((res) => res.json())
        .then((res) => {
          const user = res.filter((item: any) => {
            return (
              item.mailId === data.get("email") &&
              item.password === data.get("password")
            );
          });
          return user;
        });
      if (resp.length === 0) {
        setToastContent((prev: any) => ({
          ...prev,
          open: true,
          severity: "error",
          message: "wrong credentials",
        }));
      } else {
        setUserInfo(resp);
        setToastContent((prev: any) => ({
          ...prev,
          open: true,
          severity: "success",
          message: "Login Success",
        }));
        navigate("/");
      }
    } else {
      await fetch(`${URL}/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          mailId: data.get("email"),
          password: data.get("password"),
          fullName: data.get("fullName"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setUserInfo(res);
          setToastContent((prev: any) => ({
            ...prev,
            open: true,
            severity: "success",
            message: "SignUp Success",
          }));
          navigate("/");
        })
        .catch((err) => {
          setToastContent((prev: any) => ({
            ...prev,
            open: true,
            severity: "error",
            message: "something went wrong",
          }));
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign up" : "Sign in"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {isSignUp && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Full Name"
                name="fullName"
                autoFocus
              />
            </>
          )}
          {!isSignUp && (
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>
          <Grid container>
            <Grid item>
              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() =>
                  isSignUp ? setIsSignup(false) : setIsSignup(true)
                }
              >
                {isSignUp
                  ? "Already have an accoutn? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
