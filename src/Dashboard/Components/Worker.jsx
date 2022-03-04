import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getWorkers from "../../store/actions/workerAction";
import getProjects from "../../store/actions/projectAction";
import "./DataTable.css";
import Details from "./Details";

function Worker() {
  const [project, setProject] = useState({
    workerId: "",
    projectName: "",
  });
  const [expandedRows, setExpandedRows] = useState(null);
  const isMounted = useRef(false);
  const workersList = useSelector((state) => state.workerReducer.workers);
  const projectsList = useSelector((state) => state.projectReducer.projects);
  const [workerProjects, setWorkerProjects] = useState([...projectsList]);
  const dispatch = useDispatch();

  useEffect(() => {
    isMounted.current = true;
    dispatch(getProjects());
    dispatch(getWorkers());
    setWorkerProjects([...workerProjects]);
  }, []);
  // ***********   show nested data   ******************
  const rowExpansionTemplate = (data) => {
    return (
      <Details>
        <h1>{data.name}</h1>
        <h3>Projects</h3>
        {data.projects.map((id) => {
          return workerProjects.map((p) => {
            if (p._id === id)
              return (
                <Badge
                  key={p._id}
                  value={p.name}
                  size="large"
                  severity="success"
                  style={{ marginRight: "1rem" }}
                ></Badge>
              );
          });
        })}
        <h3>Add new project</h3>
        <SplitButton
          label="Select new project"
          model={projectsList.map((p) => {
            return {
              label: p.name,
              command: () => {
                console.log({ workerId: data._id, projectName: p.name });
                setProject({ workerId: data._id, projectName: p.name });
              },
            };
          })}
          className="p-button-raised mr-2 mb-2"
        ></SplitButton>
        {data._id === project.workerId && (
          <Badge
            value={project.projectName}
            size="large"
            severity="success"
            style={{ marginRight: "1rem" }}
          ></Badge>
        )}
      </Details>
    );
  };
  const expandAll = () => {
    let _expandedRows = {};
    workersList.forEach((p) => (_expandedRows[`${p._id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const header = (
    <div className="table-header-container">
      <Button
        icon="pi pi-plus"
        label="Expand All"
        onClick={expandAll}
        style={{ marginRight: "1rem" }}
      />
      <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
    </div>
  );

  return (
    <>
      <div className="datatable-rowexpansion-demo">
        <div className="card">
          <DataTable
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            value={workersList}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="_id"
            header={header}
          >
            <Column expander style={{ width: "3em" }} />
            <Column field="name" header="FirstName"></Column>
            <Column field="address" header="Address"></Column>
            <Column field="mobile" header="Mobile"></Column>
            <Column field="nationalID" header="ID"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default Worker;
