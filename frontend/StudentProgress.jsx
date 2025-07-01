import React from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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
      </div>
    </div>
  );
};

export default StudentProgress;
