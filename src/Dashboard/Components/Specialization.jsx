import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecializations,
  addSpecializations,
  deleteSpecializations,
  editSpecializations,
} from "../../store/actions/specAction";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { getWorkers } from "../../store/actions/workerAction";
import { Card } from "primereact/card";
function Specialization() {
  const specsList = useSelector((state) => state.specializationReducer.specs);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [specializationDialog, setspecializationDialog] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    type: "",
  });
  const [deletespecializationDialog, setDeletespecializationDialog] =
    useState(false);
  const [deleteValue, setDeleteValue] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const workersList = useSelector((state) => state.workerReducer.workers);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);

  const [workersSpec, setWorkersSpec] = useState([]);

  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getWorkers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
    if (inputValues.name.trim() && inputValues.type.trim()) {
      console.log(inputValues);
      if (!inputValues.id) {
        dispatch(addSpecializations(inputValues));
      } else {
        dispatch(
          editSpecializations(
            { name: inputValues.name, type: inputValues.type },
            inputValues.id
          )
        );
      }

      setspecializationDialog(false);
      setInputValues({ name: "", type: "" });
    }

    setLoading1(false);
  };

  const confirmDeletespecialization = (spec) => {
    setDeleteValue(spec);
    setDeletespecializationDialog(true);
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
        loading={loading1}
        // type="submit"
        onClick={saveSpecialization}
      />
      {/* </form> */}
    </>
  );
  const editspecialization = (data) => {
    setInputValues({
      ...inputValues,
      id: data._id,
      name: data.name,
      type: data.type,
    });
    setspecializationDialog(true);
  };

  const showDetails = (data) => {
    setWorkersSpec(
      workersList.filter((w) => {
        return w.specialization === data._id;
      })
    );

    setDisplayMaximizable(true);
  };

  const nameHandel = (event) => {
    setInputValues({ ...inputValues, name: event.target.value });
  };

  const typeHandel = (event) => {
    setInputValues({ ...inputValues, type: event.target.value });
  };
  const submitHandel = (event) => {
    console.log(event);
    event.preventDefault();
  };
  const deleteHandel = (data) => {
    dispatch(deleteSpecializations(data._id));
    setDeletespecializationDialog(false);
  };
  const hideDeletespecializationDialog = () => {
    setDeletespecializationDialog(false);
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="اضافة تخصص جديد"
          icon="pi pi-plus ml-3"
          className="p-button-info p-button-raised p-button-outlined p-button-rounded ml-3"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };
  const dialogFuncMap = {
    displayMaximizable: setDisplayMaximizable,
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    setInputValues({ name: "", mobile: "" });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded  p-button-outlined p-button-secondary ml-3"
          onClick={() => editspecialization(rowData)}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-outlined ml-3"
          onClick={() => confirmDeletespecialization(rowData)}
        />
        <Button
          label="العاملين"
          icon="pi pi-users ml-2"
          className="p-button-rounded p-button-outlined"
          onClick={() => showDetails(rowData)}
        />
      </React.Fragment>
    );
  };

  const deletespecializationDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeletespecializationDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          deleteHandel(deleteValue);
        }}
      />
    </React.Fragment>
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

  return (
    <>
      <Toolbar
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={specsList}
        paginator
        rows={10}
        responsiveLayout="scroll"
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} of Specialization"
        globalFilter={globalFilter}
        dataKey="_id"
      >
        <Column
          //sortable

          field="name"
          header="اسم التخصص"
        ></Column>
        <Column
          // sortable

          field="type"
          header="نوع التخصص"
        ></Column>

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
          maximizable
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
        </Dialog>
      </form>
      <Dialog
        visible={deletespecializationDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        maximizable
        footer={deletespecializationDialogFooter}
        onHide={hideDeletespecializationDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {deleteValue && (
            <span>
              Are you sure you want to delete{" "}
              <b>
                {deleteValue.name} {deleteValue.type}{" "}
              </b>
              ?
            </span>
          )}
        </div>
      </Dialog>
      {/* Dialog Details  */}
      <Dialog
        header="أسماء العاملين"
        visible={displayMaximizable}
        maximizable
        modal
        onHide={() => onHide("displayMaximizable")}
      >
        <div>
          {workersSpec.map((w, i) => {
            return (
              <Card
                key={i}
                title={w.name}
                style={{ width: "20rem", marginBottom: "2em" }}
              >
                <p className="m-0" style={{ lineHeight: "1.5" }}>
                  {w.mobile}
                </p>
              </Card>
            );
          })}
        </div>
      </Dialog>
    </>
  );
}

export default Specialization;
