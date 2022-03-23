import { Menubar } from "primereact/menubar";
import { Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
function Dashboard() {
  let navigate = useNavigate();
  const items = [
    {
      label: "حسابات المشاريع",
      icon: "pi pi-fw pi-money-bill ml-2",
      command: () => {
        navigate("/dashboard/accounts");
      },
    },
    {
      label: "حسابات العمال",
      icon: "pi pi-fw pi-dollar ml-2",
      command: () => {
        navigate("/dashboard/costs");
      },
    },
    {
      label: "المشاريع",
      icon: "pi pi-fw pi-building ml-2",
      command: () => {
        navigate("/dashboard/projects");
      },
    },
    {
      label: "التخصصات",
      icon: "pi pi-fw pi-briefcase ml-2",
      command: () => {
        navigate("/dashboard/specializations");
      },
    },
    {
      label: "العاملين",
      icon: "pi pi-fw pi-users ml-2",
      command: () => {
        navigate("/dashboard/workers");
      },
    },
    {
      label: "الصفحة الرئيسية",
      icon: "pi pi-fw pi-home ml-2",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "خروج",
      icon: "pi pi-fw pi-power-off ml-2",
      command: () => {
        localStorage.setItem("token", "");
        navigate("/");
      },
    },
  ];

  return (
    <div className="dashboard" dir="rtl">
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
