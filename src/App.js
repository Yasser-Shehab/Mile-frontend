import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Application from "./Application/Application";
import Worker from "./Dashboard/Components/Worker";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="dashboard" element={<Dashboard />}>
          <Route path="" element={<Navigate to="workers" />} />
          <Route path="workers" element={<Worker />} />
        </Route>
        <Route path="application" element={<Application />} />
      </Routes>
    </Router>
  );
}

export default App;
