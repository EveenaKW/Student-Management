import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import SidebarLayout from "./Layout/SidebarLayout";
import Home from './components/Home';
import Login from './components/Login';
import StudentProgress from './components/StudentProgress'; // Final report component

function App() {
  return (
    <Router>
      <Navbar />
      <SidebarLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/report" element={<StudentProgress />} /> {/* ✅ Only one report route */}
        </Routes>
      </SidebarLayout>
    </Router>
  );
}

export default App;
