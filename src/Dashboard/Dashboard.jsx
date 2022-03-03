import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import NavBar from "../shared/NavBar/NavBar";
import NavTap from "../shared/NavBar/NavTap";
import { Outlet } from "react-router-dom";
function Dashboard() {
  const items = [
    {
      label: "Accounts",
      icon: "pi pi-fw pi-file",
      className: "p-menuitem",
    },
    {
      label: "Costs",
      icon: "pi pi-fw pi-pencil",
    },
    {
      label: "Projects",
      icon: "pi pi-fw pi-user",
    },
    {
      label: "Specializations",
      icon: "pi pi-fw pi-calendar",
    },
    {
      label: "Workers",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  return (
    <div>
      <NavBar>
        <NavTap path={`/dashboard/accounts`}>Accounts</NavTap>
        <NavTap path={`/dashboard/costs`}>Costs</NavTap>
        <NavTap path={`/dashboard/projects`}>Projects</NavTap>
        <NavTap path={`/dashboard/specializations`}>Specializations</NavTap>
        <NavTap path={`/dashboard/workers`}>Workers</NavTap>
      </NavBar>
      <div>
        <div className="card">
          <Menubar
            model={items}
            start={
              <NavTap className="p-menuitem" path={`/dashboard/accounts`}>
                Accounts
              </NavTap>
            }
          />
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Dashboard;
