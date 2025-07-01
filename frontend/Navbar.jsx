import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Student Management
        </Typography>

        <Box>
          <Button component={Link} to="/" sx={{ color: "white" }}>
            Home
          </Button>
          <Button component={Link} to="/student-list" sx={{ color: "white" }}>
            Student List
          </Button>
          <Button component={Link} to="/add-student" sx={{ color: "white" }}>
            Add Student
          </Button>
          

          {isLoggedIn ? (
            <Button onClick={handleLogout} sx={{ color: "white" }}>
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/login" sx={{ color: "white" }}>
              Login
            </Button>
            

          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;