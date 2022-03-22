import { Menubar } from "primereact/menubar";
import { Outlet, useNavigate } from "react-router-dom";
function Dashboard() {
  let navigate = useNavigate();
  const items = [
    {
      label: "Accounts",
      icon: "pi pi-fw pi-money-bill",
      command: () => {
        navigate("/dashboard/accounts");
      },
    },
    {
      label: "Costs",
      icon: "pi pi-fw pi-dollar",
      command: () => {
        navigate("/dashboard/costs");
      },
    },
    {
      label: "Projects",
      icon: "pi pi-fw pi-building",
      command: () => {
        navigate("/dashboard/projects");
      },
    },
    {
      label: "Specializations",
      icon: "pi pi-fw pi-briefcase",
      command: () => {
        navigate("/dashboard/specializations");
      },
    },
    {
      label: "Workers",
      icon: "pi pi-fw pi-users",
      command: () => {
        navigate("/dashboard/workers");
      },
    },

    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        localStorage.setItem("token", "");
        navigate("/");
      },
    },
  ];

  return (
    <div className="dashboard">
      <div>
        <div className="card">
          <Menubar model={items} />
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Dashboard;
