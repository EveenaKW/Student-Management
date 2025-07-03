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
    personal: {
      name: "",
      age: "",
      dob: "",
      gender: "",
      contact: "",
      email: "",
      address: "",
      guardianName: "",
      guardianContact: "",
      emergencyContact: "",
    },
    academic: {
      department: "",
      course: "",
      class: "",
      admissionNo: "",
      enrollmentDate: "",
      semester: "",
      section: "",
      attendance: "",
      subjects: Array(6).fill({ name: "", marks: "" }),
    },
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value,
      },
    }));
  };

  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      academic: {
        ...prev.academic,
        [name]: value,
      },
    }));
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...student.academic.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: field === "marks" ? Number(value) : value,
    };
    setStudent((prev) => ({
      ...prev,
      academic: {
        ...prev.academic,
        subjects: updatedSubjects,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting student:", student); 
    try {
      await fetch("http://localhost:7000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      // Optional: Reset form after submit
      // setStudent({ ...initial empty state });

      navigate("/students");
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          ➕ Add Student
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            👤 Personal Details
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(student.personal).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/([A-Z])/g, " $1")}
                  name={key}
                  value={value}
                  onChange={handlePersonalChange}
                />
              </Grid>
            ))}
          </Grid>

          {/* Academic Details */}
          <Typography variant="h6" sx={{ mt: 4 }}>
            🎓 Academic Details
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(student.academic).map(([key, value]) => {
              if (key === "subjects") return null;
              return (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    label={key.replace(/([A-Z])/g, " $1")}
                    name={key}
                    value={value}
                    onChange={handleAcademicChange}
                  />
                </Grid>
              );
            })}
          </Grid>

          {/* Subject Marks */}
          <Typography variant="h6" sx={{ mt: 4 }}>
            🧠 Subject Marks
          </Typography>
          <Grid container spacing={2}>
            {student.academic.subjects.map((subj, index) => (
              <Grid container item spacing={2} key={index}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={`Subject ${index + 1} Name`}
                    value={subj.name}
                    onChange={(e) =>
                      handleSubjectChange(index, "name", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Marks"
                    type="number"
                    value={subj.marks}
                    onChange={(e) =>
                      handleSubjectChange(index, "marks", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddStudent;
