import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch students from backend
  const fetchStudents = () => {
    fetch("http://localhost:7000/")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await fetch(`http://localhost:7000/${id}`, {
        method: "DELETE",
      });
      fetchStudents();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">📋 Student List</Typography>
        <Button
          component={Link}
          to="/add-student"
          variant="contained"
          color="success"
        >
          ➕ Add Student
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Sr No</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>View</strong></TableCell>
            <TableCell><strong>Delete</strong></TableCell>
            <TableCell><strong>Report</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((stu, index) => {
            const safeStudent = {
              _id: stu._id,
              name: stu.name,
              dep: stu.dep,
              class: stu.class,
              attendance: stu.attendance,
              marks: {
                physics: stu.marks?.physics || 0,
                chemistry: stu.marks?.chemistry || 0,
                maths: stu.marks?.maths || 0,
                malayalam: stu.marks?.malayalam || 0,
                english: stu.marks?.english || 0,
                history: stu.marks?.history || 0,
              },
            };

            return (
              <TableRow key={stu._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{stu.name}</TableCell>

                <TableCell>
                  <Button
                    component={Link}
                    to={`/student/${stu._id}`}
                    variant="outlined"
                    color="primary"
                  >
                    View
                  </Button>
                </TableCell>

                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(stu._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/report", { state: { student: safeStudent } })}
                  >
                    📊 Report
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}

export default StudentList;
