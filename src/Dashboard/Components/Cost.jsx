import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { useSelector, useDispatch } from "react-redux";
import { getCosts, addCost, deleteCost } from "../../store/actions/costAction";
import { getWorkers } from "../../store/actions/workerAction";
import { getProjects } from "../../store/actions/projectAction";

function Cost() {
  const costsList = useSelector((state) => state.costReducer.costs);
  const workersList = useSelector((state) => state.workerReducer.workers);
  const projectsList = useSelector((state) => state.projectReducer.projects);

  // const [allCosts, setAllCosts] = useState(costsList);

  const [display, setDisplay] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [amount, setAmount] = useState(null);
  const [notes, setNotes] = useState(null);

  const cols = [
    { field: "worker.name", header: "اسم العامل" },
    { field: "project.name", header: "اسم المشروع" },
    { field: "amount", header: "المبلغ" },
    {
      field: "createdAt",
      header: "التاريخ",
    },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const dt = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // setAllCosts(costsList);
    dispatch(getCosts());
    dispatch(getProjects());
    dispatch(getWorkers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addNewCost = () => {
    let data = {
      workerId: selectedWorker._id,
      projectId: selectedProject._id,
      amount,
      notes,
    };
    dispatch(addCost(data));
    dispatch(getCosts());
    onHide();
    setSelectedWorker("");
    setSelectedProject("");
    setAmount(null);
    setNotes(null);
  };
  const onClick = () => {
    setDisplay(true);
  };

  const onHide = () => {
    setDisplay(false);
  };
  //    export new report
  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, costsList);
        doc.autoTable({
          headStyles: { fontStyle: "dinnext" },
          body: costsList,
          columns: exportColumns,
        });
        doc.save("costsList.pdf");
      });
    });
  };

  // const exportExcel = () => {
  //   import("xlsx").then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(products);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //     const excelBuffer = xlsx.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array",
  //     });
  //     saveAsExcelFile(excelBuffer, "products");
  //   });
  // };

  const renderFooter = () => {
    return (
      <div>
        <Button label="Cancel" onClick={onHide} className="p-button-text" />
        <Button label="Add" icon="pi pi-check" onClick={addNewCost} autoFocus />
      </div>
    );
  };

  const leftToolbarTemplate = (
    <div className="table-header-container">
      <Button
        icon="pi pi-plus ml-3"
        label="Asign new cost"
        onClick={onClick}
        className="p-button-primary p-button-raised p-button-outlined p-button-rounded ml-2"
      />

      <Dialog
        header="Add New Cost"
        visible={display}
        style={{ width: "50vw" }}
        footer={renderFooter}
        onHide={onHide}
        maximizable
      >
        <div className="p-fluid grid formgrid">
          <div className="field col-12 ">
            <Dropdown
              value={selectedWorker}
              options={workersList}
              onChange={(e) => setSelectedWorker(e.target.value)}
              optionLabel="name"
              placeholder="Select a Worker"
            />
          </div>
          <div className="field col-12 ">
            <Dropdown
              value={selectedProject}
              options={projectsList}
              onChange={(e) => setSelectedProject(e.target.value)}
              optionLabel="name"
              placeholder="Select a Project"
            />
          </div>
          <div className="field col-12 ">
            <InputNumber
              placeholder="Please enter amount..."
              value={amount}
              onValueChange={(e) => setAmount(e.value)}
            />
          </div>
          <div className="field col-12 ">
            <InputText
              placeholder="Notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
  const rightToolbarTemplate = (
    <div className="table-header-container">
      <Button
        label="Export"
        icon="pi pi-download ml-2"
        className="p-button-rounded p-button-secondary  p-button-outlined mr-3"
        onClick={exportCSV}
      />
      <Button
        label="PDF"
        type="button"
        icon="pi pi-file-pdf ml-2"
        onClick={exportPdf}
        className="p-button-rounded p-button-secondary  p-button-outlined mr-3"
        data-pr-tooltip="PDF"
      />
    </div>
  );
  const handleDelete = (data) => {
    dispatch(deleteCost(data._id));
    dispatch(getCosts());
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-outlined "
          onClick={() => handleDelete(rowData)}
        />
      </>
    );
  };

  const dateBodyTemplate = (rowData) => {
    if (rowData.createdAt) {
      const date = rowData.createdAt;
      const newDate = date.toString().split(":");
      const formatedDate = newDate[0].toString().substr(0, 10);
      return formatedDate;
    }
    return;
  };

  return (
    <>
      <Toolbar
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        ref={dt}
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={costsList}
        responsiveLayout="scroll"
      >
        {cols.map((col, index) => (
          <Column
            key={index}
            filter
            filterPlaceholder="filter..."
            field={col.field}
            header={col.header}
            // body={dateBodyTemplate}
          />
        ))}
        <Column
          body={(e) => actionBodyTemplate(e)}
          exportable={false}
          style={{ minWidth: "8rem" }}
        ></Column>
      </DataTable>
    </>
  );
}

export default Cost;
