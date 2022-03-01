import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Application from "./Application/Application";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="/workers" element={<Workers />}/> */}
        </Route>
        <Route path="/application" element={<Application />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
