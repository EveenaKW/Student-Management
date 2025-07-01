// src/components/Report.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA66CC', '#FF4444'];

const Report = () => {
  const location = useLocation();
  const student = location.state?.student;

  if (!student) return <p>No student data provided.</p>;

  const marks = [
    { name: "Subject 1", value: student.subject1 },
    { name: "Subject 2", value: student.subject2 },
    { name: "Subject 3", value: student.subject3 },
    { name: "Subject 4", value: student.subject4 },
    { name: "Subject 5", value: student.subject5 },
    { name: "Subject 6", value: student.subject6 }
  ];

  const attendanceData = [
    { name: "Attendance", value: student.attendance },
    { name: "Absent", value: 100 - student.attendance }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Report</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Attendance:</strong> {student.attendance}%</p>

      <h3>Marks</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={marks}
          cx={200}
          cy={150}
          outerRadius={100}
          label
          dataKey="value"
        >
          {marks.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h3>Attendance</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={attendanceData}
          cx={150}
          cy={100}
          outerRadius={80}
          label
          dataKey="value"
        >
          <Cell fill="#00C49F" />
          <Cell fill="#FF4444" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Report;
