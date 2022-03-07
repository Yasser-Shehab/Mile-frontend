import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../store/actions/projectAction";
import { getWorkers, asignProject } from "../../store/actions/workerAction";

import "./DataTable.css";
import Details from "./Details";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";

function Worker() {
  const [project, setProject] = useState({
    workerId: "",
    projectId: "",
    projectName: "",
  });
  const [expandedRows, setExpandedRows] = useState(null);
  const isMounted = useRef(false);
  const workersList = useSelector((state) => state.workerReducer.workers);
  // const workerObj = useSelector((state) => state.workerReducer.worker);
  const projectsList = useSelector((state) => state.projectReducer.projects);
  const [workerProjects, setWorkerProjects] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [specializationDialog, setspecializationDialog] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    mobile: null,
    nationalID: null,
  });

  const dispatch = useDispatch();

  const addProject = (workerId, project) => {
    setWorkerProjects([...workerProjects, project]);
    dispatch(asignProject(workerId, project.projectId));
  };

  useEffect(() => {
    isMounted.current = true;
    dispatch(getProjects());
    dispatch(getWorkers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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

 
  const openNew = () => {
    setInputValues(inputValues);
    setSubmitted(false);
    setspecializationDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setspecializationDialog(false);
    setInputValues(inputValues);
  };
  const onInputChange = (val, name) => {
    
    let _input = { ...inputValues };
    _input[`${name}`] = val;
    console.log(_input);
    setInputValues(_input);
    
  };
  console.log(inputValues);
  const onInputNumberChange = (e, name) => {
    console.log(e);
    const val = e.value;
    let _input = { ...inputValues };
    _input[`${name}`] = val;
    setInputValues(_input);
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
  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          // onClick={confirmDeleteSelected}
          // disabled={!selectedspecializations || !selectedspecializations.length}
          disabled
        />
      </>
    );
  };
  const specializationDialogFooter = (
    <>
      {/* <form> */}
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        //  loading={loading1}
        // type="submit"
        //  onClick={saveSpecialization}
      />
      {/* </form> */}
    </>
  );
  console.log("inputValue array", inputValues);
  return (
    <>
      <div className="datatable-rowexpansion-demo">
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
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
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} of workers"
          >
            <Column expander style={{ width: "3em" }} />
            <Column field="name" header="الاسم"></Column>
            <Column field="specs.name" header="اسم التخصص"></Column>
            <Column field="specs.type" header="نوع التخصص"></Column>
            <Column field="address" header="العنوان"></Column>
            <Column field="mobile" header="الموبايل"></Column>
            <Column field="nationalID" header="الرقم القومي"></Column>
          </DataTable>
          <form /*onSubmit={submitHandel}*/ noValidate>
            <Dialog
              visible={specializationDialog}
              style={{ width: "450px" }}
              header="Specialization Details"
              modal
              className="p-fluid"
              footer={specializationDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="name">أسم التخصص </label>
                <InputText
                  id="name"
                  value={inputValues.name}
                  name="name"
                  onChange={(e) => onInputChange(e.target.value, "name")}
                  // onChange={nameHandel}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !inputValues.name,
                  })}
                />
                {submitted && !inputValues.name && (
                  <small className="p-error">أسم التخصص مطلوب</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="address">العنوان</label>
                <InputText
                  id="address"
                  value={inputValues.address}
                  name="address"
                  onChange={(e) => onInputChange(e.target.value, "address")}
                  // onChange={typeHandel}
                  required
                  className={classNames({
                    "p-invalid": submitted && !inputValues.address,
                  })}
                />
                {submitted && !inputValues.address && (
                  <small className="p-error">نوع التخصص مطلوب</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="mobile">الموبيل</label>
                <InputNumber
                  mode="decimal"
                  useGrouping={false}
                  id="mobile"
                  name="mobile"
                  required
                  value={inputValues.mobile}
                  className={classNames({
                    "p-invalid": submitted && !inputValues.mobile,
                  })}
                  onValueChange={(e) => onInputNumberChange(e, "mobile")}
                />
                {submitted && !inputValues.mobile && (
                  <small className="p-error">رقم الموبيل مطلوب</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="nationalID">الرقم القومي</label>
                <InputNumber
                  mode="decimal"
                  useGrouping={false}
                  id="nationalID"
                  name="nationalID"
                  required
                  value={inputValues.nationalID}
                  className={classNames({
                    "p-invalid": submitted && !inputValues.nationalID,
                  })}
                  onValueChange={(e) => onInputNumberChange(e, "nationalID")}
                />
                {submitted && !inputValues.nationalID && (
                  <small className="p-error">الرقم القومي مطلوب</small>
                )}
              </div>
            </Dialog>
          </form>
        </div>
      </div>
    </>
  );
}

export default Worker;
