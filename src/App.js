import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Application from "./Application/Application";
import Account from "./Dashboard/Components/Account";
import Cost from "./Dashboard/Components/Cost";
import Project from "./Dashboard/Components/Project";
import Specialization from "./Dashboard/Components/Specialization";
import Worker from "./Dashboard/Components/Worker";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "./Dashboard/Components/LoginForm";
import NotFound from "./Application/NotFound/NotFound";
import { Link } from "react-router-dom";
import ProjectDetails from "./Application/projectDetails/ProjectDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="login" element={<Navigate to="dashboard" />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="" element={<Navigate to="workers" />} />
            <Route path="accounts" element={<Account />} />
            <Route path="costs" element={<Cost />} />
            <Route path="projects" element={<Project />} />
            <Route path="specializations" element={<Specialization />} />
            <Route path="workers" element={<Worker />} />
          </Route>
        </Route>

        <Route path="login" element={<LoginForm />} />
        <Route path="/" element={<Application />} />
        <Route path="projectDetails/:id" element={<ProjectDetails />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
