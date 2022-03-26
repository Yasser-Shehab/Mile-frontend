import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

import { useSelector, useDispatch } from "react-redux";
import { getCosts, addCost, deleteCost } from "../../store/actions/costAction";
import { getWorkers } from "../../store/actions/workerAction";
import { getProjects } from "../../store/actions/projectAction";

function Cost() {
  const costsList = useSelector((state) => state.costReducer.costs);
  const workersList = useSelector((state) => state.workerReducer.workers);
  const projectsList = useSelector((state) => state.projectReducer.projects);
  const [display, setDisplay] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [amount, setAmount] = useState(null);
  const [notes, setNotes] = useState("");

  const dt = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCosts());
    dispatch(getProjects());
    dispatch(getWorkers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.createdAt);
    return `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}  : الساعة ${date.getHours()}`;
  };

  const addNewCost = () => {
    setSubmitted(true);
    if (selectedWorker && selectedProject && amount) {
      let data = {
        workerId: selectedWorker._id,
        projectId: selectedProject._id,
        amount,
        notes,
      };
      dispatch(addCost(data));
      dispatch(getCosts());
      setDisplay(false);
      setSelectedWorker("");
      setSelectedProject("");
      setAmount(null);
      setNotes("");
    }
  };
  const onClick = () => {
    console.log(costsList);
    setDisplay(true);
    setSubmitted(false);
  };

  const onHide = () => {
    setDisplay(false);
    setSubmitted(false);
    setSelectedWorker("");
    setSelectedProject("");
    setAmount(null);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const renderFooter = () => {
    return (
      <div>
        <Button label="Cancel" onClick={onHide} className="p-button-text" />
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-text"
          onClick={addNewCost}
          autoFocus
        />
      </div>
    );
  };

  const leftToolbarTemplate = (
    <div className="table-header-container">
      <Button
        icon="pi pi-plus ml-3"
        label="اضافة تكلفة جديدة"
        onClick={onClick}
        className="p-button-info p-button-raised p-button-outlined p-button-rounded ml-2"
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
              className={classNames({
                "p-invalid": submitted && !selectedWorker,
              })}
              onChange={(e) => setSelectedWorker(e.target.value)}
              optionLabel="name"
              placeholder="Select a Worker"
            />
            {submitted && !selectedWorker && (
              <small className="p-error">العامل مطلوب</small>
            )}
          </div>
          <div className="field col-12 ">
            <Dropdown
              value={selectedProject}
              options={projectsList}
              className={classNames({
                "p-invalid": submitted && !selectedProject,
              })}
              onChange={(e) => setSelectedProject(e.target.value)}
              optionLabel="name"
              placeholder="Select a Project"
            />
            {submitted && !selectedProject && (
              <small className="p-error">المشروع مطلوب</small>
            )}
          </div>
          <div className="field col-12 ">
            <InputNumber
              placeholder="Please enter amount..."
              value={amount}
              className={classNames({
                "p-invalid": submitted && !amount,
              })}
              onValueChange={(e) => setAmount(e.value)}
            />
            {submitted && !amount && (
              <small className="p-error">المبلغ مطلوب</small>
            )}
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
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} of Costs"
      >
        <Column
          resizableColumns
          columnResizeMode="expand"
          showGridlines
          filter
          filterPlaceholder="filter..."
          //sortable
          field="worker.name"
          header="اسم العامل"
        ></Column>
        <Column
          resizableColumns
          columnResizeMode="expand"
          showGridlines
          filter
          filterPlaceholder="filter..."
          //sortable
          field="project.name"
          header="اسم المشروع"
        ></Column>
        <Column
          resizableColumns
          columnResizeMode="expand"
          showGridlines
          //sortable
          field="amount"
          header="المبلغ"
        ></Column>
        <Column
          resizableColumns
          columnResizeMode="expand"
          showGridlines
          //sortable
          field="createdAt"
          header="التاريخ"
          body={dateBodyTemplate}
        ></Column>
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
