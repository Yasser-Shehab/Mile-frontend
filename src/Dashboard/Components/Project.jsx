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

  const [projectDialog, setProjectDialog] = useState(false);
  const [DeleteProjectDialog, setDeleteProjectDialog] = useState(false);

  const [project, setProject] = useState(emptyProject);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  const projectsList = useSelector((state) => state.projectReducer.projects);
  // const error = useSelector((state) => state.projectReducer.error);
  const [globalFilter, setGlobalFilter] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    if (project.name.trim() && project.budget !== 0) {
      if (!project.id) {
        console.log(project);
        dispatch(addProject(project));
        setProject(emptyProject);
      } else {
        dispatch(
          editProject(
            {
              name: project.name,
              description: project.description,
              budget: project.budget,
              images: project.images,
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

  const deleteHandel = (id) => {
    dispatch(deleteProject(id));
    setDeleteProjectDialog(false);

    setProject(emptyProject);
  };

  const editHandel = (data) => {
    setProject({
      id: data._id || data.id,
      name: data.name,
      budget: data.budget,
      description: data.description,
      images: data.images,
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

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="اضافة مشروع جديد"
          icon="pi pi-plus ml-3"
          className="p-button-info p-button-raised p-button-outlined p-button-rounded ml-2"
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

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded  p-button-outlined p-button-secondary mr-3"
          onClick={() => editHandel(rowData)}
        />

        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-outlined mr-3"
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
            placeholder="إبحث ..."
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
    let _project = { ...project };
    _project.images = [...JSON.parse(data.xhr.response).images];
    editHandel(_project);
  };

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.createdAt);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}  : الساعة ${date.getHours()}`;
  };
  return (
    <>
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
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
              //sortable
              filter
              filterPlaceholder="filter..."
              field="name"
              header="اسم المشروع"
            ></Column>
            <Column
              resizableColumns
              columnResizeMode="expand"
              showGridlines
              //sortable
              field="budget"
              header="المبلغ"
            ></Column>
            <Column
              resizableColumns
              dataType="date"
              columnResizeMode="expand"
              showGridlines
              //sortable
              field="createdAt"
              header="التاريخ"
              filterField="date"
              body={dateBodyTemplate}
            ></Column>
            <Column
              resizableColumns
              columnResizeMode="expand"
              showGridlines
              field="description"
              header="بعض التفاصيل"
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

          {project.images.length !== 0 && <h3>Please choose Thumbnail...</h3>}
          <div className="card">
            {project.images.length !== 0 &&
              project.images.map((image, i) => {
                return (
                  <Image
                    key={i}
                    src={image}
                    onClick={() => handleThumbnail(image)}
                    width="250"
                  />
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
          maximizable
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
