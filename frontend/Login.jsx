import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7000/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Hello student</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="username"
          placeholder="username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f4f8",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "250px",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;