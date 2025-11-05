import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const  SignIn =() =>{
  const [formData, setFormData] = useState({ uname: "", password: "",role: ""});
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Please wait...");
    try {
        const res = await axios.post(`${process.env.BACKEND_URL}/api/login`, formData);
        setStatus(res.data.message);
        if(res.data.success){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.role);
          setTimeout(() =>navigate("/"),1500);
          } 
        setFormData({ uname: "", password: "", role: "" });
        // Handle successful login (e.g., redirect, store token)
      } catch (error) {
        setStatus(error.response?.data?.message||"Login failed. Please check your credentials and try again.");
        } setTimeout(() => { setStatus("") }, 3000);
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
          <LockOutlinedIcon fontSize="large"  />
        </Avatar>

        <Typography component="h1" variant="h5" color="#6d0707e0" sx={{ mb: 3, fontWeight: 600 }}>
          LOGIN
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
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

            <TextField
            label="Role"
            name="role"
            fullWidth
            required
            margin="normal"
            value={formData.role}
            onChange={handleChange}
          />

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
            sx={{ mt: 1 }}
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
            LOGIN
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <RouterLink  to="/register" style={{ color:"#6d0707e0", fontWeight: 600 }}>
              Register
            </RouterLink>
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {status}
          </Typography>
      </Paper>
    </Container>
    </div>
  );
};
export default SignIn;