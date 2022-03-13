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
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

function Project() {
  let emptyProject = {
    thumbnail: "",
    images: [],
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
  const [globalFilter, setGlobalFilter] = useState(null);

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
    // // logic add
    if (project.name.trim() && project.budget !== 0) {
      if (!project.id) {
        console.log(project);
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

  const confirmDeleteProject = (project) => {
    setProject(project);
    setDeleteProjectDialog(true);
  };

  // Delete from DB
  const deleteHandel = (id) => {
    dispatch(deleteProject(id));
    setDeleteProjectDialog(false);
    // dispatch(getProjects());
    setProject(emptyProject);
  };

  const editHandel = (data) => {
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
    setProject(_project);
  };

  const onInputNumberChange = (e, name) => {
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
      <>
        <Button
          label="Add New Project"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
      </>
    );
  };

  const projectDialogFooter = (
    <>
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
    </>
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
    <>
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
    </>
  );
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

  //  *****************     upload new images   **********************
  const handleThumbnail = (image) => {
    let _project = { ...project };
    _project.thumbnail = image;
    setProject(_project);
  };
  const uploadImage = (data) => {
    setProject({
      thumbnail: "",
      images: JSON.parse(data.xhr.response).images,
      name: "",
      budget: 0,
      description: "",
    });
  };

  return (
    <>
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
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
            value={projectsList}
            dataKey="_id"
            responsiveLayout="scroll"
            ref={dt}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} of Projects"
            globalFilter={globalFilter}
          >
            <Column
              resizableColumns
              columnResizeMode="expand"
              showGridlines
              sortable
              field="name"
              header="Project Name"
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
              sortable
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
          maximizable
          breakpoints={{
            "2560px": "50vw",
            "1440px": "70vw",
            "1024px": "80vw",
            "640px": "90vw",
          }}
          className="p-fluid"
          footer={projectDialogFooter}
          onHide={hideDialog}
        >
          {/* **************     Project images    *************** */}
          <div>
            {project.images.length !== 0 &&
              project.images.map((image, i) => {
                return (
                  <div
                    key={i}
                    className="card"
                    onClick={() => handleThumbnail(image)}
                  >
                    <Image src={image} width="250" />
                  </div>
                );
              })}
          </div>
          <div className="field">
            <label htmlFor="name">Project images</label>
            <FileUpload
              name="images"
              onUpload={uploadImage}
              multiple
              accept="image/*"
              maxFileSize={1000000}
              url="http://localhost:8000/project/uploadImage"
            />
          </div>

          {/* *********   name    *************** */}
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

          {/* *********   Description    *************** */}
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

          {/* *********   Budget    *************** */}
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
