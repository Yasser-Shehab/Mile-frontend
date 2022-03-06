import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useSelector, useDispatch } from "react-redux";
import { getCosts, addCost } from "../../store/actions/costAction";
import { getWorkers } from "../../store/actions/workerAction";
import getProjects from "../../store/actions/projectAction";

function Cost() {
  const costsList = useSelector((state) => state.costReducer.costs);
  const workersList = useSelector((state) => state.workerReducer.workers);
  const projectsList = useSelector((state) => state.projectReducer.projects);

  const [display, setDisplay] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [amount, setAmount] = useState(null);
  const [notes, setNotes] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCosts());
    dispatch(getProjects());
    dispatch(getWorkers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(selectedWorker, selectedProject, amount);
  const addNewCost = () => {
    let data = {
      workerId: selectedWorker,
      projectId: selectedProject,
      amount,
      notes,
    };
    dispatch(addCost(data));
    onHide();
  };
  const onClick = () => {
    setDisplay(true);
  };

  const onHide = () => {
    setDisplay(false);
  };

  const renderFooter = () => {
    return (
      <div>
        <Button label="Cancel" onClick={onHide} className="p-button-text" />
        <Button label="Add" icon="pi pi-check" onClick={addNewCost} autoFocus />
      </div>
    );
  };

  const header = (
    <div className="table-header-container">
      <Button icon="pi pi-plus" label="Asign new cost" onClick={onClick} />
      <Dialog
        header="Header"
        visible={display}
        style={{ width: "50vw" }}
        footer={renderFooter}
        onHide={onHide}
      >
        <div className="p-fluid grid formgrid">
          <div className="field col-12 ">
            <Dropdown
              value={selectedWorker}
              options={workersList}
              onChange={(e) => setSelectedWorker(e.target.value._id)}
              optionLabel="name"
              placeholder="Select a Worker"
            />
          </div>
          <div className="field col-12 ">
            <Dropdown
              value={selectedProject}
              options={projectsList}
              onChange={(e) => setSelectedProject(e.target.value._id)}
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

  return (
    <>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={costsList}
        responsiveLayout="scroll"
        header={header}
      >
        <Column field="worker.name" header="WorkerName"></Column>
        <Column field="project.name" header="ProjectName"></Column>
        <Column field="amount" header="Cost"></Column>
        <Column field="createdAt" header="CreatedAt"></Column>
      </DataTable>
    </>
  );
}

export default Cost;
