import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecializations,
  addSpecializations,
} from "../../store/actions/specAction";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

// let emptyProduct = {
//   name: "AAA",
// };

function Specialization() {
  const specsList = useSelector((state) => state.specializationReducer.specs);
  const dispatch = useDispatch();
  // const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [specializationDialog, setspecializationDialog] = useState(false);
  const [inputValues, setInputValues] = useState({ name: "", type: "" });
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);

  const [deleteValue, setDeleteValue] = useState("");
  // const [errors, setErrors] = useState({ errName: "", errType: "" });
  const [loading1, setLoading1] = useState(false);
  useEffect(() => {
    dispatch(getSpecializations());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(specsList);
  const openNew = () => {
    setInputValues(inputValues);
    setSubmitted(false);
    setspecializationDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setspecializationDialog(false);
    setInputValues({ name: "", type: "" });
  };

  const saveSpecialization = () => {
    setLoading1(true);
    setSubmitted(true);
    if (inputValues.name.trim() && inputValues.name.trim()) {
      setspecializationDialog(false);
    }
    setLoading1(false);
  };
 
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
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
          // disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };
  const confirmDeleteProduct = (spec) => {
    console.log(spec);
    setDeleteValue(spec);
    setDeleteProductDialog(true);
  };

  const specializationDialogFooter = (
    <>
      <form>
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
          loading={loading1}
          type="submit"
          onClick={saveSpecialization}
        />
      </form>
    </>
  );
  const nameHandel = (event) => {
    setInputValues({ ...inputValues, name: event.target.value });
    console.log(inputValues);
  };

  const typeHandel = (event) => {
    setInputValues({ ...inputValues, type: event.target.value });
    console.log(inputValues);
  };
  const submitHandel = (event) => {
    event.preventDefault();
    console.log(inputValues);
    dispatch(addSpecializations(inputValues));
    // console.log("event");
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          // onClick={() => editProduct(rowData)}
        />
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
        //  onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        //  onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };
  return (
    <>
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={specsList}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} specialization"
      >
        <Column field="name" header="First Name"></Column>
        <Column field="type" header="Type"></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "8rem" }}
        ></Column>
      </DataTable>
      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <form onSubmit={submitHandel} noValidate>
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
              // onChange={(e) => onInputChange(e, "name")}
              onChange={nameHandel}
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
            <label htmlFor="typr">نوع التخصص</label>
            <InputText
              id="type"
              value={inputValues.type}
              name="type"
              // onChange={(e) => onInputChange(e, "name")}
              onChange={typeHandel}
              required
              className={classNames({
                "p-invalid": submitted && !inputValues.type,
              })}
            />
            {submitted && !inputValues.type && (
              <small className="p-error">نوع التخصص مطلوب</small>
            )}
          </div>
          {/* <Button
            label="Save"
            icon="pi pi-check"
            className="p-button-text"
            // type="submit"
          >
            submijj
          </Button> */}
        </Dialog>
      </form>
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
          {deleteValue && (
            <span>
              Are you sure you want to delete <b>{deleteValue.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default Specialization;
