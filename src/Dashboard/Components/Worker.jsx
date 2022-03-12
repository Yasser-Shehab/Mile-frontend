import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getProjects } from "../../store/actions/projectAction";
import {
  getWorkers,
  asignProject,
  addWorker,
  deleteWorker,
  editWorker,
} from "../../store/actions/workerAction";

import "./DataTable.css";
import Details from "./Details";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import React from "react";

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
  const [workerDialog, setWorkerDialog] = useState(false);
  const [deleteWorkerDialog, setDeleteWorkerDialog] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    mobile: "",
    nationalID: "",
  });
  const [deleteValue, setDeleteValue] = useState("");
<<<<<<< HEAD
  const [deleteProjectFlag, setDeleteProjectFlag] = useState(false);
  const [selectedDeleteProject, setSelectedDeleteProject] = useState([""]);

  const [globalFilter, setGlobalFilter] = useState(null);

=======
  const [deleteProjectFlag, setDeleteProjectFlag] = useState(false);//the flag to switch between delete project or not
  const [selectedDeleteProject, setSelectedDeleteProject] = useState([""]);//the selected delete project
const [deletedProject,setDeletedProject]=useState("")
>>>>>>> 86cafb7dd74ac944588973bbf6ae107277e021f0
  const dispatch = useDispatch();

  const addProject = (workerId, project) => {
    setWorkerProjects([...workerProjects, project]);
    dispatch(asignProject(workerId, project.projectId));
  };
  // console.log(workerProjects);
  // console.log(projectsList);



  console.log(project);
  useEffect(() => {
    isMounted.current = true;
    dispatch(getProjects());
    dispatch(getWorkers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteProjectsHandel = (dataa) => {
    console.log(dataa);
    setSelectedDeleteProject(dataa);
    setDeleteProjectFlag(!deleteProjectFlag);
  };
  
  const onBadgeClick = (ev, id) => {
    if (deleteProjectFlag) {
      console.log("slectedDeleteProject", selectedDeleteProject);
       // setDeletedProject(
      //   selectedDeleteProject.filter((ele) => ele !== ev.target.name));
      let arr = selectedDeleteProject.filter((ele) => ele !== ev.target.name);
      dispatch(
        editWorker(
          {
            projects: arr
          },
          id
        )
      );
      setDeleteProjectFlag(!deleteProjectFlag);
      console.log("aarr",arr);
      // confirmDeleteProject(id)
    }
    
  };
//   const confirmDeleteProject = (id) => {
//     console.log(id);
//     console.log(deletedProject);
//   dispatch(
//     editWorker(
//       {
//         projects: deletedProject,
//       },
//       id
//     )
//   );
// }

  // ***********   show nested data   ******************
  const rowExpansionTemplate = (data) => {
    console.log(data);
    // setSelectedUser(data._id);
    return (
      <Details>
        <h1>{data.name}</h1>
        {data.projects.length !== 0 && <h3>Projects</h3>}

        {data.projects.map((id) => {
          return projectsList.map((p) => {
            if (p._id === id)
              return (
                <Button
                  name={id}
                  
                  key={p._id}
                  // label={p.name}
                  size="xlarge"
                  onClick={(e) => {
                    onBadgeClick(e,data._id);
                  }}
                  className={
                    deleteProjectFlag && data._id ? "p-button-danger" : "p-button-success"
                  }
                  style={{ marginRight: "1rem", marginTop: "1rem" }}
                >{ p.name}</Button>
              );
          });
        })}
        {workerProjects.map((p) => {
          if (p.workerId === data._id)
            return (
              <>
                <Button
                  key={p.projectId}
                  label={p.projectName}
                  size="large"
                  className={
                    deleteProjectFlag ? "p-button-danger" : "p-button-success"
                  }
                  style={{ marginRight: "1rem", marginTop: "1rem" }}
                ></Button>
              </>
            );
        })}
        {/* {console.log(data.projects)} */}
        {/* {console.log(workerProjects)} */}

        {(!(data.projects.length === 0) || !(workerProjects.length === 0)) && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => deleteProjectsHandel(data.projects)}
          />
        )}

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
    setWorkerDialog(true);
  };

  const saveWorker = () => {
    setSubmitted(true);
    if (
      inputValues.name.trim() &&
      inputValues.address.trim() &&
      inputValues.mobile !== 0 &&
      inputValues.nationalID !== 0
    ) {
      console.log(inputValues);
      if (!inputValues.id) {
        dispatch(addWorker(inputValues));
        console.log(inputValues);
      } else {
        console.log("edit values", inputValues);
        dispatch(
          editWorker(
            {
              name: inputValues.name,
              address: inputValues.address,
              mobile: inputValues.mobile,
              nationalID: inputValues.nationalID,
            },
            inputValues.id
          )
        );
      }

      setWorkerDialog(false);
      setInputValues({
        name: "",
        address: "",
        mobile: "",
        nationalID: "",
      });
    }
  };

  const hideDialog = () => {
    setSubmitted(false);
    setWorkerDialog(false);
    setInputValues({ name: "", address: "", mobile: "", nationalID: "" });
  };
  const onInputChange = (val, name) => {
    let _input = { ...inputValues };
    _input[`${name}`] = val;
    console.log(_input);
    setInputValues(_input);
  };
  const onInputNumberChange = (e, name) => {
    const val = e.value;
    let _input = { ...inputValues };
    _input[`${name}`] = val;
    setInputValues(_input);
  };
  const confirmDeleteWorker = (worker) => {
    setDeleteValue(worker);
    setDeleteWorkerDialog(true);
  };
  const deleteHandel = (data) => {
    console.log("data", data._id);
    dispatch(deleteWorker(data._id));
    setDeleteWorkerDialog(false);
  };
  const hideDeleteWorkerDialog = () => {
    setDeleteWorkerDialog(false);
  };
  const editWorkers = (data) => {
    console.log("data", data);
    setInputValues({
      ...inputValues,
      id: data._id,
      name: data.name,
      address: data.address,
      mobile: data.mobile,
      nationalID: data.nationalID,
    });
    // console.log(data);
    setWorkerDialog(true);
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
          label="Add New Worker"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
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
        onClick={saveWorker}
      />
      {/* </form> */}
    </>
  );
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editWorkers(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteWorker(rowData)}
        />
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </React.Fragment>
    );
  };

  const deletespecializationDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteWorkerDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          deleteHandel(deleteValue);
        }}
      />
    </>
  );

  return (
    <>
      <div className="datatable-rowexpansion-demo">
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
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
            globalFilter={globalFilter}
          >
            <Column expander style={{ width: "3em" }} />
            <Column field="name" header="الاسم"></Column>
            <Column field="specs.name" header="اسم التخصص"></Column>
            <Column field="specs.type" header="نوع التخصص"></Column>
            <Column field="address" header="العنوان"></Column>
            <Column field="mobile" header="الموبايل"></Column>
            <Column field="nationalID" header="الرقم القومي"></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
          <form /*onSubmit={submitHandel}*/ noValidate>
            <Dialog
              visible={workerDialog}
              style={{ width: "450px" }}
              header="Worker Details"
              modal
              className="p-fluid"
              footer={specializationDialogFooter}
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="name"> اسم العامل </label>
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
                  <small className="p-error">أسم العامل مطلوب</small>
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
                  <small className="p-error">العنوان مطلوب</small>
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
                    "p-invalid": submitted && !inputValues.nationalID /*||
                        inputValues.nationalID.toString().legnth !== 14)*/,
                  })}
                  onValueChange={(e) => onInputNumberChange(e, "nationalID")}
                />
                {/* {console.log(inputValues.nationalID.toString().length)}
                {console.log(inputValues.nationalID.toString().legnth > 2)}
                {console.log(inputValues.nationalID)} */}

                {submitted && !inputValues.nationalID && (
                  <small className="p-error">الرقم القومي مطلوب</small>
                )}
                {/* {submitted &&
                  inputValues.nationalID.toString().legnth !== 14 && (
                    <small className="p-error">الرقم القومي يجب ان يكون 14 رقم</small>
                  )} */}
              </div>
            </Dialog>
          </form>
          <Dialog
            visible={deleteWorkerDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deletespecializationDialogFooter}
            onHide={hideDeleteWorkerDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {deleteValue && (
                <span>
                  Are you sure you want to delete
                  <b>{deleteValue.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Worker;
