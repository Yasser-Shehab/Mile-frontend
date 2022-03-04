import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import NavBar from "../shared/NavBar/NavBar";
import NavTap from "../shared/NavBar/NavTap";
import { Outlet, useNavigate } from "react-router-dom";
function Dashboard() {
  let navigate = useNavigate();
  const items = [
    {
      label: "Accounts",
      icon: "pi pi-fw pi-file",
      command: () => {
        navigate("/dashboard/accounts");
      },
    },
    {
      label: "Costs",
      icon: "pi pi-fw pi-pencil",
      command: () => {
        navigate("/dashboard/costs");
      },
    },
    {
      label: "Projects",
      icon: "pi pi-fw pi-user",
      command: () => {
        navigate("/dashboard/projects");
      },
    },
    {
      label: "Specializations",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        navigate("/dashboard/specializations");
      },
    },
    {
      label: "Workers",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        navigate("/dashboard/workers");
      },
    },
  ];

  return (
    <>
      <div>
        <div className="card">
          <Menubar model={items} />
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Dashboard;
