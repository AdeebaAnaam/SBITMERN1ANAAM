import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [formData, setFormData] = useState({ uname: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setStatus("Processing logout...");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus("You are not logged in!");
        return;
      }

      // Send username & password confirmation
      const res = await axios.post(
        "/api/logout",
        { uname: formData.uname, password: formData.password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        localStorage.removeItem("token");
        setStatus("Logout successful! Redirecting...");
        setTimeout (()=>navigate("/"),1500);  
      } else {
        setStatus(res.data.message || "Invalid credentials, try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Logout failed. Please try again.");
      setTimeout(() => setStatus(""), 3000);
    }

    // Clear message after a few seconds
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div>
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #b7802fff, #f9f4ef)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "80%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 60,
            height: 60,
            margin: "auto",
            mb: 2,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>

        <Typography component="h1" variant="h5" color="#6d0707e0" sx={{ mb: 3, fontWeight: 600 }}>
          LOGOUT
        </Typography>

        <Box component="form" onSubmit={handleLogout}>
          <TextField
            label="User Name"
            name="uname"
            fullWidth
            required
            margin="normal"
            value={formData.uname}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: "#6d0707e0",
            }}
          >
            LOGOUT
          </Button>
        </Box>
        <p style={{ color: "#6d0707e0", marginTop: "1rem" }}>{status}</p>
      </Paper>
    </Container>
   </div>
  );
};

export default Logout;



