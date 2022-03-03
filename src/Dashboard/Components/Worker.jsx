import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getWorkers from "../../store/actions/workerAction";
import getProjects from "../../store/actions/projectAction";
import "./DataTable.css";
import Details from "./Details";

function Worker() {
  const [expandedRows, setExpandedRows] = useState(null);
  const isMounted = useRef(false);
  const workersList = useSelector((state) => state.workerReducer.workers);
  const projectsList = useSelector((state) => state.projectReducer.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    isMounted.current = true;
    dispatch(getProjects());
    dispatch(getWorkers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ***********   show nested data   ******************
  const rowExpansionTemplate = (data) => {
    return (
      <Details>
        {console.log(projectsList)}
       { console.log(data)}
        
        <h1>{data.name}</h1>
        <ul>
          {data.projects.map((p) => {
            
              return projectsList.map((id) => {
                if (id._id === p)
                return <li>{id.name}</li>;
            })
            // if (p === projectsList[6]._id)
            //   console.log (p === projectsList[6]._id)
            //   console.log(projectsList[6]._id);
            // console.log(p);
            // console.log(projectsList.name);
            // return <li>{p}</li>;
          })}
        </ul>
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
