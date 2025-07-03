import React from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ This is important

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF4444"];

const getGrade = (mark) => {
  if (mark >= 90) return "A+";
  if (mark >= 80) return "A";
  if (mark >= 70) return "B";
  if (mark >= 60) return "C";
  if (mark >= 50) return "D";
  return "F";
};

const StudentProgress = () => {
  const { state } = useLocation();
  const { student } = state || {};

  if (!student || !student.marks) {
    return <p>No student data found. Please go back to Student List.</p>;
  }

  const subjects = Object.entries(student.marks).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: Number(value),
  }));

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Progress Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 14, 35);
    doc.text(`Department: ${student.dep}`, 14, 42);
    doc.text(`Class: ${student.class}`, 14, 49);
    doc.text(`Attendance: ${student.attendance}%`, 14, 56);

    const tableColumn = ["Subject", "Marks"];
    const tableRows = subjects.map((sub) => [
      sub.name,
      `${sub.value} (${getGrade(sub.value)})`,
    ]);

    autoTable(doc, {
      startY: 65,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`${student.name}_Report.pdf`);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>📊 Student Progress Report</h2>

      <div style={{ marginBottom: "20px" }}>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Department:</strong> {student.dep}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Attendance:</strong> {student.attendance}%</p>
      </div>

      <h3>🎯 Subject Marks (Pie Chart)</h3>

      <PieChart width={400} height={300}>
        <Pie
          data={subjects}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {subjects.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <div style={{
        marginTop: "40px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9"
      }}>
        <h3>📋 Subject Grades</h3>
        <ul style={{ listStyleType: "none", paddingLeft: "10px" }}>
          {subjects.map((sub, i) => (
            <li key={i} style={{ marginBottom: "8px" }}>
              {sub.name}: {sub.value} Marks — Grade: <strong>{getGrade(sub.value)}</strong>
            </li>
          ))}
        </ul>

        {/* ✅ Export PDF Button */}
        <button
          onClick={exportToPDF}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          ⬇️ Export as PDF
        </button>
      </div>
    </div>
  );
};

export default StudentProgress;
