import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}>
      </Route>
      <Route path="/" element={<Login />}>
      </Route>
      <Route path="/teacher" element={<Teacher />}>
      </Route>
      <Route path="/student" element={<Student />}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
