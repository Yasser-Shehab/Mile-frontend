import React from "react";
import { Button } from "primereact/button";
import NavBar from "../shared/NavBar/NavBar";
import Worker from "./Components/Worker";
import NavTap from "../shared/NavBar/NavTap";
import Application from "../Application/Application";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <NavBar>
        <NavTap path={`/dashboard/accounts`}>Accounts</NavTap>
        <NavTap path={`/dashboard/costs`}>Costs</NavTap>
        <NavTap path={`/dashboard/projects`}>Projects</NavTap>
        <NavTap path={`/dashboard/specializations`}>Specializations</NavTap>
        <NavTap path={`/dashboard/workers`}>Workers</NavTap>
      </NavBar>
      <Outlet />
    </div>
  );
}

export default Dashboard;
