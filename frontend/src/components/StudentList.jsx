import { useEffect, useState, useRef } from "react";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const printRef = useRef();

  const fetchStudents = () => {
    fetch("http://localhost:7000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    await fetch(`http://localhost:7000/students/${id}`, { method: "DELETE" });
    fetchStudents();
  };

  const handleDownloadPDF = async () => {
    const input = printRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("All_Students_Details.pdf");
  };

  const handleReportClick = (student) => {
    navigate("/student-progress", { state: { student } });
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">📋 Student List</Typography>
        <Box display="flex" gap={2}>
          <Button component={Link} to="/add-student" variant="contained" color="success">
            ➕ Add Student
          </Button>
          <Button variant="outlined" color="primary" onClick={handleDownloadPDF}>
            ⬇️ Download All Details
          </Button>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Report</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((stu, index) => (
            <TableRow key={stu._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{stu.personal?.name || "N/A"}</TableCell>
              <TableCell>{stu.academic?.department || "N/A"}</TableCell>
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
                <IconButton color="error" onClick={() => handleDelete(stu._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "purple", color: "white" }}
                  onClick={() => handleReportClick(stu)}
                >
                  📊 Report
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Hidden Table for PDF Export */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <div ref={printRef} style={{ width: "800px", padding: 20 }}>
          <h2 style={{ textAlign: "center" }}>📄 All Student Details</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={cellStyle}>#</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>DOB</th>
                <th style={cellStyle}>Age</th>
                <th style={cellStyle}>Gender</th>
                <th style={cellStyle}>Contact</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Guardian</th>
                <th style={cellStyle}>Address</th>
                <th style={cellStyle}>Department</th>
                <th style={cellStyle}>Class</th>
                <th style={cellStyle}>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{i + 1}</td>
                  <td style={cellStyle}>{stu.personal?.name}</td>
                  <td style={cellStyle}>{stu.personal?.dob}</td>
                  <td style={cellStyle}>{stu.personal?.age}</td>
                  <td style={cellStyle}>{stu.personal?.gender}</td>
                  <td style={cellStyle}>{stu.personal?.contact}</td>
                  <td style={cellStyle}>{stu.personal?.email}</td>
                  <td style={cellStyle}>{stu.personal?.guardianName}</td>
                  <td style={cellStyle}>{stu.personal?.address}</td>
                  <td style={cellStyle}>{stu.academic?.department}</td>
                  <td style={cellStyle}>{stu.academic?.class}</td>
                  <td style={cellStyle}>{stu.academic?.attendance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "5px",
  textAlign: "left",
  fontSize: "10px",
};

export default StudentList;
