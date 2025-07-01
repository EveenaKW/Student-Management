import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    attendance: "",
    age: "",
  contact:"",
  address:"",
    marks: {
      subject1: "",
      subject2: "",
      subject3: "",
      subject4: "",
      subject5: "",
      subject6: "",
    },
  });

  useEffect(() => {
    fetch(`http://localhost:7000/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.marks) {
          data.marks = {
            subject1: "",
            subject2: "",
            subject3: "",
            subject4: "",
            subject5: "",
            subject6: "",
          };
        }
        setStudent(data);
      })
      .catch((err) => console.error("Error loading student:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Object.keys(student.marks).includes(name)) {
      setStudent((prev) => ({
        ...prev,
        marks: {
          ...prev.marks,
          [name]: value,
        },
      }));
    } else {
      setStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:7000/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      alert("Student updated successfully!");
      navigate("/student-list");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: "100vh",
        width: "100vw",
        padding: 6,
        bgcolor: "#e3f2fd",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h3" textAlign="center" color="primary">
        Edit Student
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Attendance"
            name="attendance"
            value={student.attendance}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Age"
    name="age"
    type="number"
    value={student.age}
    onChange={handleChange}
  />
</Grid>

<Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Address"
    name="address"
    value={student.address}
    onChange={handleChange}
  />
</Grid>

<Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Contact Number"
    name="contact"
    value={student.contact}
    onChange={handleChange}
  />
</Grid>

        {Object.entries(student.marks).map(([subject, score], i) => (
          <Grid item xs={12} sm={4} key={subject}>
            <TextField
              fullWidth
              label={`Subject ${i + 1}`}
              name={subject}
              type="number"
              value={score}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={2}>
        <Button type="submit" variant="contained" size="large" color="primary">
          Update Student
        </Button>
      </Box>
    </Box>
  );


};

export default EditStudent;