import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  addProject,
  deleteProject,
  editProject,
} from "../../store/actions/projectAction";
import { Button } from "primereact/button";
import React from "react";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

function Project() {
  let emptyProject = {
    name: "",
    budget: 0,
    description: "",
  };
  // array to collect in it
  const [projects, setProjects] = useState(null);
  const [projectDialog, setProjectDialog] = useState(false);
  const [DeleteProjectDialog, setDeleteProjectDialog] = useState(false);
  // initial empty project
  const [project, setProject] = useState(emptyProject);
  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);
  const projectsList = useSelector((state) => state.projectReducer.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    // fill my array with data
    // setProjects(projectsList);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   header
  const openNew = () => {
    setProject(emptyProject);
    setSubmitted(false);
    setProjectDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProjectDialog(false);
  };

  const hideDeleteProjectDialog = () => {
    setDeleteProjectDialog(false);
  };

  /*************************** Add in DB  **********************************/
  const saveProject = () => {
    setSubmitted(true);

    // logic add
    if (project.name.trim() && project.budget !== 0) {
      if (!project.id) {
        dispatch(addProject(project));
        setProject(emptyProject);
        // dispatch(getProjects());
      } else {
        dispatch(
          editProject(
            {
              name: project.name,
              description: project.description,
              budget: project.budget,
            },
            project.id
          )
        );
      }
      setProjectDialog(false);
      setProject(emptyProject);
    }
  };
  console.log(project);

  const confirmDeleteProject = (project) => {
    setProject(project);
    setDeleteProjectDialog(true);
  };
  console.log(!project.name && !project.budget);

  // Delete from DB
  const deleteHandel = (id) => {
    dispatch(deleteProject(id));
    setDeleteProjectDialog(false);
    dispatch(getProjects());
    setProject(emptyProject);
  };

  const editHandel = (data) => {
    console.log(data);
    setProject({
      ...projects,
      id: data._id,
      name: data.name,
      budget: data.budget,
      description: data.description,
    });
    setProjectDialog(true);
  };

  const onInputChange = (val, name) => {
    let _project = { ...project };
    _project[`${name}`] = val;
    console.log(_project);
    setProject(_project);
  };

  const onInputNumberChange = (e, name) => {
    console.log(e);
    const val = e.value || 0;
    let _project = { ...project };
    _project[`${name}`] = val;

    setProject(_project);
  };

  // const formatDate = (value) => {

  //   return value.toLocaleDateString("en-US", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });
  // };
  // const dateBodyTemplate = (rowData) => {
  //   return formatDate(rowData.createdAt);
  // };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Add New Project"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const projectDialogFooter = (
    <React.Fragment>
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
        onClick={saveProject}
      />
    </React.Fragment>
  );

  // Delete Icon

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editHandel(rowData)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProject(rowData)}
        />
      </>
    );
  };

  const DeleteProjectDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProjectDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => deleteHandel(project._id)}
      />
    </React.Fragment>
  );

  return (
    <>
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar left={leftToolbarTemplate}></Toolbar>
          <DataTable
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            value={projectsList}
            dataKey="_id"
            responsiveLayout="scroll"
            ref={dt}
          >
            <Column
              resizableColumns
              columnResizeMode="expand"
              showGridlines
              sortable
              field="name"
              header="First Name"
            ></Column>
            <Column
              resizableColumns
              columnResizeMode="expand"
              showGridlines
              sortable
              field="budget"
              header="Budget"
            ></Column>
            <Column
              resizableColumns
              dataType="date"
              // body={dateBodyTemplate}
              columnResizeMode="expand"
              showGridlines
              field="createdAt"
              header="Created At"
            ></Column>
            <Column
              resizableColumns
              columnResizeMode="expand"
              showGridlines
              field="description"
              header="Description"
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
              // header="Delete"
            ></Column>
          </DataTable>
        </div>
        <Dialog
          visible={projectDialog}
          style={{ width: "450px" }}
          header="Project Details"
          modal
          className="p-fluid"
          footer={projectDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={project.name}
              onChange={(e) => onInputChange(e.target.value, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !project.name,
              })}
            />
            {submitted && !project.name && (
              <small className="p-error">Name is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <InputTextarea
              id="description"
              value={project.description}
              onChange={(e) => onInputChange(e.target.value, "description")}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="budget">Budget</label>
              <InputNumber
                id="budget"
                value={project.budget}
                onValueChange={(e) => onInputNumberChange(e, "budget")}
                mode="currency"
                currency="USD"
                locale="en-US"
                className={classNames({
                  "p-invalid": submitted && project.budget === 0,
                })}
              />
              {submitted && project.budget === 0 && (
                <small className="p-error">Budget is required.</small>
              )}
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={DeleteProjectDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={DeleteProjectDialogFooter}
          onHide={hideDeleteProjectDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {project && (
              <span>
                Are you sure you want to delete <b>{project.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default Project;
