import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
} from "@mui/material";

function EditStudent() {
  const { id } = useParams();
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

  useEffect(() => {
    fetch(`http://localhost:7000/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent({
          personal: data.personal || {},
          academic: {
            ...data.academic,
            subjects:
              Array.isArray(data.academic.subjects) && data.academic.subjects.length === 6
                ? data.academic.subjects
                : Array(6).fill({ name: "", marks: "" }),
          },
        });
      })
      .catch((err) => console.error("Error fetching student:", err));
  }, [id]);

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
    try {
      await fetch(`http://localhost:7000/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      alert("✅ Student updated!");
      navigate("/students");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          ✏️ Edit Student
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
            Update Student
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditStudent;