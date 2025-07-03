import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const getGrade = (mark) => {
  if (mark >= 90) return "A+";
  if (mark >= 80) return "A";
  if (mark >= 70) return "B";
  if (mark >= 60) return "C";
  if (mark >= 50) return "D";
  return "F";
};

const getGradePoint = (mark) => {
  if (mark >= 90) return 10;
  if (mark >= 80) return 9;
  if (mark >= 70) return 8;
  if (mark >= 60) return 7;
  if (mark >= 50) return 6;
  return 0;
};

const getGradeSummary = (subjects) => {
  const summary = { "A+": 0, A: 0, B: 0, C: 0, D: 0, F: 0 };
  subjects.forEach((s) => summary[getGrade(s.marks)]++);
  return summary;
};

const calculateCGPA = (subjects) => {
  if (!subjects.length) return 0;
  const totalPoints = subjects.reduce((sum, s) => sum + getGradePoint(s.marks), 0);
  return (totalPoints / subjects.length).toFixed(2);
};

const StudentProgress = () => {
  const { state } = useLocation();
  const { student } = state || {};
  const subjects = student?.academic?.subjects || [];
  const reportRef = useRef();

  if (!student || subjects.length === 0) {
    return <p>No student data found. Please go back.</p>;
  }

  const gradeSummary = getGradeSummary(subjects);
  const cgpa = calculateCGPA(subjects);
  const passFail = subjects.every((s) => s.marks >= 50) ? "Passed ✅" : "Failed ❌";

  return (
    <div style={{ padding: 20, fontFamily: "Arial", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <div
        ref={reportRef}
        style={{
          width: 794,
          margin: "auto",
          padding: 30,
          background: "linear-gradient(to bottom, #ffffff, #f3f6fa)",
          border: "4px double #999",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <img
            src="/school-logo.jpg"
            alt="School Logo"
            style={{ width: 80, marginRight: 15 }}
          />
          <div>
            <h1 style={{ margin: 0, fontSize: 24 }}>Springfield International School</h1>
            <p style={{ margin: 0, color: "#666" }}>Student Progress Report</p>
          </div>
        </div>

        {/* Student Info */}
        <div style={{ marginBottom: 20 }}>
          <p><strong>Name:</strong> {student.personal.name}</p>
          <p><strong>Class:</strong> {student.academic.class}</p>
          <p><strong>Department:</strong> {student.academic.department}</p>
          <p><strong>Attendance:</strong> {student.academic.attendance}%</p>
          <p><strong>Status:</strong> {passFail}</p>
          <p><strong>CGPA:</strong> {cgpa}</p>
        </div>

        {/* Bar Chart */}
        <h3>📊 Subject Marks</h3>
        <BarChart width={500} height={300} data={subjects.map((s) => ({ name: s.name, marks: s.marks }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="marks" fill="#8884d8" />
        </BarChart>

        {/* Grades List */}
        <div style={{ background: "#f9f9f9", padding: 10, borderRadius: 6, marginTop: 20 }}>
          <h3>📋 Grades</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {subjects.map((s, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                <strong>{s.name}</strong>: {s.marks} – Grade: {getGrade(s.marks)}
              </li>
            ))}
          </ul>
        </div>

        {/* Grade Summary Table */}
        <div style={{ marginTop: 20 }}>
          <h3>📊 Grade Summary</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead>
              <tr style={{ background: "#e0e0e0" }}>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Grade</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(gradeSummary).map(([grade, count]) => (
                <tr key={grade}>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{grade}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subject Percentages Table */}
        <div style={{ marginTop: 20 }}>
          <h3>📈 Subject Percentages & Grade Points</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Subject</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Marks</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>%</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Grade Point</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{s.name}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{s.marks}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{s.marks}%</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{getGradePoint(s.marks)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Remarks */}
        <div style={{ marginTop: 20 }}>
          <h3>📝 Teacher's Remarks</h3>
          <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 6, backgroundColor: "#f8f8f8" }}>
            {
              (() => {
                const lowScores = subjects.filter((s) => s.marks < 50).length;
                const average = subjects.reduce((acc, s) => acc + s.marks, 0) / subjects.length;

                if (lowScores > 0) {
                  return "Don't give up! Focus on your weak areas and you’ll surely improve. 💪";
                } else if (average >= 90) {
                  return "Outstanding performance! Keep reaching for the stars! 🌟";
                } else if (average >= 75) {
                  return "Great job! You're on the path to excellence. 🚀";
                } else if (average >= 60) {
                  return "Good work! A little more effort will take you even higher! 📘";
                } else {
                  return "Keep practicing and stay consistent. You’re improving every day. ✨";
                }
              })()
            }
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: 12, color: "#777", marginTop: 30 }}>
          <hr />
          Generated by Springfield Intl. School – {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
