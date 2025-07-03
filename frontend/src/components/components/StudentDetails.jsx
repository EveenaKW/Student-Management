import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
  Divider,
} from "@mui/material";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Student fetched:", data);
        setStudent(data);
      })
      .catch((err) => console.error("Error fetching student:", err));
  }, [id]);

  if (!student) return <Typography>Loading...</Typography>;

  const personal = student.personal || {};
  const academic = student.academic || {};

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        📘 Student Details
      </Typography>

      <Box component={Paper} sx={{ p: 3, mb: 3 }}>
        {/* 👤 Personal Details */}
        <Typography variant="h6" gutterBottom>👤 Personal Details</Typography>
        <Table>
          <TableBody>
            <TableRow><TableCell>Name</TableCell><TableCell>{personal.name}</TableCell></TableRow>
            <TableRow><TableCell>Date of Birth</TableCell><TableCell>{personal.dob}</TableCell></TableRow>
            <TableRow><TableCell>Age</TableCell><TableCell>{personal.age}</TableCell></TableRow>
            <TableRow><TableCell>Gender</TableCell><TableCell>{personal.gender}</TableCell></TableRow>
            <TableRow><TableCell>Contact</TableCell><TableCell>{personal.contact}</TableCell></TableRow>
            <TableRow><TableCell>Email</TableCell><TableCell>{personal.email}</TableCell></TableRow>
            <TableRow><TableCell>Address</TableCell><TableCell>{personal.address}</TableCell></TableRow>
            <TableRow><TableCell>Emergency Contact</TableCell><TableCell>{personal.emergencyContact}</TableCell></TableRow>
            <TableRow><TableCell>Guardian Name</TableCell><TableCell>{personal.guardianName}</TableCell></TableRow>
            <TableRow><TableCell>Guardian Contact</TableCell><TableCell>{personal.guardianContact}</TableCell></TableRow>
          </TableBody>
        </Table>

        <Divider sx={{ my: 3 }} />

        {/* 🎓 Academic Details */}
        <Typography variant="h6" gutterBottom>🎓 Academic Details</Typography>
        <Table>
          <TableBody>
            <TableRow><TableCell>Department</TableCell><TableCell>{academic.department}</TableCell></TableRow>
            <TableRow><TableCell>Course</TableCell><TableCell>{academic.course}</TableCell></TableRow>
            <TableRow><TableCell>Class</TableCell><TableCell>{academic.class}</TableCell></TableRow>
            <TableRow><TableCell>Admission No</TableCell><TableCell>{academic.admissionNo}</TableCell></TableRow>
            <TableRow><TableCell>Enrollment Date</TableCell><TableCell>{academic.enrollmentDate}</TableCell></TableRow>
            <TableRow><TableCell>Semester</TableCell><TableCell>{academic.semester}</TableCell></TableRow>
            <TableRow><TableCell>Section</TableCell><TableCell>{academic.section}</TableCell></TableRow>
            <TableRow><TableCell>Attendance</TableCell><TableCell>{academic.attendance}%</TableCell></TableRow>
          </TableBody>
        </Table>

        <Divider sx={{ my: 3 }} />

        {/* 🧠 Subject Marks */}
      {/* 🧠 Subject Marks */}
<Typography variant="h6" gutterBottom>🧠 Subject Marks</Typography>
<Table>
  <TableBody>
    {academic.subjects && academic.subjects.length > 0 ? (
      academic.subjects.map((subject, index) => (
        <TableRow key={index}>
          <TableCell>{subject.name}</TableCell>
          <TableCell>{subject.marks}</TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={2}>No subjects available</TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>


        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/edit-student/${student._id}`)}
          sx={{ mt: 3 }}
        >
          ✏️ Edit Student
        </Button>
      </Box>
    </Container>
  );
}

export default StudentDetails;