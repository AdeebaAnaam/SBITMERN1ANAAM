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
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const  FeedBack =() =>{
  const [formData, setFormData] = useState({ name: "", email: "",message: ""});
  const [status, setStatus] = useState("");
  
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Please wait...");
    try {
        const res = await axios.post(`${process.env.BACKEND_URL}`, formData);
        setStatus(res.data.message);
        setFormData({ name: "", email: "", message: "" });
        // Handle successful login (e.g., redirect, store token)
      } catch (error) {
        setStatus("error in sending feedback. Please try again.");
        }
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
          <EmailOutlinedIcon fontSize="large"/>
        
        </Avatar>

        <Typography component="h1" variant="h5" color="#6d0707e0" sx={{ mb: 3, fontWeight: 600 }}>
          FEEDBACK
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="name"
            fullWidth
            required
            margin="normal"
            value={formData.name}
            onChange={handleChange} 
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

            <TextField
            label="Message"
            name="message"
            fullWidth
            required
            margin="normal"
            value={formData.message}
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
            SUBMIT
          </Button>
        </Box>
          {/*  Status message */}
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    {status}
                  </Typography>
      </Paper>
    </Container>
    <p> {status} </p>
    </div>
  );
};
export default FeedBack;