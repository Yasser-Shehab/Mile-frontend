import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  addProject,
  deleteProject,
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
import axios from "axios";

function Project() {
  let emptyProject = {
    id: null,
    name: "",
    budget: 0,
    description: "",
  };
  // array to collect in it
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  // initial empty project
  const [product, setProduct] = useState(emptyProject);
  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);
  const projectsList = useSelector((state) => state.projectReducer.projects);
  const projectObj = useSelector((state) => state.projectReducer.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    // fill my array with data
    setProducts(projectsList);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   header
  const openNew = () => {
    setProduct(emptyProject);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  /*************************** Add in DB  **********************************/
  const saveProduct = () => {
    setSubmitted(true);

    // logic add

    const newProject = {
      id: product.id,
      name: product.name,
      description: product.description,
      budget: product.budget,
    };

    dispatch(addProject(newProject));
    setProductDialog(false);
    setProduct(emptyProject);
    dispatch(getProjects());
  };

  const confirmDeleteProduct = (project) => {
    setProduct(project);
    setDeleteProductDialog(true);
  };

  // Delete from DB
  const deleteProduct = (id) => {
    dispatch(deleteProject(id));
    setDeleteProductDialog(false);
    setProduct(emptyProject);
    dispatch(getProjects());
  };

  const onInputChange = (val, name) => {
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

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

  const productDialogFooter = (
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
        onClick={saveProduct}
      />
    </React.Fragment>
  );

  // Delete Icon

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => deleteProduct(product._id)}
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
              header="Delete"
            ></Column>
          </DataTable>
        </div>
        <Dialog
          visible={productDialog}
          style={{ width: "450px" }}
          header="Project Details"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={product.name}
              onChange={(e) => onInputChange(e.target.value, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.name,
              })}
            />
            {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <InputTextarea
              id="description"
              value={product.description}
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
                value={product.budget}
                onValueChange={(e) => onInputNumberChange(e, "budget")}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={deleteProductDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default Project;
