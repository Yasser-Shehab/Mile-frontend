import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Application from "./Application/Application";
import Account from "./Dashboard/Components/Account";
import Cost from "./Dashboard/Components/Cost";
import Project from "./Dashboard/Components/Project";
import Specialization from "./Dashboard/Components/Specialization";
import Worker from "./Dashboard/Components/Worker";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="dashboard" element={<Dashboard />}>
          <Route path="" element={<Navigate to="workers" />} />
          <Route path="accounts" element={<Account />} />
          <Route path="costs" element={<Cost />} />
          <Route path="projects" element={<Project />} />
          <Route path="specializations" element={<Specialization />} />
          <Route path="workers" element={<Worker />} />
        </Route>
        <Route exact path="application" element={<Application />} />
      </Routes>
    </Router>
  );
}

export default App;
