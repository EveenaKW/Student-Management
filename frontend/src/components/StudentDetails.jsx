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
} from "@mui/material";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7000/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error("Error fetching student:", err));
  }, [id]);

  if (!student) return <Typography>Loading...</Typography>;

  const handleViewReport = () => {
    navigate("/report", { state: { student } });
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>📘 Student Details</Typography>
      <Box component={Paper} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Name: {student.name}</Typography>
        <Typography variant="h6">Department: {student.dep}</Typography>
        <Typography variant="h6">Class: {student.class}</Typography>
        <Typography variant="h6">Attendance: {student.attendance}%</Typography>
      </Box>

      <Typography variant="h5" gutterBottom>📝 Subject Marks</Typography>
      <Table>
        <TableBody>
          {student.marks &&
            Object.entries(student.marks).map(([subject, score]) => (
              <TableRow key={subject}>
                <TableCell>{subject}</TableCell>
                <TableCell>{score}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Box display="flex" gap={2} mt={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/edit-student/${student._id}`)}
        >
          ✏️ Edit Student
        </Button>
        <Button variant="contained" color="primary" onClick={handleViewReport}>
          📊 View Report
        </Button>
      </Box>
    </Container>
  );
}

export default StudentDetails;
