import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import getWorkers from "../../store/actions/workerAction";
import { useDispatch, useSelector } from "react-redux";

const DataTableRowExpansionDemo = () => {
  const [expandedRows, setExpandedRows] = useState(null);
  const isMounted = useRef(false);
  const workersList = useSelector((state) => state.workerReducer.workers);
  const dispatch = useDispatch();

  console.log(workersList);

  useEffect(() => {
    isMounted.current = true;
    dispatch(getWorkers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   const expandAll = () => {
  //     let _expandedRows = {};
  //     workersList.forEach((p) => (_expandedRows[`${p._id}`] = true));

  //     setExpandedRows(_expandedRows);
  //   };

  //   const collapseAll = () => {
  //     setExpandedRows(null);
  //   };

  // ***********   show nested data   ******************
  const rowExpansionTemplate = (data) => {
    return <h1>Hello</h1>;
  };

  //   const header = (
  //     <div className="table-header-container">
  //       <Button
  //         icon="pi pi-plus"
  //         label="Expand All"
  //         onClick={expandAll}
  //         className="mr-2"
  //       />
  //       <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
  //     </div>
  //   );

  return (
    <div className="datatable-rowexpansion-demo">
      <div className="card">
        <DataTable
          value={workersList}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          responsiveLayout="scroll"
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="_id"
          //   header={header}
        >
          <Column expander style={{ width: "3em" }} />
          <Column field="name" header="Name" sortable />
        </DataTable>
      </div>
    </div>
  );
};
export default DataTableRowExpansionDemo;
