import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { TreeSelect } from "primereact/treeselect";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "primereact/message";
import { getProjects } from "../../store/actions/projectAction";
import { getSpecializations } from "../../store/actions/specAction.js";
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

import React from "react";
import { Divider } from "primereact/divider";

function Worker() {
  const [project, setProject] = useState({
    workerId: "",
    projectId: "",
    projectName: "",
    specialization: "",
  });
  const [expandedRows, setExpandedRows] = useState(null);
  const isMounted = useRef(false);
  const workersList = useSelector((state) => state.workerReducer.workers);

  const projectsList = useSelector((state) => state.projectReducer.projects);
  const specsList = useSelector((state) => state.specializationReducer.specs);
  const [workerProjects, setWorkerProjects] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [workerDialog, setWorkerDialog] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [deleteWorkerDialog, setDeleteWorkerDialog] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    mobile: "",
    nationalID: "",
    specialization: "",
    projects: [],
  });

  const [deleteValue, setDeleteValue] = useState("");

  const [globalFilter, setGlobalFilter] = useState(null);

  const [deleteProjectFlag, setDeleteProjectFlag] = useState(false); //the flag to switch between delete project or not
  const [selectedDeleteProject, setSelectedDeleteProject] = useState([""]); //the selected delete project
  const dispatch = useDispatch();
  // ///////    tree select    ---------------------->>>>>>
  const [nodes, setNodes] = useState([]);

  const addProject = (workerId, project) => {
    setWorkerProjects([...workerProjects, project]);
    dispatch(asignProject(workerId, project.projectId));
  };

  const getNodes = (arr) => {
    const names = arr.reduce((previousValue, currentValue) => {
      return {
        ...previousValue,
        [currentValue.name]: arr
          .filter((e) => {
            return e.name === currentValue.name;
          })
          .map((child) => {
            return {
              key: child._id,
              label: child.type,
            };
          }),
      };
    }, {});

    return Object.keys(names).map((s) => {
      return {
        key: s,
        label: s,
        children: names[s],
      };
    });
  };

  useEffect(() => {
    isMounted.current = true;
    dispatch(getProjects());
    dispatch(getWorkers());
    dispatch(getSpecializations());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteProjectsHandel = (data) => {
    setSelectedDeleteProject(data);
    setDeleteProjectFlag(!deleteProjectFlag);
  };

  const onBadgeClick = (ev, id) => {
    if (deleteProjectFlag) {
      setWorkerProjects(
        workerProjects.filter((p) => {
          return p._id === id;
        })
      );
      dispatch(
        editWorker(
          {
            projects: selectedDeleteProject.filter(
              (ele) => ele !== ev.target.name
            ),
          },
          id
        )
      );
      setDeleteProjectFlag(!deleteProjectFlag);
    }
  };

  const onProjectChange = (e, workerId) => {
    setProject({
      workerId,
      projectId: e.value._id,
      projectName: e.value.name,
    });
  };

  // ***********   show nested data   ******************
  const rowExpansionTemplate = (data) => {
    return (
      <Details>
        <h1>{data.name}</h1>
        {data.projects.length !== 0 && (
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <i className="pi pi-building ml-2"></i>
              <b>المشاريع</b>
            </div>
          </Divider>
        )}
        {data.projects.map((id) => {
          return projectsList.map((p) => {
            if (p._id === id)
              return (
                <Button
                  name={id}
                  key={p._id}
                  size="xlarge"
                  onClick={(e) => {
                    onBadgeClick(e, data._id);
                  }}
                  className={
                    deleteProjectFlag && data._id
                      ? "p-button-rounded p-button-danger"
                      : "p-button-rounded p-button-warning"
                  }
                  style={{ marginRight: "1rem", marginTop: "1rem" }}
                >
                  {p.name}
                </Button>
              );
          });
        })}

        {workerProjects
          .filter((p) => {
            return p.workerId === data._id;
          })
          .map((project, i) => {
            return (
              <>
                <Button
                  key={i}
                  label={project.projectName}
                  size="large"
                  onClick={(e) => {
                    onBadgeClick(e, data._id);
                  }}
                  className={
                    deleteProjectFlag && data._id
                      ? "p-button-rounded p-button-danger"
                      : "p-button-rounded p-button-warning"
                  }
                  style={{ marginRight: "1rem", marginTop: "1rem" }}
                ></Button>
              </>
            );
          })}
        {(!(data.projects.length === 0) || !(workerProjects.length === 0)) && (
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger p-button-outlined mr-3"
            onClick={() => deleteProjectsHandel(data.projects)}
          />
        )}

        <Divider align="left" className="mt-5 mb-5">
          <div className="inline-flex align-items-center">
            <i className="pi pi-building ml-2"></i>
            <b>اضافة مشروع جديد</b>
          </div>
        </Divider>

        <Dropdown
          className="mr-2"
          value={project}
          options={projectsList}
          onChange={(e) => onProjectChange(e, data._id)}
          optionLabel="name"
          placeholder="اختر مشروع جديد"
        />
        {/* <SplitButton
          label={
            data._id === project.workerId
              ? project.projectName
              : "اختار مشروع جديد"
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
          className="p-button-raised p-button-outlined mr-5"
        ></SplitButton> */}

        <Button
          label="اضافة"
          icon="pi pi-plus ml-2"
          className="p-button-rounded p-button-outlined p-button-info mr-2"
          onClick={() => addProject(data._id, project)}
        />
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
    setNodes(getNodes(specsList));
  };

  const saveWorker = () => {
    setSubmitted(true);
    if (
      inputValues.name.trim() &&
      inputValues.address.trim() &&
      inputValues.mobile &&
      inputValues.nationalID &&
      inputValues.specialization
    ) {
      if (!inputValues.id) {
        inputValues.projects = [inputValues.projects._id];
        dispatch(addWorker(inputValues));
      } else {
        dispatch(
          editWorker(
            {
              name: inputValues.name,
              address: inputValues.address,
              mobile: inputValues.mobile,
              nationalID: inputValues.nationalID,
              specialization: inputValues.specialization,
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
        specialization: "",
      });
    }
  };

  const hideDialog = () => {
    setSubmitted(false);
    setWorkerDialog(false);
    setInputValues({
      name: "",
      address: "",
      mobile: "",
      nationalID: "",
      specialization: "",
    });
    setSubmitErr("");
  };
  const onInputChange = (val, name) => {
    let _input = { ...inputValues };
    _input[`${name}`] = val;
    setInputValues(_input);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value;
    let _input = { ...inputValues };
    _input[`${name}`] = `${val}`;
    setInputValues(_input);
  };
  const nameInputChange = (event) => {
    setInputValues({ ...inputValues, name: event.target.value });
  };
  const address = (event) => {
    setInputValues({ ...inputValues, address: event.target.value });
  };
  const confirmDeleteWorker = (worker) => {
    setDeleteValue(worker);
    setDeleteWorkerDialog(true);
  };
  const deleteHandel = (data) => {
    dispatch(deleteWorker(data._id));
    setDeleteWorkerDialog(false);
  };
  const hideDeleteWorkerDialog = () => {
    setDeleteWorkerDialog(false);
  };
  const editWorkers = (data) => {
    setNodes(getNodes(specsList));

    setInputValues({
      ...inputValues,
      id: data._id,
      name: data.name,
      address: data.address,
      mobile: data.mobile,
      nationalID: data.nationalID,
      specialization: nodes
        .filter((n) => {
          return n?.children.filter((child) => {
            return child.key === data.specialization;
          })[0];
        })[0]
        ?.children.filter((ch) => {
          return ch.key === data.specialization;
        })[0].key,
    });
    setWorkerDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="اضافة عامل جديد"
          icon="pi pi-user-plus ml-3"
          className="p-button-info p-button-raised p-button-outlined p-button-rounded ml-2"
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
        onClick={saveWorker}
      />
      {/* </form> */}
    </>
  );
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-user-edit"
          className="p-button-rounded  p-button-outlined p-button-secondary ml-3"
          onClick={() => editWorkers(rowData)}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-outlined mr-2"
          onClick={() => confirmDeleteWorker(rowData)}
        />
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-plus"
          // label="Expand All"
          className="p-button-rounded p-button-secondary  p-button-outlined ml-3"
          onClick={expandAll}
        />
        <Button
          icon="pi pi-minus"
          // label="Collapse All"
          className="p-button-rounded p-button-secondary  p-button-outlined ml-3"
          onClick={collapseAll}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="إبحث ..."
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
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} of workers"
            globalFilter={globalFilter}
          >
            <Column expander style={{ width: "3em" }} />
            <Column
              filter
              filterPlaceholder="filter..."
              field="name"
              header="الاسم"
            ></Column>
            <Column
              filter
              filterPlaceholder="filter..."
              // sortable
              field="specs.name"
              header="اسم التخصص"
            ></Column>
            <Column
              filter
              filterPlaceholder="filter..."
              // sortable
              field="specs.type"
              header="نوع التخصص"
            ></Column>
            <Column field="address" header="العنوان"></Column>
            <Column
              filter
              filterPlaceholder="filter..."
              field="mobile"
              header="الموبايل"
            ></Column>
            <Column
              filter
              filterPlaceholder="filter..."
              field="nationalID"
              header="الرقم القومي"
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
          <form noValidate>
            <Dialog
              visible={workerDialog}
              style={{ width: "450px" }}
              header="Worker Details"
              modal
              maximizable
              className="p-fluid"
              footer={specializationDialogFooter}
              onHide={hideDialog}
            >
              {submitErr && <Message severity="error" text={submitErr} />}
              <div className="field">
                <label htmlFor="name"> اسم العامل </label>
                <InputText
                  id="name"
                  value={inputValues.name}
                  name="name"
                  onChange={nameInputChange}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !inputValues.name,
                  })}
                />
                {submitted && !inputValues.nationalID && (
                  <small className="p-error">الاسم مطلوب</small>
                )}
              </div>

              <div className="field">
                <label htmlFor="address">العنوان</label>
                <InputText
                  id="address"
                  value={inputValues.address}
                  name="address"
                  onChange={address}
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
                <InputMask
                  id="mobile"
                  name="mobile"
                  required
                  mask="01999999999"
                  slotChar=""
                  placeholder="01000000000"
                  value={inputValues.mobile}
                  className={classNames({
                    "p-invalid": submitted && !inputValues.mobile,
                  })}
                  onChange={(e) => onInputNumberChange(e, "mobile")}
                ></InputMask>
                {submitted && !inputValues.mobile && (
                  <small className="p-error">رقم الموبيل مطلوب</small>
                )}
              </div>
              <div className="field">
                <label htmlFor="nationalID">الرقم القومي</label>
                <InputMask
                  id="nationalID"
                  name="nationalID"
                  required
                  mask="99999999999999"
                  slotChar="-"
                  value={inputValues.nationalID}
                  placeholder="00000000000000"
                  onChange={(e) => onInputNumberChange(e, "nationalID")}
                ></InputMask>
                {submitted && !inputValues.nationalID && (
                  <small className="p-error">الرقم القومي مطلوب</small>
                )}

                <div className="field mt-3">
                  <label htmlFor="specialization">التخصص</label>
                  <TreeSelect
                    value={inputValues.specialization}
                    options={nodes}
                    onChange={(e) => onInputNumberChange(e, "specialization")}
                    placeholder="Select Item"
                    filter
                  ></TreeSelect>

                  {submitted && !inputValues.specialization && (
                    <small className="p-error">التخصص مطلوب</small>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="projects">المشروع</label>
                  <Dropdown
                    value={inputValues.projects}
                    options={projectsList}
                    onChange={(e) => onInputChange(e.target.value, "projects")}
                    optionLabel="name"
                    placeholder="Select a Project"
                  />
                </div>
              </div>
            </Dialog>
          </form>
          <Dialog
            visible={deleteWorkerDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            maximizable
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
