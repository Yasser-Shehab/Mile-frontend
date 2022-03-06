import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkers, asignProject } from "../../store/actions/workerAction";
import getProjects from "../../store/actions/projectAction";
import "./DataTable.css";
import Details from "./Details";

function Worker() {
  const [project, setProject] = useState({
    workerId: "",
    projectId: "",
    projectName: "",
  });
  const [expandedRows, setExpandedRows] = useState(null);
  const isMounted = useRef(false);
  const workersList = useSelector((state) => state.workerReducer.workers);
  const workerObj = useSelector((state) => state.workerReducer.worker);
  const projectsList = useSelector((state) => state.projectReducer.projects);
  const [workerProjects, setWorkerProjects] = useState([]);
  const dispatch = useDispatch();

  const addProject = (workerId, project) => {
    setWorkerProjects([...workerProjects, project]);
    dispatch(asignProject(workerId, project.projectId));
  };

  useEffect(() => {
    isMounted.current = true;
    dispatch(getProjects());
    dispatch(getWorkers());
  }, []);
  // ***********   show nested data   ******************
  const rowExpansionTemplate = (data) => {
    return (
      <Details>
        <h1>{data.name}</h1>
        {data.projects.length !== 0 && <h3>Projects</h3>}

        {data.projects.map((id) => {
          return projectsList.map((p) => {
            if (p._id === id)
              return (
                <Badge
                  key={p._id}
                  value={p.name}
                  size="large"
                  severity="success"
                  style={{ marginRight: "1rem", marginTop: "1rem" }}
                ></Badge>
              );
          });
        })}
        {workerProjects.map((p) => {
          if (p.workerId === data._id)
            return (
              <Badge
                key={p.projectId}
                value={p.projectName}
                size="large"
                severity="success"
                style={{ margin: "1rem" }}
              ></Badge>
            );
        })}
        <h3 className="mb-3">Add new project</h3>
        <SplitButton
          label={
            data._id === project.workerId
              ? project.projectName
              : "Select new project"
          }
          model={projectsList.map((p) => {
            return {
              label: p.name,
              command: () => {
                setProject({
                  workerId: data._id,
                  projectId: p._id,
                  projectName: p.name,
                });
              },
            };
          })}
          className="p-button-raised mr-2"
        ></SplitButton>

        <Button label="add" onClick={() => addProject(data._id, project)} />
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
            <Column field="name" header="الاسم"></Column>
            <Column field="specs.name" header="اسم التخصص"></Column>
            <Column field="specs.type" header="نوع التخصص"></Column>
            <Column field="address" header="العنوان"></Column>
            <Column field="mobile" header="الموبايل"></Column>
            <Column field="nationalID" header="الرقم القومي"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default Worker;
