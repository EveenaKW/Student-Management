import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    dep: "",
    class: "",
    attendance: "",
    marks: {
      physics: "",
      chemistry: "",
      maths: "",
      malayalam: "",
      english: "",
      history: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in student.marks) {
      setStudent((prev) => ({
        ...prev,
        marks: { ...prev.marks, [name]: Number(value) },
      }));
    } else {
      setStudent((prev) => ({
        ...prev,
        [name]: name === "attendance" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:7000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      navigate("/student-list");
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>➕ Add Student</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={student.name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Department" name="dep" value={student.dep} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Class" name="class" value={student.class} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Attendance (%)" name="attendance" type="number" value={student.attendance} onChange={handleChange} margin="normal" required />

          <Typography variant="h6" sx={{ mt: 3 }}>🧠 Subject Marks</Typography>
          <Grid container spacing={2}>
            {Object.entries(student.marks).map(([subject, mark]) => (
              <Grid item xs={12} sm={6} key={subject}>
                <TextField
                  fullWidth
                  label={`${subject.charAt(0).toUpperCase() + subject.slice(1)} Marks`}
                  name={subject}
                  type="number"
                  value={mark}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0, max: 100 }}
                />
              </Grid>
            ))}
          </Grid>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>Submit</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddStudent;
